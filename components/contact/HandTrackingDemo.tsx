"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";

// ========== GESTURE MATH ==========
function countFingers(lm: { x: number; y: number; z: number }[]): number {
  let c = 0;
  if (lm[4].x < lm[3].x) c++;
  if (lm[8].y < lm[6].y) c++;
  if (lm[12].y < lm[10].y) c++;
  if (lm[16].y < lm[14].y) c++;
  if (lm[20].y < lm[18].y) c++;
  return c;
}

function getPinchDistance(lm: { x: number; y: number }[]): number {
  const dx = lm[4].x - lm[8].x;
  const dy = lm[4].y - lm[8].y;
  return Math.sqrt(dx * dx + dy * dy);
}

function getFingerSpread(lm: { x: number; y: number }[]): number {
  const tips = [8, 12, 16, 20];
  let total = 0;
  for (let i = 0; i < tips.length - 1; i++) {
    const dx = lm[tips[i]].x - lm[tips[i + 1]].x;
    const dy = lm[tips[i]].y - lm[tips[i + 1]].y;
    total += Math.sqrt(dx * dx + dy * dy);
  }
  return total / (tips.length - 1);
}

function getWristAngle(lm: { x: number; y: number }[]): number {
  const dx = lm[9].x - lm[0].x;
  const dy = lm[9].y - lm[0].y;
  return Math.atan2(dy, dx);
}

