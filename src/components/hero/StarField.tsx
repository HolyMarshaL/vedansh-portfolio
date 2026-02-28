"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface StarFieldProps {
  count?: number;
  mouseX?: number;
  mouseY?: number;
}

export default function StarField({
  count = 3000,
  mouseX = 0,
  mouseY = 0,
}: StarFieldProps) {
  const mesh = useRef<THREE.Points>(null);

  const [positions, sizes, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Spread stars in a large cube
      pos[i * 3] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 100;

      siz[i] = Math.random() * 2 + 0.5;

      // Mix of cyan, purple, and white stars
      const colorChoice = Math.random();
      if (colorChoice < 0.3) {
        // Cyan stars
        col[i * 3] = 0;
        col[i * 3 + 1] = 0.94;
        col[i * 3 + 2] = 1;
      } else if (colorChoice < 0.5) {
        // Purple stars
        col[i * 3] = 0.71;
        col[i * 3 + 1] = 0.29;
        col[i * 3 + 2] = 1;
      } else {
        // White stars
        col[i * 3] = 0.94;
        col[i * 3 + 1] = 0.94;
        col[i * 3 + 2] = 1;
      }
    }

    return [pos, siz, col];
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;

    // Slow rotation
    mesh.current.rotation.y += 0.0002;
    mesh.current.rotation.x += 0.0001;

    // Mouse-based parallax
    const targetX = mouseX * 0.3;
    const targetY = mouseY * 0.3;
    mesh.current.rotation.y += (targetX - mesh.current.rotation.y) * 0.01;
    mesh.current.rotation.x += (targetY - mesh.current.rotation.x) * 0.01;

    // Pulsing brightness
    const time = state.clock.elapsedTime;
    const material = mesh.current.material as THREE.PointsMaterial;
    material.opacity = 0.7 + Math.sin(time * 0.5) * 0.1;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
