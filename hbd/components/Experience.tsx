
import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ExperienceState } from '../types';
import Balloons from './Balloons';
import Particles from './Particles';

interface ExperienceProps {
  state: ExperienceState;
}

const Experience: React.FC<ExperienceProps> = ({ state }) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const { viewport } = useThree();

  useEffect(() => {
    if (state === ExperienceState.TRANSITIONING) {
      // Cinematic zoom in
      gsap.to(cameraRef.current.position, {
        z: 6,
        duration: 4,
        ease: 'power2.inOut',
      });
      gsap.to(cameraRef.current.rotation, {
        x: -0.1,
        duration: 4,
        ease: 'power2.inOut',
      });
    }
  }, [state]);

  useFrame((stateFrame) => {
    const t = stateFrame.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.1;
      groupRef.current.position.y = Math.cos(t * 0.2) * 0.1;
    }
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 12]} />
      
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#4fd1c5" />
      <pointLight position={[-10, 5, 5]} intensity={1} color="#38bdf8" />
      <spotLight 
        position={[0, 10, 0]} 
        angle={0.15} 
        penumbra={1} 
        intensity={2} 
        castShadow 
        color="#fef3c7"
      />

      <group ref={groupRef}>
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Particles count={40} />
        
        {state !== ExperienceState.LANDING && (
          <Balloons count={12} isRevealed={state === ExperienceState.REVEALED} />
        )}
      </group>

      <Environment preset="night" />
    </>
  );
};

export default Experience;
