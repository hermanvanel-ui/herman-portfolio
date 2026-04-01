"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";

// Finger tip and pip landmark indices for counting fingers
const FINGER_TIPS = [8, 12, 16, 20]; // index, middle, ring, pinky
const FINGER_PIPS = [6, 10, 14, 18];
const THUMB_TIP = 4;
const THUMB_IP = 3;

function countFingers(landmarks: { x: number; y: number; z: number }[]): number {
  let count = 0;
  // Thumb: compare x position (works for right hand facing camera)
  if (landmarks[THUMB_TIP].x < landmarks[THUMB_IP].x) count++;
  // Other fingers: tip above pip (y is inverted in screen coords)
  for (let i = 0; i < FINGER_TIPS.length; i++) {
    if (landmarks[FINGER_TIPS[i]].y < landmarks[FINGER_PIPS[i]].y) count++;
  }
  return count;
}

function getHandCenter(landmarks: { x: number; y: number; z: number }[]): { x: number; y: number } {
  // Use wrist (0) and middle finger mcp (9) average
  return {
    x: (landmarks[0].x + landmarks[9].x) / 2,
    y: (landmarks[0].y + landmarks[9].y) / 2,
  };
}

function getHandSize(landmarks: { x: number; y: number; z: number }[]): number {
  // Distance between wrist and middle fingertip
  const dx = landmarks[0].x - landmarks[12].x;
  const dy = landmarks[0].y - landmarks[12].y;
  return Math.sqrt(dx * dx + dy * dy);
}

const SHAPE_NAMES = ["Cube", "Cylindre", "Cône", "Tore", "Dodécaèdre", "Sphère"];

