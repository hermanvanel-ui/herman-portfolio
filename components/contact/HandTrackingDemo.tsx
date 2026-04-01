"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";

// ==================== CONSTANTS ====================
const HAND_CONNS: [number, number][] = [
  [0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],
  [9,13],[13,14],[14,15],[15,16],[13,17],[17,18],[18,19],[19,20],[0,17],
];
const FINGER_TIPS = [4, 8, 12, 16, 20];
const SPRING_BACK = 0.018;
const DEFORM_STRENGTH = 0.12;
const COMPRESS_STRENGTH = 0.08;
const PINCH_THRESHOLD = 0.07;
const PINCH_PULL_STRENGTH = 0.15;
const PINCH_RADIUS = 0.6;
const LERP_SPEED = 0.08;
const THREAD_SEGMENTS = 10;
const MAX_PARTICLES = 60;

// ==================== GESTURE MATH ====================
function countFingers(lm: any[], handedness: string): number {
  let c = 0;
  // Thumb direction depends on handedness (camera is mirrored)
  if (handedness === "Right") {
    if (lm[4].x < lm[3].x) c++;
  } else {
    if (lm[4].x > lm[3].x) c++;
  }
  if (lm[8].y < lm[6].y) c++;
  if (lm[12].y < lm[10].y) c++;
  if (lm[16].y < lm[14].y) c++;
  if (lm[20].y < lm[18].y) c++;
  return c;
}

function getHandCenter(lm: any[]): { x: number; y: number; z: number } {
  return {
    x: (lm[0].x + lm[9].x) / 2,
    y: (lm[0].y + lm[9].y) / 2,
    z: ((lm[0].z || 0) + (lm[9].z || 0)) / 2,
  };
}

function getPinchDist(lm: any[]): number {
  const dx = lm[4].x - lm[8].x;
  const dy = lm[4].y - lm[8].y;
  return Math.sqrt(dx * dx + dy * dy);
}

function getPinchMid(lm: any[]): { x: number; y: number } {
  return { x: (lm[4].x + lm[8].x) / 2, y: (lm[4].y + lm[8].y) / 2 };
}

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

function landmarkTo3D(
  lx: number, ly: number,
  camera: THREE.PerspectiveCamera
): THREE.Vector3 {
  const nx = 1 - lx; // mirror
  const ndcX = (nx - 0.5) * 2;
  const ndcY = -(ly - 0.5) * 2;
  const vec = new THREE.Vector3(ndcX, ndcY, 0.5);
  vec.unproject(camera);
  const dir = vec.sub(camera.position).normalize();
  const dist = -camera.position.z / dir.z;
  return camera.position.clone().add(dir.multiplyScalar(dist));
}

// ==================== PARTICLE ====================
interface Particle {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
}

// ==================== HAND STATE ====================
interface HandState {
  center: THREE.Vector3;
  centerNorm: { x: number; y: number };
  fingers: number;
  isPinching: boolean;
  pinchMid: THREE.Vector3;
  pinchMidNorm: { x: number; y: number };
  pinchDist: number;
  fingerTips3D: THREE.Vector3[];
  handedness: string; // "Left" or "Right" from MediaPipe (mirrored)
  side: "left" | "right"; // actual screen side
}

