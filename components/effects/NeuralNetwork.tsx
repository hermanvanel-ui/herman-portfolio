"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Nodes
    const nodeCount = 120;
    const nodes: THREE.Mesh[] = [];
    const nodeGeo = new THREE.SphereGeometry(0.12, 8, 8);

    for (let i = 0; i < nodeCount; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.52 + Math.random() * 0.12, 1, 0.6),
        transparent: true,
        opacity: 0.7,
      });
      const mesh = new THREE.Mesh(nodeGeo, mat);
      mesh.position.set((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 25, (Math.random() - 0.5) * 20);
      mesh.userData = {
        vel: new THREE.Vector3((Math.random() - 0.5) * 0.01, (Math.random() - 0.5) * 0.01, (Math.random() - 0.5) * 0.01),
        baseOpacity: 0.4 + Math.random() * 0.4,
      };
      scene.add(mesh);
      nodes.push(mesh);
    }

    // Connections
    const maxDist = 8;
    let connections: THREE.Line[] = [];

    function updateConnections() {
      connections.forEach((l) => scene.remove(l));
      connections = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = nodes[i].position.distanceTo(nodes[j].position);
          if (d < maxDist) {
            const geo = new THREE.BufferGeometry().setFromPoints([nodes[i].position.clone(), nodes[j].position.clone()]);
            const mat = new THREE.LineBasicMaterial({
              color: 0x00f0ff,
              transparent: true,
              opacity: Math.max(0, 0.12 * (1 - d / maxDist)),
            });
            const line = new THREE.Line(geo, mat);
            scene.add(line);
            connections.push(line);
          }
        }
      }
    }

    // Mouse
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    document.addEventListener("mousemove", onMouseMove);

    // Particles
    const particleCount = 300;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    const pVel: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i < particleCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 50;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      pVel.push({ x: (Math.random() - 0.5) * 0.02, y: (Math.random() - 0.5) * 0.02, z: (Math.random() - 0.5) * 0.02 });
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x00ff41, size: 0.06, transparent: true, opacity: 0.4 });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    let frame = 0;
    let animId: number;

    function animate() {
      animId = requestAnimationFrame(animate);
      frame++;

      nodes.forEach((n) => {
        n.position.add(n.userData.vel);
        if (Math.abs(n.position.x) > 22) n.userData.vel.x *= -1;
        if (Math.abs(n.position.y) > 14) n.userData.vel.y *= -1;
        if (Math.abs(n.position.z) > 12) n.userData.vel.z *= -1;

        const dx = mouse.x * 20 - n.position.x;
        const dy = mouse.y * 12 - n.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 10) {
          const influence = 1 - dist / 10;
          (n.material as THREE.MeshBasicMaterial).opacity = n.userData.baseOpacity + influence * 0.5;
          n.scale.setScalar(1 + influence * 2);
        } else {
          (n.material as THREE.MeshBasicMaterial).opacity = n.userData.baseOpacity;
          n.scale.setScalar(1);
        }
      });

      const pp = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        pp[i * 3] += pVel[i].x;
        pp[i * 3 + 1] += pVel[i].y;
        pp[i * 3 + 2] += pVel[i].z;
        if (Math.abs(pp[i * 3]) > 25) pVel[i].x *= -1;
        if (Math.abs(pp[i * 3 + 1]) > 15) pVel[i].y *= -1;
        if (Math.abs(pp[i * 3 + 2]) > 10) pVel[i].z *= -1;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      if (frame % 30 === 0) updateConnections();

      camera.position.x += (mouse.x * 3 - camera.position.x) * 0.02;
      camera.position.y += (mouse.y * 2 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }

    updateConnections();
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, zIndex: 1 }}
    />
  );
}