export default function HandTrackingDemo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const threeContainerRef = useRef<HTMLDivElement>(null);
  const [fingerCount, setFingerCount] = useState<number>(0);
  const [handDetected, setHandDetected] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Three.js refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraObjRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const targetScaleRef = useRef(1);
  const currentFingerRef = useRef(0);

  // Initialize Three.js
  useEffect(() => {
    if (!threeContainerRef.current) return;

    const container = threeContainerRef.current;
    const w = container.clientWidth;
    const h = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 1000);
    camera.position.z = 4;
    cameraObjRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambient = new THREE.AmbientLight(0x404060, 0.6);
    scene.add(ambient);
    const dirLight = new THREE.DirectionalLight(0x00f0ff, 1.2);
    dirLight.position.set(2, 3, 4);
    scene.add(dirLight);
    const purpleLight = new THREE.PointLight(0xb44aff, 0.8, 10);
    purpleLight.position.set(-3, -2, 2);
    scene.add(purpleLight);

    // Initial mesh (cube)
    const geo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const mat = new THREE.MeshPhongMaterial({
      color: 0x00f0ff,
      emissive: 0x001820,
      specular: 0x00f0ff,
      shininess: 80,
      wireframe: false,
      transparent: true,
      opacity: 0.85,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);
    meshRef.current = mesh;

    // Wireframe overlay
    const wireMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true, transparent: true, opacity: 0.15 });
    const wireMesh = new THREE.Mesh(geo.clone(), wireMat);
    mesh.add(wireMesh);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (meshRef.current) {
        // Smooth rotation toward target
        meshRef.current.rotation.x += (targetRotationRef.current.x - meshRef.current.rotation.x) * 0.08;
        meshRef.current.rotation.y += (targetRotationRef.current.y - meshRef.current.rotation.y) * 0.08;

        // Smooth scale
        const s = meshRef.current.scale.x;
        const target = targetScaleRef.current;
        const newS = s + (target - s) * 0.08;
        meshRef.current.scale.set(newS, newS, newS);

        // Idle rotation when no hand
        if (!handDetected) {
          targetRotationRef.current.y += 0.005;
          targetRotationRef.current.x += 0.002;
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize
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
  }, [handDetected]);

  // Change geometry based on finger count
  const changeShape = useCallback((fingers: number) => {
    if (!meshRef.current || !sceneRef.current) return;
    if (fingers === currentFingerRef.current) return;
    currentFingerRef.current = fingers;

    const oldMesh = meshRef.current;
    let newGeo: THREE.BufferGeometry;

    switch (fingers) {
      case 0: newGeo = new THREE.BoxGeometry(1.5, 1.5, 1.5); break;
      case 1: newGeo = new THREE.CylinderGeometry(0.8, 0.8, 2, 32); break;
      case 2: newGeo = new THREE.ConeGeometry(1, 2, 32); break;
      case 3: newGeo = new THREE.TorusGeometry(0.8, 0.35, 16, 50); break;
      case 4: newGeo = new THREE.DodecahedronGeometry(1.2); break;
      default: newGeo = new THREE.SphereGeometry(1.2, 32, 32); break;
    }

    // Colors per shape
    const colors = [0x00f0ff, 0x00ff41, 0xff6b35, 0xb44aff, 0xff2d7b, 0x60f8ff];
    const emissives = [0x001820, 0x001a08, 0x1a0a00, 0x0d0018, 0x1a0008, 0x001820];

    const mat = new THREE.MeshPhongMaterial({
      color: colors[fingers] || 0x00f0ff,
      emissive: emissives[fingers] || 0x001820,
      specular: colors[fingers] || 0x00f0ff,
      shininess: 80,
      transparent: true,
      opacity: 0.85,
    });

    const newMesh = new THREE.Mesh(newGeo, mat);
    newMesh.rotation.copy(oldMesh.rotation);
    newMesh.scale.copy(oldMesh.scale);

    // Wireframe overlay
    const wireMat = new THREE.MeshBasicMaterial({
      color: colors[fingers] || 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    newMesh.add(new THREE.Mesh(newGeo.clone(), wireMat));

    sceneRef.current.remove(oldMesh);
    sceneRef.current.add(newMesh);
    meshRef.current = newMesh;
  }, []);

  // Initialize MediaPipe + Camera
  useEffect(() => {
    let hands: any = null;
    let cameraInstance: any = null;
    let animFrameId: number | undefined;

    const init = async () => {
      try {
        // Dynamically import mediapipe
        const handsModule = await import("@mediapipe/hands");
        const Hands = handsModule.Hands;
        const HAND_CONNECTIONS = handsModule.HAND_CONNECTIONS;
        const { Camera } = await import("@mediapipe/camera_utils");
        const drawingUtils = await import("@mediapipe/drawing_utils");

        if (!videoRef.current || !canvasRef.current) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        hands = new Hands({
          locateFile: (file: string) =>
            `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
        });

        hands.setOptions({
          maxNumHands: 1,
          modelComplexity: 1,
          minDetectionConfidence: 0.7,
          minTrackingConfidence: 0.5,
        });

        hands.onResults((results: any) => {
          // Draw camera feed on canvas
          canvas.width = video.videoWidth || 640;
          canvas.height = video.videoHeight || 480;
          ctx.save();
          // Mirror the image
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);
          ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
          ctx.restore();

          if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            const landmarks = results.multiHandLandmarks[0];
            setHandDetected(true);

            // Draw hand skeleton (mirrored)
            ctx.save();
            ctx.translate(canvas.width, 0);
            ctx.scale(-1, 1);
            drawingUtils.drawConnectors(ctx, landmarks, HAND_CONNECTIONS, {
              color: "rgba(0, 240, 255, 0.5)",
              lineWidth: 2,
            });
            drawingUtils.drawLandmarks(ctx, landmarks, {
              color: "rgba(0, 240, 255, 0.8)",
              lineWidth: 1,
              radius: 3,
            });
            ctx.restore();

            // Count fingers
            const fingers = countFingers(landmarks);
            setFingerCount(fingers);
            changeShape(fingers);

            // Hand position → rotation
            const center = getHandCenter(landmarks);
            targetRotationRef.current = {
              x: (center.y - 0.5) * Math.PI * 2,
              y: (center.x - 0.5) * Math.PI * -2,
            };

            // Hand size → scale
            const size = getHandSize(landmarks);
            targetScaleRef.current = Math.max(0.5, Math.min(2.5, size * 5));
          } else {
            setHandDetected(false);
          }
        });

        cameraInstance = new Camera(video, {
          onFrame: async () => {
            await hands.send({ image: video });
          },
          width: 640,
          height: 480,
        });

        await cameraInstance.start();
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
      if (cameraInstance) {
        cameraInstance.stop?.();
      }
      if (hands) {
        hands.close?.();
      }
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
      }
    };
  }, [changeShape]);

  return (
    <section id="hand-demo" className="section-base">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-12 reveal">
          <div className="section-label" style={{ color: "var(--green)" }}>// demo interactive</div>
          <h2 className="section-title">Contrôlez avec vos <span style={{ color: "var(--cyan)", textShadow: "0 0 20px rgba(0,240,255,.3)" }}>mains</span></h2>
          <p className="mt-4" style={{ color: "var(--text-mid)", fontSize: "1.05rem", lineHeight: 1.7, fontWeight: 400, maxWidth: "750px" }}>
            Cette démo utilise votre caméra pour détecter vos mains en temps réel via MediaPipe.
            Le nombre de doigts levés change la forme 3D, et la position de votre main
            contrôle la rotation et la taille de l&apos;objet. Zéro framework magique, juste
            du code : MediaPipe Hands + Three.js.
          </p>
        </div>

        {/* Instructions */}
        <div className="reveal reveal-delay-1 mb-8 p-5 border border-[rgba(0,240,255,.12)]" style={{ background: "rgba(0,240,255,.02)" }}>
          <div className="flex flex-wrap gap-x-8 gap-y-3" style={{ fontFamily: "var(--font-mono)", fontSize: ".75rem", color: "var(--text-dim)", letterSpacing: "1px" }}>
            <span><span style={{ color: "var(--cyan)" }}>0 doigt</span> → Cube</span>
            <span><span style={{ color: "var(--green)" }}>1 doigt</span> → Cylindre</span>
            <span><span style={{ color: "#ff6b35" }}>2 doigts</span> → Cône</span>
            <span><span style={{ color: "var(--purple)" }}>3 doigts</span> → Tore</span>
            <span><span style={{ color: "var(--pink)" }}>4 doigts</span> → Dodécaèdre</span>
            <span><span style={{ color: "var(--cyan-bright)" }}>5 doigts</span> → Sphère</span>
            <span style={{ color: "var(--text-faint)" }}>+ position = rotation · taille main = scale</span>
          </div>
        </div>

        {/* Main demo area */}
        <div className="reveal reveal-delay-2 grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden border border-[rgba(0,240,255,.15)]" style={{ background: "var(--surface)", minHeight: "480px" }}>
          {/* Camera side */}
          <div className="relative" style={{ background: "#000", minHeight: "400px" }}>
            <video ref={videoRef} className="hidden" playsInline />
            <canvas
              ref={canvasRef}
              className="w-full h-full object-cover"
              style={{ transform: "scaleX(1)", minHeight: "400px" }}
            />
            {/* Loading overlay */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(5,5,16,.9)" }}>
                <div className="text-center">
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: ".85rem", color: "var(--cyan)", letterSpacing: "2px" }}>
                    Chargement de MediaPipe...
                  </div>
                  <div className="mt-3" style={{ fontFamily: "var(--font-mono)", fontSize: ".7rem", color: "var(--text-faint)" }}>
                    Autorisez l&apos;accès à la caméra
                  </div>
                </div>
              </div>
            )}
            {/* Error overlay */}
            {cameraError && (
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(5,5,16,.9)" }}>
                <div className="text-center p-6">
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: ".85rem", color: "var(--pink)", letterSpacing: "1px", marginBottom: "1rem" }}>
                    Caméra non disponible
                  </div>
                  <p style={{ color: "var(--text-dim)", fontSize: ".85rem", lineHeight: 1.6, maxWidth: "300px" }}>
                    {cameraError}. La démo nécessite une webcam et l&apos;autorisation
                    d&apos;accès. Essayez sur Chrome avec HTTPS.
                  </p>
                </div>
              </div>
            )}
            {/* Status badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5" style={{ background: "rgba(5,5,16,.8)", border: "1px solid rgba(0,240,255,.2)", fontFamily: "var(--font-mono)", fontSize: ".65rem", letterSpacing: "1px" }}>
              <span className="w-2 h-2 rounded-full" style={{ background: handDetected ? "var(--green)" : cameraReady ? "var(--cyan)" : "var(--text-faint)", boxShadow: handDetected ? "0 0 8px var(--green)" : "none" }} />
              <span style={{ color: handDetected ? "var(--green)" : "var(--text-dim)" }}>
                {handDetected ? "MAIN DÉTECTÉE" : cameraReady ? "EN ATTENTE..." : "INIT..."}
              </span>
            </div>
            {/* Cam label */}
            <div className="absolute bottom-4 left-4" style={{ fontFamily: "var(--font-mono)", fontSize: ".6rem", color: "var(--text-faint)", letterSpacing: "2px" }}>
              WEBCAM · MEDIAPIPE HANDS
            </div>
          </div>

          {/* 3D side */}
          <div className="relative" style={{ minHeight: "400px", borderLeft: "1px solid rgba(0,240,255,.1)" }}>
            <div ref={threeContainerRef} className="w-full h-full" style={{ minHeight: "400px" }} />
            {/* Shape name */}
            <div className="absolute top-4 right-4 px-3 py-1.5" style={{ background: "rgba(5,5,16,.8)", border: "1px solid rgba(0,240,255,.2)", fontFamily: "var(--font-display)", fontSize: ".7rem", letterSpacing: "2px", color: "var(--cyan)" }}>
              {SHAPE_NAMES[fingerCount] || "Cube"}
            </div>
            {/* Finger count */}
            <div className="absolute bottom-4 right-4 flex items-center gap-3">
              <span style={{ fontFamily: "var(--font-mono)", fontSize: ".6rem", color: "var(--text-faint)", letterSpacing: "2px" }}>
                THREE.JS · WEBGL
              </span>
              <div className="px-3 py-1.5" style={{ background: "rgba(5,5,16,.8)", border: "1px solid rgba(0,240,255,.2)", fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: handDetected ? "var(--cyan)" : "var(--text-faint)", minWidth: "40px", textAlign: "center", textShadow: handDetected ? "0 0 15px rgba(0,240,255,.5)" : "none" }}>
                {handDetected ? fingerCount : "-"}
              </div>
            </div>
          </div>
        </div>

        {/* Tech stack */}
        <div className="reveal reveal-delay-3 mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 border border-[rgba(0,240,255,.08)]" style={{ background: "var(--surface)" }}>
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: ".75rem", letterSpacing: "2px", color: "var(--cyan)", marginBottom: ".5rem" }}>DÉTECTION</h4>
            <p style={{ color: "var(--text-dim)", fontSize: ".8rem", lineHeight: 1.6, fontWeight: 400 }}>
              MediaPipe Hands détecte 21 points de repère sur chaque main en temps réel,
              directement dans le navigateur. Pas de serveur, tout tourne côté client.
            </p>
          </div>
          <div className="p-5 border border-[rgba(180,74,255,.08)]" style={{ background: "var(--surface)" }}>
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: ".75rem", letterSpacing: "2px", color: "var(--purple)", marginBottom: ".5rem" }}>LOGIQUE</h4>
            <p style={{ color: "var(--text-dim)", fontSize: ".8rem", lineHeight: 1.6, fontWeight: 400 }}>
              Le comptage de doigts compare la position des bouts de doigts avec les
              articulations. La position du centre de la main pilote la rotation. La taille
              de la main contrôle l&apos;échelle.
            </p>
          </div>
          <div className="p-5 border border-[rgba(0,255,65,.08)]" style={{ background: "var(--surface)" }}>
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: ".75rem", letterSpacing: "2px", color: "var(--green)", marginBottom: ".5rem" }}>RENDU</h4>
            <p style={{ color: "var(--text-dim)", fontSize: ".8rem", lineHeight: 1.6, fontWeight: 400 }}>
              Three.js + WebGL avec éclairage dynamique, matériaux Phong semi-transparents
              et overlay wireframe. Chaque forme a sa couleur propre. Le tout tourne
              à 60fps.
            </p>
          </div>
        </div>

        {/* Source code link */}
        <div className="reveal reveal-delay-4 mt-6 text-center">
          <p style={{ color: "var(--text-faint)", fontSize: ".8rem", fontFamily: "var(--font-mono)", letterSpacing: "1px" }}>
            Code source sur{" "}
            <a
              href="https://github.com/hermanvanel-ui/herman-portfolio"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--cyan)", textDecoration: "underline" }}
            >
              GitHub
            </a>
            {" "}· MediaPipe Hands · Three.js · Next.js
          </p>
        </div>
      </div>
    </section>
  );
}
