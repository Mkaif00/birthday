
import React, { useState, useCallback, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ExperienceState } from './types';
import Experience from './components/Experience';
import Overlay from './components/Overlay';

const App: React.FC = () => {
  const [state, setState] = useState<ExperienceState>(ExperienceState.LANDING);

  const handleStart = useCallback(() => {
    setState(ExperienceState.TRANSITIONING);
    // Allow for camera transition to complete before revealing text
    setTimeout(() => {
      setState(ExperienceState.REVEALED);
    }, 4000);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-950">
      <div className="absolute inset-0 z-0">
        <Canvas
          shadows
          camera={{ position: [0, 0, 10], fov: 45 }}
          dpr={[1, 2]}
        >
          <color attach="background" args={['#020617']} />
          <fog attach="fog" args={['#020617', 5, 25]} />
          <Suspense fallback={null}>
            <Experience state={state} />
          </Suspense>
        </Canvas>
      </div>

      <Overlay state={state} onStart={handleStart} />
    </div>
  );
};

export default App;
