"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface StarFieldProps {
  count?: number;
  mouseX?: number;
  mouseY?: number;
  isMobile?: boolean;
}

function createStarTexture(): THREE.Texture {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;

  // Create radial gradient for a soft, glowy circular star
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.08, "rgba(255, 255, 255, 0.9)");
  gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.5)");
  gradient.addColorStop(0.4, "rgba(255, 255, 255, 0.2)");
  gradient.addColorStop(0.7, "rgba(255, 255, 255, 0.05)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function StarField({
  count = 3000,
  mouseX = 0,
  mouseY = 0,
  isMobile = false,
}: StarFieldProps) {
  const mesh = useRef<THREE.Points>(null);

  const starTexture = useMemo(() => createStarTexture(), []);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Spread stars in a large sphere-ish volume
      pos[i * 3] = (Math.random() - 0.5) * 120;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 120;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 100;

      // Mix of pink, purple, blue, magenta, and white stars
      const colorChoice = Math.random();
      if (colorChoice < 0.15) {
        // Hot pink stars
        col[i * 3] = 1;
        col[i * 3 + 1] = 0.18;
        col[i * 3 + 2] = 0.48;
      } else if (colorChoice < 0.28) {
        // Purple stars
        col[i * 3] = 0.71;
        col[i * 3 + 1] = 0.29;
        col[i * 3 + 2] = 1;
      } else if (colorChoice < 0.40) {
        // Electric blue stars
        col[i * 3] = 0.3;
        col[i * 3 + 1] = 0.49;
        col[i * 3 + 2] = 1;
      } else if (colorChoice < 0.48) {
        // Magenta stars
        col[i * 3] = 1;
        col[i * 3 + 1] = 0.27;
        col[i * 3 + 2] = 0.8;
      } else if (colorChoice < 0.55) {
        // Warm orange stars
        col[i * 3] = 1;
        col[i * 3 + 1] = 0.42;
        col[i * 3 + 2] = 0.21;
      } else {
        // White/blue-white stars (majority)
        col[i * 3] = 0.88 + Math.random() * 0.12;
        col[i * 3 + 1] = 0.86 + Math.random() * 0.14;
        col[i * 3 + 2] = 1;
      }
    }

    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;

    const time = state.clock.elapsedTime;

    if (isMobile) {
      // ── Mobile: beautiful auto-orbit + optional gyroscope response ──
      // Slow sinusoidal drift — stars gently breathe and sway on their own
      const autoX = Math.sin(time * 0.07) * 0.35;
      const autoY = Math.sin(time * 0.05 + 1.2) * 0.22;

      // Gyroscope (mouseX/mouseY hold device orientation values on mobile)
      // Blend auto-rotation with gyroscope tilt for a magical feel
      mesh.current.rotation.y = autoX + mouseX * 0.5;
      mesh.current.rotation.x = autoY + mouseY * 0.3;
    } else {
      // ── Desktop: slow constant rotation + mouse parallax ──
      mesh.current.rotation.y += 0.0002;
      mesh.current.rotation.x += 0.0001;

      const targetX = mouseX * 0.3;
      const targetY = mouseY * 0.3;
      mesh.current.rotation.y += (targetX - mesh.current.rotation.y) * 0.01;
      mesh.current.rotation.x += (targetY - mesh.current.rotation.x) * 0.01;
    }

    // Gentle pulsing brightness (same on both)
    const material = mesh.current.material as THREE.PointsMaterial;
    material.opacity = 0.75 + Math.sin(time * 0.5) * 0.1;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.5 : 0.4}
        map={starTexture}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
