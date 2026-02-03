
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

interface BalloonsProps {
  count: number;
  isRevealed: boolean;
}

const Balloon: React.FC<{ position: [number, number, number]; color: string; delay: number }> = ({ position, color, delay }) => {
  const meshRef = useRef<THREE.Group>(null!);
  const speed = useMemo(() => 0.5 + Math.random() * 0.5, []);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime() + delay;
    // Main upward floating animation
    meshRef.current.position.y = position[1] + (t * speed) % 20 - 5;
    // Subtle sway
    meshRef.current.position.x = position[0] + Math.sin(t * 0.8) * 0.5;
    meshRef.current.position.z = position[2] + Math.cos(t * 0.5) * 0.5;
    // Rotation
    meshRef.current.rotation.y = t * 0.2;
    meshRef.current.rotation.z = Math.sin(t * 0.5) * 0.1;
  });

  return (
    <group ref={meshRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Balloon Body */}
        <mesh position={[0, 0, 0]} castShadow>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshPhysicalMaterial 
            color={color} 
            metalness={0.4} 
            roughness={0.1} 
            clearcoat={1} 
            transmission={0.1}
            opacity={0.9}
            transparent
          />
        </mesh>
        {/* Balloon Tie */}
        <mesh position={[0, -0.65, 0]}>
          <coneGeometry args={[0.08, 0.15, 8]} />
          <meshStandardMaterial color={color} />
        </mesh>
        {/* String */}
        <mesh position={[0, -1.7, 0]}>
          <cylinderGeometry args={[0.005, 0.005, 2]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
        </mesh>
      </Float>
    </group>
  );
};

const Balloons: React.FC<BalloonsProps> = ({ count }) => {
  const colors = ['#134e4a', '#0f766e', '#115e59', '#164e63', '#083344', '#fef3c7'];
  
  const items = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 10,
        -10 - (Math.random() * 10),
        (Math.random() - 0.5) * 8
      ] as [number, number, number],
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 10,
    }));
  }, [count]);

  return (
    <group>
      {items.map((item, i) => (
        <Balloon key={i} {...item} />
      ))}
    </group>
  );
};

export default Balloons;