function getHandCenter(lm: { x: number; y: number }[]): { x: number; y: number } {
  return { x: (lm[0].x + lm[9].x) / 2, y: (lm[0].y + lm[9].y) / 2 };
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

const HAND_CONNS: [number, number][] = [
  [0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],
  [9,13],[13,14],[14,15],[15,16],[13,17],[17,18],[18,19],[19,20],[0,17],
];

const SHAPE_NAMES = ["Cube", "Cylindre", "Cône", "Tore", "Dodécaèdre", "Sphère"];
const SHAPE_COLORS = [0x00f0ff, 0x00ff41, 0xff6b35, 0xb44aff, 0xec4899, 0x60f8ff];
const SHAPE_EMISSIVE = [0x002030, 0x001a08, 0x1a0a00, 0x0d0018, 0x1a0008, 0x001820];

export default function HandTrackingDemo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const threeContainerRef = useRef<HTMLDivElement>(null);
  const [fingerCount, setFingerCount] = useState(0);
  const [handDetected, setHandDetected] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [cameraOff, setCameraOff] = useState(false);
  const [pinchVal, setPinchVal] = useState(0);
  const [spreadVal, setSpreadVal] = useState(0);

  // Three.js refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraObjRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const targetPosRef = useRef({ x: 0, y: 0 });
  const targetRotRef = useRef({ x: 0, y: 0, z: 0 });
  const targetScaleRef = useRef(1);
  const targetEmissiveRef = useRef(0.3);
  const currentFingerRef = useRef(-1);
  const handDetectedRef = useRef(false);
  const prevPinchRef = useRef(0.1);
  const prevSpreadRef = useRef(0.1);
  const prevAngleRef = useRef(0);
  const cameraInstanceRef = useRef<any>(null);
  const handsInstanceRef = useRef<any>(null);
  const runningRef = useRef(false);

  // Initialize Three.js
  useEffect(() => {
    if (!threeContainerRef.current) return;
    const container = threeContainerRef.current;
    const w = container.clientWidth;
    const h = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 1000);
    camera.position.z = 5;
    cameraObjRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    scene.add(new THREE.AmbientLight(0x404060, 0.5));
    const dir1 = new THREE.DirectionalLight(0x00f0ff, 1.0);
    dir1.position.set(2, 3, 4);
    scene.add(dir1);
    const dir2 = new THREE.DirectionalLight(0xb44aff, 0.6);
    dir2.position.set(-3, -2, 3);
    scene.add(dir2);
    const point1 = new THREE.PointLight(0x00ff41, 0.4, 8);
    point1.position.set(0, 2, 3);
    scene.add(point1);

    // Initial shape
    createShapeInScene(scene, 0);

    const animate = () => {
      requestAnimationFrame(animate);
      if (!meshRef.current) return;
      const spd = 0.08;
      const mesh = meshRef.current;

      mesh.position.x = lerp(mesh.position.x, targetPosRef.current.x, spd);
      mesh.position.y = lerp(mesh.position.y, targetPosRef.current.y, spd);
      mesh.rotation.x = lerp(mesh.rotation.x, targetRotRef.current.x, spd);
      mesh.rotation.y = lerp(mesh.rotation.y, targetRotRef.current.y, spd);
      mesh.rotation.z = lerp(mesh.rotation.z, targetRotRef.current.z, 0.05);

      const s = mesh.scale.x;
      const ns = lerp(s, targetScaleRef.current, spd);
      mesh.scale.set(ns, ns, ns);

      if ((mesh.material as THREE.MeshPhongMaterial).emissiveIntensity !== undefined) {
        (mesh.material as THREE.MeshPhongMaterial).emissiveIntensity = lerp(
          (mesh.material as THREE.MeshPhongMaterial).emissiveIntensity,
          targetEmissiveRef.current,
          0.05
        );
      }

      if (!handDetectedRef.current) {
        targetRotRef.current.y += 0.008;
        targetRotRef.current.x += 0.003;
        targetPosRef.current.x *= 0.97;
        targetPosRef.current.y *= 0.97;
        targetScaleRef.current = lerp(targetScaleRef.current, 1, 0.02);
        targetEmissiveRef.current = lerp(targetEmissiveRef.current, 0.3, 0.02);
      }

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w2 = container.clientWidth;
      const h2 = container.clientHeight;
      camera.aspect = w2 / h2;
      camera.updateProjectionMatrix();
      renderer.setSize(w2, h2);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function createShapeInScene(scene: THREE.Scene, n: number) {
    const idx = Math.min(n, 5);
    let oldRot: THREE.Euler | null = null;
    let oldScale: THREE.Vector3 | null = null;
    let oldPos: THREE.Vector3 | null = null;

    if (meshRef.current) {
      oldRot = meshRef.current.rotation.clone();
      oldScale = meshRef.current.scale.clone();
      oldPos = meshRef.current.position.clone();
      scene.remove(meshRef.current);
    }

    let geo: THREE.BufferGeometry;
    switch (idx) {
      case 0: geo = new THREE.BoxGeometry(1.3, 1.3, 1.3); break;
      case 1: geo = new THREE.CylinderGeometry(0.6, 0.6, 1.6, 32); break;
      case 2: geo = new THREE.ConeGeometry(0.8, 1.6, 32); break;
      case 3: geo = new THREE.TorusGeometry(0.7, 0.28, 16, 80); break;
      case 4: geo = new THREE.DodecahedronGeometry(0.9); break;
      default: geo = new THREE.SphereGeometry(0.9, 32, 32); break;
    }

    const mat = new THREE.MeshPhongMaterial({
      color: SHAPE_COLORS[idx],
      emissive: SHAPE_EMISSIVE[idx],
      specular: SHAPE_COLORS[idx],
      shininess: 100,
      transparent: true,
      opacity: 0.88,
    });
    const mesh = new THREE.Mesh(geo, mat);
    if (oldRot) mesh.rotation.copy(oldRot);
    if (oldScale) mesh.scale.copy(oldScale);
    if (oldPos) mesh.position.copy(oldPos);

    const wireMat = new THREE.MeshBasicMaterial({
      color: SHAPE_COLORS[idx],
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    mesh.add(new THREE.Mesh(geo.clone(), wireMat));

    scene.add(mesh);
    meshRef.current = mesh;
  }

  const changeShape = useCallback((fingers: number) => {
    if (!sceneRef.current || fingers === currentFingerRef.current) return;
    currentFingerRef.current = fingers;
    createShapeInScene(sceneRef.current, fingers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Initialize MediaPipe + Camera
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
        handsInstanceRef.current = hands;

        hands.setOptions({
          maxNumHands: 1,
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

          if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            const lm = results.multiHandLandmarks[0];
            setHandDetected(true);
            handDetectedRef.current = true;

            // Draw skeleton (mirrored)
            ctx.save();
            ctx.translate(canvas.width, 0);
            ctx.scale(-1, 1);

            ctx.shadowColor = "#00ff41";
            ctx.shadowBlur = 6;
            ctx.strokeStyle = "rgba(0,255,65,0.5)";
            ctx.lineWidth = 2;
            for (const [s, e] of HAND_CONNS) {
              ctx.beginPath();
              ctx.moveTo(lm[s].x * canvas.width, lm[s].y * canvas.height);
              ctx.lineTo(lm[e].x * canvas.width, lm[e].y * canvas.height);
              ctx.stroke();
            }
            ctx.shadowBlur = 10;
            for (const p of lm) {
              ctx.beginPath();
              ctx.arc(p.x * canvas.width, p.y * canvas.height, 3.5, 0, Math.PI * 2);
              ctx.fillStyle = "#00ff41";
              ctx.fill();
            }
            // Pinch indicators on thumb & index tips
            ctx.shadowColor = "#00f0ff";
            ctx.shadowBlur = 15;
            [4, 8].forEach((i) => {
              ctx.beginPath();
              ctx.arc(lm[i].x * canvas.width, lm[i].y * canvas.height, 6, 0, Math.PI * 2);
              ctx.fillStyle = "rgba(0,240,255,0.7)";
              ctx.fill();
            });
            // Pinch line
            ctx.strokeStyle = "rgba(0,240,255,0.4)";
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.moveTo(lm[4].x * canvas.width, lm[4].y * canvas.height);
            ctx.lineTo(lm[8].x * canvas.width, lm[8].y * canvas.height);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.restore();

            // Gesture calculations
            const fingers = countFingers(lm);
            const pinch = getPinchDistance(lm);
            const spread = getFingerSpread(lm);
            const wristAngle = getWristAngle(lm);
            const center = getHandCenter(lm);

            const smoothPinch = lerp(prevPinchRef.current, pinch, 0.3);
            const smoothSpread = lerp(prevSpreadRef.current, spread, 0.3);
            const smoothAngle = lerp(prevAngleRef.current, wristAngle, 0.2);
            prevPinchRef.current = smoothPinch;
            prevSpreadRef.current = smoothSpread;
            prevAngleRef.current = smoothAngle;

            // Map gestures to 3D
            targetPosRef.current = {
              x: -(center.x - 0.5) * 6,
              y: -(center.y - 0.5) * 4.5,
            };
            targetScaleRef.current = Math.max(0.3, Math.min(3.0, smoothPinch * 12));
            targetRotRef.current = {
              x: (center.y - 0.5) * Math.PI,
              y: -(center.x - 0.5) * Math.PI * 1.5,
              z: -(smoothAngle + Math.PI / 2) * 1.5,
            };
            targetEmissiveRef.current = Math.max(0.2, Math.min(2.0, smoothSpread * 15));

            setFingerCount(fingers);
            setPinchVal(smoothPinch);
            setSpreadVal(smoothSpread);
            changeShape(fingers);
          } else {
            setHandDetected(false);
            handDetectedRef.current = false;
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
      if (cameraInstanceRef.current) {
        cameraInstanceRef.current.stop?.();
      }
      if (handsInstanceRef.current) {
        handsInstanceRef.current.close?.();
      }
    };
  }, [changeShape]);

  const stopCamera = useCallback(() => {
    runningRef.current = false;
    if (cameraInstanceRef.current) {
      cameraInstanceRef.current.stop();
      cameraInstanceRef.current = null;
    }
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
    setHandDetected(false);
    handDetectedRef.current = false;
    setCameraReady(false);
    setCameraOff(true);
  }, []);

  const restartCamera = useCallback(() => {
    setCameraOff(false);
    setLoading(true);
    window.location.reload();
  }, []);

  return (
    <section id="hand-demo" className="section-base">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-10 reveal">
          <div className="section-label" style={{ color: "var(--green)" }}>// demo interactive</div>
          <h2 className="section-title">
            Contrôlez avec vos{" "}
            <span style={{ color: "var(--cyan)", textShadow: "0 0 20px rgba(0,240,255,.3)" }}>mains</span>
          </h2>
          <p className="mt-4" style={{ color: "var(--text-mid)", fontSize: "1.05rem", lineHeight: 1.7, fontWeight: 400, maxWidth: "750px" }}>
            Manipulez un objet 3D directement avec vos mains devant la caméra.
            Pinch (pouce + index) pour redimensionner, bougez pour déplacer, tournez
            le poignet pour faire pivoter. Écartez les doigts pour intensifier le glow.
            Le nombre de doigts change la forme. Comme de la magie.
          </p>
        </div>

        {/* Gesture info bar */}
        <div className="reveal reveal-delay-1 mb-6 p-4 border border-[rgba(0,240,255,.12)] flex flex-wrap items-center justify-between gap-4" style={{ background: "rgba(0,240,255,.02)" }}>
          <div className="flex flex-wrap gap-x-6 gap-y-2" style={{ fontFamily: "var(--font-mono)", fontSize: ".7rem", color: "var(--text-dim)", letterSpacing: "1px" }}>
            <span>✋ <span style={{ color: "var(--green)" }}>Pinch</span> = échelle</span>
            <span>↔️ <span style={{ color: "var(--cyan)" }}>Position</span> = déplacement</span>
            <span>🔄 <span style={{ color: "var(--purple)" }}>Rotation poignet</span> = pivot</span>
            <span>🖐️ <span style={{ color: "var(--pink)" }}>Doigts écartés</span> = glow</span>
            <span>🔢 <span style={{ color: "var(--cyan)" }}>Nb doigts</span> = forme</span>
          </div>
          {cameraReady && !cameraOff && (
            <button
              onClick={stopCamera}
              className="px-4 py-1.5 border transition-all duration-300 hover:bg-[rgba(255,80,80,.15)]"
              style={{ borderColor: "rgba(255,80,80,.4)", background: "rgba(255,80,80,.06)", color: "#ff5050", fontFamily: "var(--font-mono)", fontSize: ".7rem", letterSpacing: "1px", cursor: "pointer" }}
            >
              ■ COUPER CAMÉRA
            </button>
          )}
          {cameraOff && (
            <button
              onClick={restartCamera}
              className="px-4 py-1.5 border transition-all duration-300 hover:bg-[rgba(0,240,255,.15)]"
              style={{ borderColor: "rgba(0,240,255,.4)", background: "rgba(0,240,255,.06)", color: "var(--cyan)", fontFamily: "var(--font-mono)", fontSize: ".7rem", letterSpacing: "1px", cursor: "pointer" }}
            >
              ▶ RELANCER CAMÉRA
            </button>
          )}
        </div>

        {/* Status badges */}
        <div className="reveal reveal-delay-1 mb-4 flex flex-wrap gap-3">
          <div className="flex items-center gap-2 px-3 py-1" style={{ border: `1px solid ${cameraReady && !cameraOff ? "rgba(0,255,65,.3)" : "rgba(255,80,80,.3)"}`, fontFamily: "var(--font-mono)", fontSize: ".65rem", letterSpacing: "1px" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: cameraReady && !cameraOff ? "var(--green)" : "#ff5050", boxShadow: `0 0 6px ${cameraReady && !cameraOff ? "var(--green)" : "#ff5050"}` }} />
            <span style={{ color: cameraReady && !cameraOff ? "var(--green)" : "#ff5050" }}>
              {cameraOff ? "CAMÉRA OFF" : cameraReady ? "CAMÉRA ACTIVE" : "INIT..."}
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1" style={{ border: `1px solid ${handDetected ? "rgba(0,240,255,.3)" : "rgba(255,80,80,.3)"}`, fontFamily: "var(--font-mono)", fontSize: ".65rem", letterSpacing: "1px" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: handDetected ? "var(--cyan)" : "#ff5050", boxShadow: `0 0 6px ${handDetected ? "var(--cyan)" : "#ff5050"}` }} />
            <span style={{ color: handDetected ? "var(--cyan)" : "#ff5050" }}>
              {handDetected ? "MAIN DÉTECTÉE" : "PAS DE MAIN"}
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1" style={{ border: "1px solid rgba(180,74,255,.3)", fontFamily: "var(--font-mono)", fontSize: ".65rem", letterSpacing: "1px", color: "var(--purple)" }}>
            {SHAPE_NAMES[Math.min(fingerCount, 5)]}
          </div>
          {handDetected && (
            <>
              <div className="flex items-center gap-2 px-3 py-1" style={{ border: "1px solid rgba(0,240,255,.15)", fontFamily: "var(--font-mono)", fontSize: ".65rem", letterSpacing: "1px", color: "var(--text-dim)" }}>
                Pinch: <span style={{ color: "var(--green)" }}>{(pinchVal * 100).toFixed(0)}%</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1" style={{ border: "1px solid rgba(0,240,255,.15)", fontFamily: "var(--font-mono)", fontSize: ".65rem", letterSpacing: "1px", color: "var(--text-dim)" }}>
                Scale: <span style={{ color: "var(--cyan)" }}>{targetScaleRef.current.toFixed(1)}x</span>
              </div>
            </>
          )}
        </div>

        {/* Main demo — full width camera with 3D overlay */}
        <div className="reveal reveal-delay-2 relative overflow-hidden border border-[rgba(0,240,255,.15)]" style={{ background: "#000", minHeight: "500px", maxHeight: "70vh" }}>
          <video ref={videoRef} className="hidden" playsInline />
          <canvas ref={canvasRef} className="w-full h-full object-cover" style={{ minHeight: "500px" }} />
          {/* Three.js overlay */}
          <div ref={threeContainerRef} className="absolute inset-0" style={{ zIndex: 2, pointerEvents: "none" }} />

          {/* Scanlines */}
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3, opacity: 0.03, background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,.1) 2px, rgba(0,240,255,.1) 4px)" }} />

          {/* Corner markers */}
          <div className="absolute inset-3 pointer-events-none" style={{ zIndex: 4 }}>
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[var(--cyan)]" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[var(--cyan)]" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[var(--cyan)]" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[var(--cyan)]" />
          </div>

          {/* No hand message */}
          {!handDetected && cameraReady && !cameraOff && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 px-6 py-3" style={{ background: "rgba(5,5,16,.6)", border: "1px solid rgba(0,240,255,.1)", backdropFilter: "blur(10px)", fontFamily: "var(--font-mono)", fontSize: ".85rem", color: "var(--text-faint)" }}>
              Montrez votre main devant la caméra
            </div>
          )}

          {/* Gesture HUD overlay */}
          {handDetected && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-6 px-5 py-2" style={{ background: "rgba(5,5,16,.8)", backdropFilter: "blur(10px)", border: "1px solid rgba(0,240,255,.15)", fontFamily: "var(--font-mono)", fontSize: ".7rem" }}>
              <div className="flex flex-col items-center gap-0.5">
                <span style={{ color: "var(--text-faint)", fontSize: ".55rem", letterSpacing: "1px", textTransform: "uppercase" }}>Doigts</span>
                <span style={{ color: "var(--cyan)", fontWeight: 600, fontSize: ".85rem" }}>{fingerCount}</span>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <span style={{ color: "var(--text-faint)", fontSize: ".55rem", letterSpacing: "1px", textTransform: "uppercase" }}>Pinch</span>
                <span style={{ color: "var(--green)", fontWeight: 600, fontSize: ".85rem" }}>{(pinchVal * 100).toFixed(0)}%</span>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <span style={{ color: "var(--text-faint)", fontSize: ".55rem", letterSpacing: "1px", textTransform: "uppercase" }}>Spread</span>
                <span style={{ color: "var(--purple)", fontWeight: 600, fontSize: ".85rem" }}>{(spreadVal * 100).toFixed(0)}%</span>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <span style={{ color: "var(--text-faint)", fontSize: ".55rem", letterSpacing: "1px", textTransform: "uppercase" }}>Shape</span>
                <span style={{ color: "var(--pink)", fontWeight: 600, fontSize: ".85rem" }}>{SHAPE_NAMES[Math.min(fingerCount, 5)]}</span>
              </div>
            </div>
          )}

          {/* Loading overlay */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center z-20" style={{ background: "rgba(5,5,16,.92)" }}>
              <div className="text-center">
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "#fff", letterSpacing: "3px", marginBottom: ".75rem" }}>HAND TRACKING 3D</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--text-mid)", marginBottom: "1.5rem" }}>Chargement de MediaPipe...</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: ".7rem", color: "var(--text-faint)" }}>Autorisez l&apos;accès à la caméra</div>
              </div>
            </div>
          )}

          {/* Error overlay */}
          {cameraError && (
            <div className="absolute inset-0 flex items-center justify-center z-20" style={{ background: "rgba(5,5,16,.92)" }}>
              <div className="text-center p-8">
                <div style={{ fontFamily: "var(--font-mono)", fontSize: ".9rem", color: "var(--pink)", letterSpacing: "1px", marginBottom: "1rem" }}>Caméra non disponible</div>
                <p style={{ color: "var(--text-dim)", fontSize: ".85rem", lineHeight: 1.6, maxWidth: "350px" }}>
                  {cameraError}. La démo nécessite une webcam et l&apos;autorisation d&apos;accès. Essayez sur Chrome avec HTTPS.
                </p>
              </div>
            </div>
          )}

          {/* Camera off overlay */}
          {cameraOff && (
            <div className="absolute inset-0 flex items-center justify-center z-20" style={{ background: "rgba(5,5,16,.88)" }}>
              <div className="text-center">
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 600, color: "var(--text-mid)", letterSpacing: "2px", marginBottom: "1rem" }}>CAMÉRA COUPÉE</div>
                <button
                  onClick={restartCamera}
                  className="px-6 py-2 border transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,.2)]"
                  style={{ borderColor: "var(--cyan)", background: "rgba(0,240,255,.08)", color: "var(--cyan)", fontFamily: "var(--font-display)", fontSize: ".8rem", fontWeight: 600, letterSpacing: "2px", cursor: "pointer" }}
                >
                  ▶ RELANCER
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Shape mapping bar */}
        <div className="reveal reveal-delay-2 mt-3 p-3 flex flex-wrap items-center gap-4 border border-[rgba(180,74,255,.08)]" style={{ background: "rgba(180,74,255,.02)", fontFamily: "var(--font-mono)", fontSize: ".65rem", color: "var(--text-dim)" }}>
          <span style={{ color: "var(--purple)", letterSpacing: "1px" }}>// FORMES</span>
          {SHAPE_NAMES.map((name, i) => (
            <span key={i} style={{ color: handDetected && Math.min(fingerCount, 5) === i ? "#fff" : "var(--text-dim)", transition: "color .2s" }}>
              <span style={{ color: handDetected && Math.min(fingerCount, 5) === i ? "var(--purple)" : "var(--cyan)", fontWeight: 600, textShadow: handDetected && Math.min(fingerCount, 5) === i ? "0 0 8px var(--purple)" : "none" }}>{i}</span> {name}
            </span>
          ))}
        </div>

        {/* Tech stack */}
        <div className="reveal reveal-delay-3 mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 border border-[rgba(0,240,255,.08)]" style={{ background: "var(--surface)" }}>
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: ".75rem", letterSpacing: "2px", color: "var(--cyan)", marginBottom: ".5rem" }}>DÉTECTION</h4>
            <p style={{ color: "var(--text-dim)", fontSize: ".8rem", lineHeight: 1.6, fontWeight: 400 }}>
              MediaPipe Hands détecte 21 landmarks par main. Le pinch (pouce-index),
              la position, la rotation du poignet et l&apos;écartement des doigts
              sont calculés en temps réel.
            </p>
          </div>
          <div className="p-5 border border-[rgba(180,74,255,.08)]" style={{ background: "var(--surface)" }}>
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: ".75rem", letterSpacing: "2px", color: "var(--purple)", marginBottom: ".5rem" }}>GESTES → 3D</h4>
            <p style={{ color: "var(--text-dim)", fontSize: ".8rem", lineHeight: 1.6, fontWeight: 400 }}>
              Pinch = échelle, position main = déplacement, angle du poignet = rotation Z,
              écartement des doigts = intensité du glow. Chaque geste contrôle un axe
              différent de la forme 3D.
            </p>
          </div>
          <div className="p-5 border border-[rgba(0,255,65,.08)]" style={{ background: "var(--surface)" }}>
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: ".75rem", letterSpacing: "2px", color: "var(--green)", marginBottom: ".5rem" }}>RENDU</h4>
            <p style={{ color: "var(--text-dim)", fontSize: ".8rem", lineHeight: 1.6, fontWeight: 400 }}>
              Three.js superposé sur le feed caméra avec transparence.
              Matériaux Phong, éclairage multi-sources, wireframe overlay.
              Lerp sur toutes les valeurs pour des transitions fluides.
            </p>
          </div>
        </div>

        <div className="reveal reveal-delay-4 mt-6 text-center">
          <p style={{ color: "var(--text-faint)", fontSize: ".8rem", fontFamily: "var(--font-mono)", letterSpacing: "1px" }}>
            Code source sur{" "}
            <a href="https://github.com/hermanvanel-ui/herman-portfolio" target="_blank" rel="noopener noreferrer" style={{ color: "var(--cyan)", textDecoration: "underline" }}>GitHub</a>
            {" "}· MediaPipe Hands · Three.js · Next.js
          </p>
        </div>
      </div>
    </section>
  );
}