// ==================== COMPONENT ====================
export default function HandTrackingDemo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const threeContainerRef = useRef<HTMLDivElement>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [handsDetected, setHandsDetected] = useState(0);
  const [gestureInfo, setGestureInfo] = useState("");

  // Refs for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cam3dRef = useRef<THREE.PerspectiveCamera | null>(null);
  const blobRef = useRef<THREE.Mesh | null>(null);
  const originalPosRef = useRef<Float32Array | null>(null);
  const threadsRef = useRef<THREE.Line[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const mainLightRef = useRef<THREE.PointLight | null>(null);
  const handStatesRef = useRef<HandState[]>([]);
  const targetScaleRef = useRef(1);
  const timeRef = useRef(0);
  const deformAmountRef = useRef(0);
  const cameraInstanceRef = useRef<any>(null);
  const runningRef = useRef(false);
  const baseColorRef = useRef(new THREE.Color(0xff4500));
  const targetColorRef = useRef(new THREE.Color(0xff4500));

  // ==================== THREE.JS INIT ====================
  useEffect(() => {
    if (!threeContainerRef.current) return;
    const container = threeContainerRef.current;
    const w = container.clientWidth;
    const h = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const cam = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    cam.position.z = 5;
    cam3dRef.current = cam;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights — warm organic feel
    scene.add(new THREE.AmbientLight(0x331100, 0.4));
    const mainLight = new THREE.PointLight(0xff6600, 1.2, 10);
    mainLight.position.set(0, 1, 3);
    scene.add(mainLight);
    mainLightRef.current = mainLight;
    const rimLight = new THREE.DirectionalLight(0x0044ff, 0.35);
    rimLight.position.set(-2, -1, -3);
    scene.add(rimLight);
    const topLight = new THREE.PointLight(0xff00ff, 0.25, 8);
    topLight.position.set(0, 3, 2);
    scene.add(topLight);

    // === DEFORMABLE BLOB ===
    const geo = new THREE.IcosahedronGeometry(1.4, 4);
    const originalPos = new Float32Array(geo.attributes.position.array);
    originalPosRef.current = originalPos;

    const mat = new THREE.MeshPhongMaterial({
      color: 0xff4500,
      emissive: 0xff2200,
      emissiveIntensity: 0.5,
      specular: 0xffaa00,
      shininess: 40,
      transparent: true,
      opacity: 0.9,
    });
    const blob = new THREE.Mesh(geo, mat);
    scene.add(blob);
    blobRef.current = blob;

    // Wireframe overlay for organic look
    const wireGeo = new THREE.IcosahedronGeometry(1.42, 4);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xff6600,
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    });
    const wire = new THREE.Mesh(wireGeo, wireMat);
    blob.add(wire);

    // === RENDER LOOP ===
    const animate = () => {
      requestAnimationFrame(animate);
      timeRef.current += 0.016;
      const t = timeRef.current;

      if (!blobRef.current || !originalPosRef.current) return;
      const blobMesh = blobRef.current;
      const positions = blobMesh.geometry.attributes.position;
      const posArray = positions.array as Float32Array;
      const origPos = originalPosRef.current;
      const hands = handStatesRef.current;

      // --- Spring back + breathing ---
      let totalDeform = 0;
      for (let i = 0; i < posArray.length; i += 3) {
        const ox = origPos[i], oy = origPos[i + 1], oz = origPos[i + 2];
        // Spring back toward original
        posArray[i] += (ox - posArray[i]) * SPRING_BACK;
        posArray[i + 1] += (oy - posArray[i + 1]) * SPRING_BACK;
        posArray[i + 2] += (oz - posArray[i + 2]) * SPRING_BACK;
        // Breathing pulse
        const breathe = Math.sin(t * 1.5) * 0.008;
        const dx = posArray[i] - 0, dy = posArray[i + 1] - 0, dz = posArray[i + 2] - 0;
        const len = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;
        posArray[i] += (dx / len) * breathe;
        posArray[i + 1] += (dy / len) * breathe;
        posArray[i + 2] += (dz / len) * breathe;
        // Track deformation amount
        totalDeform += Math.abs(posArray[i] - ox) + Math.abs(posArray[i + 1] - oy) + Math.abs(posArray[i + 2] - oz);
      }
      deformAmountRef.current = lerp(deformAmountRef.current, totalDeform, 0.1);

      // --- Apply hand forces ---
      if (hands.length > 0) {
        // Global scale from 2-hand distance
        if (hands.length === 2) {
          const d = hands[0].center.distanceTo(hands[1].center);
          targetScaleRef.current = Math.max(0.4, Math.min(2.8, d * 1.2));
        }

        for (const hand of hands) {
          const isLeft = hand.side === "left";
          const fingerCount = hand.fingers;

          for (let i = 0; i < posArray.length; i += 3) {
            const vx = posArray[i], vy = posArray[i + 1], vz = posArray[i + 2];

            // Only affect vertices on this hand's side
            const onThisSide = isLeft ? vx <= 0.1 : vx >= -0.1;
            if (!onThisSide) continue;

            const sideInfluence = isLeft
              ? Math.max(0, (-vx + 0.1) / 1.5)
              : Math.max(0, (vx + 0.1) / 1.5);
            const influence = Math.min(1, sideInfluence);

            // --- Fist compress ---
            if (fingerCount === 0) {
              const toCenter = new THREE.Vector3(-vx, -vy, -vz).normalize();
              posArray[i] += toCenter.x * COMPRESS_STRENGTH * influence;
              posArray[i + 1] += toCenter.y * COMPRESS_STRENGTH * influence;
              posArray[i + 2] += toCenter.z * COMPRESS_STRENGTH * influence;
            }

            // --- Open hand expand ---
            if (fingerCount >= 4) {
              const fromCenter = new THREE.Vector3(vx, vy, vz).normalize();
              posArray[i] += fromCenter.x * DEFORM_STRENGTH * 0.5 * influence;
              posArray[i + 1] += fromCenter.y * DEFORM_STRENGTH * 0.5 * influence;
              posArray[i + 2] += fromCenter.z * DEFORM_STRENGTH * 0.5 * influence;
            }

            // --- Hand Y position stretches side vertically ---
            const handY = hand.center.y;
            posArray[i + 1] += handY * DEFORM_STRENGTH * 0.3 * influence;

            // --- Pinch pull ---
            if (hand.isPinching) {
              const dx = vx - hand.pinchMid.x;
              const dy = vy - hand.pinchMid.y;
              const dz = vz - hand.pinchMid.z;
              const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
              if (dist < PINCH_RADIUS) {
                const falloff = 1 - dist / PINCH_RADIUS;
                const strength = PINCH_PULL_STRENGTH * falloff * falloff;
                posArray[i] += (hand.pinchMid.x - vx) * strength;
                posArray[i + 1] += (hand.pinchMid.y - vy) * strength;
                posArray[i + 2] += (hand.pinchMid.z - vz) * strength;
              }
            }
          }
        }
      }

      positions.needsUpdate = true;
      blobMesh.geometry.computeVertexNormals();

      // --- Scale ---
      const s = blobMesh.scale.x;
      const ns = lerp(s, targetScaleRef.current, LERP_SPEED);
      blobMesh.scale.set(ns, ns, ns);

      // --- Material pulse ---
      const meshMat = blobMesh.material as THREE.MeshPhongMaterial;
      const baseEmissive = 0.4 + Math.sin(t * 1.5) * 0.15;
      const deformBoost = Math.min(1.5, deformAmountRef.current * 0.02);
      meshMat.emissiveIntensity = baseEmissive + deformBoost;

      // Color shift based on hands
      if (hands.length === 0) {
        targetColorRef.current.set(0xff4500);
      } else if (hands.length === 1) {
        targetColorRef.current.set(hands[0].side === "left" ? 0x00ccff : 0xcc44ff);
      } else {
        targetColorRef.current.set(0xff22aa);
      }
      baseColorRef.current.lerp(targetColorRef.current, 0.03);
      meshMat.color.copy(baseColorRef.current);
      meshMat.emissive.copy(baseColorRef.current).multiplyScalar(0.5);

      // --- Idle rotation ---
      if (hands.length === 0) {
        blobMesh.rotation.y += 0.003;
        blobMesh.rotation.x += 0.001;
        targetScaleRef.current = lerp(targetScaleRef.current, 1, 0.01);
      }

      // --- Move light toward hand activity ---
      if (mainLightRef.current && hands.length > 0) {
        const avgX = hands.reduce((s, h) => s + h.center.x, 0) / hands.length;
        const avgY = hands.reduce((s, h) => s + h.center.y, 0) / hands.length;
        mainLightRef.current.position.x = lerp(mainLightRef.current.position.x, avgX, 0.05);
        mainLightRef.current.position.y = lerp(mainLightRef.current.position.y, avgY + 1, 0.05);
      }

      // --- Energy threads ---
      updateThreads(scene, hands, blobMesh, cam, t);

      // --- Particles ---
      updateParticles(scene, hands, t);

      // Update wireframe too
      if (blobMesh.children[0]) {
        const wireGeoChild = (blobMesh.children[0] as THREE.Mesh).geometry;
        const wirePos = wireGeoChild.attributes.position.array as Float32Array;
        // Copy deformed positions (approximately, since wireframe is slightly larger)
        for (let i = 0; i < wirePos.length && i < posArray.length; i += 3) {
          wirePos[i] = posArray[i] * 1.015;
          wirePos[i + 1] = posArray[i + 1] * 1.015;
          wirePos[i + 2] = posArray[i + 2] * 1.015;
        }
        wireGeoChild.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, cam);
    };
    animate();

    const onResize = () => {
      const w2 = container.clientWidth;
      const h2 = container.clientHeight;
      cam.aspect = w2 / h2;
      cam.updateProjectionMatrix();
      renderer.setSize(w2, h2);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ==================== ENERGY THREADS ====================
  function updateThreads(
    scene: THREE.Scene,
    hands: HandState[],
    blob: THREE.Mesh,
    cam: THREE.PerspectiveCamera,
    time: number
  ) {
    // Remove old threads
    for (const line of threadsRef.current) {
      scene.remove(line);
      line.geometry.dispose();
    }
    threadsRef.current = [];

    if (hands.length === 0) return;

    const blobPos = blob.position;
    const blobScale = blob.scale.x;

    for (const hand of hands) {
      for (const tip3D of hand.fingerTips3D) {
        // Find nearest point on blob surface
        const dirToBlob = blobPos.clone().sub(tip3D).normalize();
        const surfacePoint = blobPos.clone().add(dirToBlob.clone().multiplyScalar(-1.4 * blobScale));

        const dist = tip3D.distanceTo(surfacePoint);
        if (dist > 4) continue; // Too far, skip

        const points: THREE.Vector3[] = [];
        for (let i = 0; i <= THREAD_SEGMENTS; i++) {
          const t2 = i / THREAD_SEGMENTS;
          const p = tip3D.clone().lerp(surfacePoint, t2);
          // Wavy noise
          const wave = Math.sin(time * 4 + t2 * Math.PI * 3) * 0.04 * (1 - Math.abs(t2 - 0.5) * 2);
          const wave2 = Math.cos(time * 3 + t2 * 5) * 0.03 * (1 - Math.abs(t2 - 0.5) * 2);
          p.x += wave;
          p.y += wave2;
          points.push(p);
        }

        const geo = new THREE.BufferGeometry().setFromPoints(points);
        const opacity = Math.max(0.1, Math.min(0.7, 1 - dist / 4));
        const threadColor = hand.side === "left" ? 0x00ccff : 0xcc44ff;
        const mat = new THREE.LineBasicMaterial({
          color: threadColor,
          transparent: true,
          opacity: opacity,
        });
        const line = new THREE.Line(geo, mat);
        scene.add(line);
        threadsRef.current.push(line);
      }
    }
  }

  // ==================== PARTICLES ====================
  function updateParticles(scene: THREE.Scene, hands: HandState[], time: number) {
    // Spawn particles at pinch points
    for (const hand of hands) {
      if (hand.isPinching && particlesRef.current.length < MAX_PARTICLES && Math.random() > 0.5) {
        const pGeo = new THREE.SphereGeometry(0.02, 4, 4);
        const pColor = hand.side === "left" ? 0x00ccff : 0xcc44ff;
        const pMat = new THREE.MeshBasicMaterial({
          color: pColor,
          transparent: true,
          opacity: 0.8,
        });
        const pMesh = new THREE.Mesh(pGeo, pMat);
        pMesh.position.copy(hand.pinchMid);
        scene.add(pMesh);
        particlesRef.current.push({
          mesh: pMesh,
          velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 0.04,
            (Math.random() - 0.5) * 0.04,
            (Math.random() - 0.5) * 0.04
          ),
          life: 0,
          maxLife: 0.4 + Math.random() * 0.3,
        });
      }
    }

    // Update existing particles
    const alive: Particle[] = [];
    for (const p of particlesRef.current) {
      p.life += 0.016;
      if (p.life >= p.maxLife) {
        scene.remove(p.mesh);
        p.mesh.geometry.dispose();
        (p.mesh.material as THREE.Material).dispose();
        continue;
      }
      p.mesh.position.add(p.velocity);
      (p.mesh.material as THREE.MeshBasicMaterial).opacity = 1 - p.life / p.maxLife;
      alive.push(p);
    }
    particlesRef.current = alive;
  }

  // ==================== MEDIAPIPE INIT ====================
  useEffect(() => {
    const init = async () => {
      try {
        const handsModule = await import("@mediapipe/hands");
        const Hands = handsModule.Hands;
        const { Camera } = await import("@mediapipe/camera_utils");

        if (!videoRef.current || !canvasRef.current) return;
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const hands = new Hands({
          locateFile: (file: string) =>
            `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
        });
        hands.setOptions({
          maxNumHands: 2,
          modelComplexity: 1,
          minDetectionConfidence: 0.7,
          minTrackingConfidence: 0.5,
        });

        hands.onResults((results: any) => {
          canvas.width = video.videoWidth || 640;
          canvas.height = video.videoHeight || 480;
          ctx.save();
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);
          ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
          ctx.restore();

          const newHandStates: HandState[] = [];

          if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            for (let h = 0; h < results.multiHandLandmarks.length; h++) {
              const lm = results.multiHandLandmarks[h];
              const handedness = results.multiHandedness?.[h]?.label || "Right";
              // MediaPipe "Left" label = actually right side on mirrored feed
              const side: "left" | "right" = handedness === "Left" ? "right" : "left";

              // Draw skeleton mirrored
              ctx.save();
              ctx.translate(canvas.width, 0);
              ctx.scale(-1, 1);
              // Connections
              const skelColor = side === "left" ? "rgba(0,200,255,0.45)" : "rgba(200,70,255,0.45)";
              ctx.strokeStyle = skelColor;
              ctx.lineWidth = 2;
              ctx.shadowColor = side === "left" ? "#00ccff" : "#cc44ff";
              ctx.shadowBlur = 6;
              for (const [s, e] of HAND_CONNS) {
                ctx.beginPath();
                ctx.moveTo(lm[s].x * canvas.width, lm[s].y * canvas.height);
                ctx.lineTo(lm[e].x * canvas.width, lm[e].y * canvas.height);
                ctx.stroke();
              }
              // Landmarks
              ctx.shadowBlur = 10;
              for (const p of lm) {
                ctx.beginPath();
                ctx.arc(p.x * canvas.width, p.y * canvas.height, 3, 0, Math.PI * 2);
                ctx.fillStyle = side === "left" ? "#00ccff" : "#cc44ff";
                ctx.fill();
              }
              // Pinch indicators
              ctx.shadowBlur = 15;
              [4, 8].forEach((i) => {
                ctx.beginPath();
                ctx.arc(lm[i].x * canvas.width, lm[i].y * canvas.height, 5, 0, Math.PI * 2);
                ctx.fillStyle = side === "left" ? "rgba(0,200,255,0.6)" : "rgba(200,70,255,0.6)";
                ctx.fill();
              });
              ctx.restore();

              // Build hand state
              const cam3d = cam3dRef.current;
              if (!cam3d) continue;

              const center = getHandCenter(lm);
              const center3D = landmarkTo3D(center.x, center.y, cam3d);
              const fingers = countFingers(lm, handedness);
              const pinchDist = getPinchDist(lm);
              const isPinching = pinchDist < PINCH_THRESHOLD;
              const pinchMidNorm = getPinchMid(lm);
              const pinchMid3D = landmarkTo3D(pinchMidNorm.x, pinchMidNorm.y, cam3d);

              const fingerTips3D = FINGER_TIPS.map((idx) =>
                landmarkTo3D(lm[idx].x, lm[idx].y, cam3d)
              );

              newHandStates.push({
                center: center3D,
                centerNorm: { x: center.x, y: center.y },
                fingers,
                isPinching,
                pinchMid: pinchMid3D,
                pinchMidNorm,
                pinchDist,
                fingerTips3D,
                handedness,
                side,
              });
            }
          }

          handStatesRef.current = newHandStates;
          setHandsDetected(newHandStates.length);

          // Build gesture info string
          if (newHandStates.length === 0) {
            setGestureInfo("");
          } else {
            const parts: string[] = [];
            for (const hs of newHandStates) {
              const sLabel = hs.side === "left" ? "G" : "D";
              if (hs.fingers === 0) parts.push(`${sLabel}: poing`);
              else if (hs.isPinching) parts.push(`${sLabel}: pinch`);
              else if (hs.fingers >= 4) parts.push(`${sLabel}: ouvert`);
              else parts.push(`${sLabel}: ${hs.fingers} doigts`);
            }
            if (newHandStates.length === 2) {
              const d = newHandStates[0].center.distanceTo(newHandStates[1].center);
              parts.push(`dist: ${d.toFixed(1)}`);
            }
            setGestureInfo(parts.join(" · "));
          }
        });

        const cameraInst = new Camera(video, {
          onFrame: async () => {
            if (runningRef.current) await hands.send({ image: video });
          },
          width: 1280,
          height: 720,
        });
        cameraInstanceRef.current = cameraInst;
        runningRef.current = true;
        await cameraInst.start();
        setCameraReady(true);
        setLoading(false);
      } catch (err: any) {
        console.error("Hand tracking init error:", err);
        setCameraError(err.message || "Impossible d'accéder à la caméra");
        setLoading(false);
      }
    };
    init();
    return () => {
      runningRef.current = false;
      cameraInstanceRef.current?.stop?.();
    };
  }, []);

  // ==================== STOP / RESTART ====================
  const stopCamera = useCallback(() => {
    runningRef.current = false;
    cameraInstanceRef.current?.stop?.();
    cameraInstanceRef.current = null;
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    setHandsDetected(0);
    handStatesRef.current = [];
    setCameraReady(false);
    setCameraOff(true);
  }, []);

  const restartCamera = useCallback(() => {
    setCameraOff(false);
    setLoading(true);
    window.location.reload();
  }, []);

  // ==================== RENDER ====================
  return (
    <section id="hand-demo" className="section-base">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-8 reveal">
          <div className="section-label" style={{ color: "var(--green)" }}>// demo interactive</div>
          <h2 className="section-title">
            Sculptez avec vos{" "}
            <span style={{ color: "var(--cyan)", textShadow: "0 0 20px rgba(0,240,255,.3)" }}>mains</span>
          </h2>
          <p className="mt-4" style={{ color: "var(--text-mid)", fontSize: "1.05rem", lineHeight: 1.7, fontWeight: 400, maxWidth: "750px" }}>
            Manipulez un blob déformable en temps réel avec vos deux mains. Écartez pour
            agrandir, pincez pour tirer la surface, fermez le poing pour compresser. Chaque
            main contrôle son côté. Des fils d&apos;énergie relient vos doigts à l&apos;objet.
          </p>
        </div>

        {/* Controls bar */}
        <div className="reveal reveal-delay-1 mb-4 p-3 border border-[rgba(0,240,255,.12)] flex flex-wrap items-center justify-between gap-3" style={{ background: "rgba(0,240,255,.02)", fontFamily: "var(--font-mono)", fontSize: ".7rem" }}>
          <div className="flex flex-wrap gap-x-5 gap-y-1" style={{ color: "var(--text-dim)", letterSpacing: "1px" }}>
            <span>👐 <span style={{ color: "var(--cyan)" }}>Écarter</span> = agrandir</span>
            <span>🤏 <span style={{ color: "var(--green)" }}>Pinch</span> = tirer surface</span>
            <span>✊ <span style={{ color: "var(--purple)" }}>Poing</span> = compresser</span>
            <span>🖐 <span style={{ color: "var(--pink)" }}>Ouvrir</span> = gonfler côté</span>
          </div>
          {cameraReady && !cameraOff && (
            <button onClick={stopCamera} className="px-4 py-1.5 border transition-all duration-300 hover:bg-[rgba(255,80,80,.15)]" style={{ borderColor: "rgba(255,80,80,.4)", background: "rgba(255,80,80,.06)", color: "#ff5050", fontFamily: "var(--font-mono)", fontSize: ".65rem", letterSpacing: "1px", cursor: "pointer" }}>
              ■ COUPER CAMÉRA
            </button>
          )}
          {cameraOff && (
            <button onClick={restartCamera} className="px-4 py-1.5 border transition-all duration-300 hover:bg-[rgba(0,240,255,.15)]" style={{ borderColor: "rgba(0,240,255,.4)", background: "rgba(0,240,255,.06)", color: "var(--cyan)", fontFamily: "var(--font-mono)", fontSize: ".65rem", letterSpacing: "1px", cursor: "pointer" }}>
              ▶ RELANCER
            </button>
          )}
        </div>

        {/* Status badges */}
        <div className="reveal reveal-delay-1 mb-4 flex flex-wrap gap-2">
          <div className="flex items-center gap-2 px-3 py-1" style={{ border: `1px solid ${cameraReady && !cameraOff ? "rgba(0,255,65,.3)" : "rgba(255,80,80,.3)"}`, fontFamily: "var(--font-mono)", fontSize: ".6rem", letterSpacing: "1px" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: cameraReady && !cameraOff ? "var(--green)" : "#ff5050", boxShadow: `0 0 6px ${cameraReady && !cameraOff ? "var(--green)" : "#ff5050"}` }} />
            <span style={{ color: cameraReady && !cameraOff ? "var(--green)" : "#ff5050" }}>
              {cameraOff ? "OFF" : cameraReady ? "CAM OK" : "INIT..."}
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1" style={{ border: `1px solid ${handsDetected > 0 ? "rgba(0,240,255,.3)" : "rgba(100,100,100,.3)"}`, fontFamily: "var(--font-mono)", fontSize: ".6rem", letterSpacing: "1px" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: handsDetected > 0 ? "var(--cyan)" : "var(--text-faint)", boxShadow: handsDetected > 0 ? "0 0 6px var(--cyan)" : "none" }} />
            <span style={{ color: handsDetected > 0 ? "var(--cyan)" : "var(--text-faint)" }}>
              {handsDetected === 0 ? "0 MAIN" : handsDetected === 1 ? "1 MAIN" : "2 MAINS"}
            </span>
          </div>
          {gestureInfo && (
            <div className="flex items-center gap-2 px-3 py-1" style={{ border: "1px solid rgba(180,74,255,.25)", fontFamily: "var(--font-mono)", fontSize: ".6rem", letterSpacing: "1px", color: "var(--purple)" }}>
              {gestureInfo}
            </div>
          )}
        </div>

        {/* ===== MAIN DEMO AREA ===== */}
        <div className="reveal reveal-delay-2 relative overflow-hidden border border-[rgba(0,240,255,.15)]" style={{ background: "#000", minHeight: "520px", maxHeight: "72vh" }}>
          <video ref={videoRef} className="hidden" playsInline />
          <canvas ref={canvasRef} className="w-full h-full object-cover" style={{ minHeight: "520px" }} />
          <div ref={threeContainerRef} className="absolute inset-0" style={{ zIndex: 2, pointerEvents: "none" }} />

          {/* Scanlines */}
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3, opacity: 0.025, background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,100,0,.08) 2px, rgba(255,100,0,.08) 4px)" }} />

          {/* Corner markers */}
          <div className="absolute inset-3 pointer-events-none" style={{ zIndex: 4 }}>
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[rgba(0,200,255,.5)]" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[rgba(200,70,255,.5)]" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[rgba(0,200,255,.5)]" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[rgba(200,70,255,.5)]" />
          </div>

          {/* Side labels */}
          <div className="absolute top-4 left-4 z-10" style={{ fontFamily: "var(--font-mono)", fontSize: ".55rem", color: "rgba(0,200,255,.5)", letterSpacing: "2px" }}>MAIN GAUCHE</div>
          <div className="absolute top-4 right-4 z-10" style={{ fontFamily: "var(--font-mono)", fontSize: ".55rem", color: "rgba(200,70,255,.5)", letterSpacing: "2px" }}>MAIN DROITE</div>

          {/* No hand message */}
          {handsDetected === 0 && cameraReady && !cameraOff && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 px-6 py-3 text-center" style={{ background: "rgba(5,5,16,.6)", border: "1px solid rgba(255,100,0,.15)", backdropFilter: "blur(10px)", fontFamily: "var(--font-mono)", fontSize: ".8rem", color: "var(--text-faint)" }}>
              Montrez vos deux mains pour sculpter le blob
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center z-20" style={{ background: "rgba(5,5,16,.92)" }}>
              <div className="text-center">
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "#fff", letterSpacing: "3px", marginBottom: ".75rem" }}>HAND SCULPT 3D</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--text-mid)", marginBottom: ".5rem" }}>Chargement de MediaPipe (2 mains)...</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: ".7rem", color: "var(--text-faint)" }}>Autorisez l&apos;accès à la caméra</div>
              </div>
            </div>
          )}

          {/* Error */}
          {cameraError && (
            <div className="absolute inset-0 flex items-center justify-center z-20" style={{ background: "rgba(5,5,16,.92)" }}>
              <div className="text-center p-8">
                <div style={{ fontFamily: "var(--font-mono)", fontSize: ".9rem", color: "var(--pink)", letterSpacing: "1px", marginBottom: "1rem" }}>Caméra non disponible</div>
                <p style={{ color: "var(--text-dim)", fontSize: ".85rem", lineHeight: 1.6, maxWidth: "350px" }}>
                  {cameraError}. Webcam + HTTPS requis.
                </p>
              </div>
            </div>
          )}

          {/* Camera off */}
          {cameraOff && (
            <div className="absolute inset-0 flex items-center justify-center z-20" style={{ background: "rgba(5,5,16,.88)" }}>
              <div className="text-center">
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 600, color: "var(--text-mid)", letterSpacing: "2px", marginBottom: "1rem" }}>CAMÉRA COUPÉE</div>
                <button onClick={restartCamera} className="px-6 py-2 border transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,.2)]" style={{ borderColor: "var(--cyan)", background: "rgba(0,240,255,.08)", color: "var(--cyan)", fontFamily: "var(--font-display)", fontSize: ".8rem", fontWeight: 600, letterSpacing: "2px", cursor: "pointer" }}>
                  ▶ RELANCER
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tech stack */}
        <div className="reveal reveal-delay-3 mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 border border-[rgba(0,240,255,.08)]" style={{ background: "var(--surface)" }}>
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: ".75rem", letterSpacing: "2px", color: "var(--cyan)", marginBottom: ".5rem" }}>2 MAINS · 42 POINTS</h4>
            <p style={{ color: "var(--text-dim)", fontSize: ".8rem", lineHeight: 1.6, fontWeight: 400 }}>
              MediaPipe Hands détecte les deux mains en parallèle avec 21 landmarks chacune.
              Chaque main est identifiée gauche/droite et contrôle son côté du blob indépendamment.
            </p>
          </div>
          <div className="p-5 border border-[rgba(180,74,255,.08)]" style={{ background: "var(--surface)" }}>
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: ".75rem", letterSpacing: "2px", color: "var(--purple)", marginBottom: ".5rem" }}>DÉFORMATION TEMPS RÉEL</h4>
            <p style={{ color: "var(--text-dim)", fontSize: ".8rem", lineHeight: 1.6, fontWeight: 400 }}>
              Chaque sommet du mesh est déplacé par les forces des mains : pinch tire la surface
              localement, poing compresse, main ouverte gonfle. Ressort élastique pour le retour.
            </p>
          </div>
          <div className="p-5 border border-[rgba(0,255,65,.08)]" style={{ background: "var(--surface)" }}>
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: ".75rem", letterSpacing: "2px", color: "var(--green)", marginBottom: ".5rem" }}>FILS D&apos;ÉNERGIE</h4>
            <p style={{ color: "var(--text-dim)", fontSize: ".8rem", lineHeight: 1.6, fontWeight: 400 }}>
              Des fils animés relient chaque doigt à la surface du blob. Particules
              lumineuses aux points de contact. L&apos;éclairage suit l&apos;activité des mains.
            </p>
          </div>
        </div>

        <div className="reveal reveal-delay-4 mt-5 text-center">
          <p style={{ color: "var(--text-faint)", fontSize: ".75rem", fontFamily: "var(--font-mono)", letterSpacing: "1px" }}>
            Code source :{" "}
            <a href="https://github.com/hermanvanel-ui/herman-portfolio" target="_blank" rel="noopener noreferrer" style={{ color: "var(--cyan)", textDecoration: "underline" }}>GitHub</a>
            {" "}· MediaPipe Hands · Three.js · IcosahedronGeometry · Next.js
          </p>
        </div>
      </div>
    </section>
  );
}
