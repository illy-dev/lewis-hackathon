import React, { useState, useEffect, useRef } from 'react';

const Fog: React.FC = () => {
  const [circle, setCircle] = useState<{ x: number; y: number } | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const updateMask = () => {
      if (overlayRef.current && circle) {
        const { x, y } = circle;

        const maskImage = `radial-gradient(circle 100px at ${x}px ${y}px, transparent 70%, black 100%)`;
        
        overlayRef.current.style.webkitMaskImage = maskImage;
        overlayRef.current.style.maskImage = maskImage;
      }
      animationFrameId.current = requestAnimationFrame(updateMask);
    };

    updateMask();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [circle]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (overlayRef.current) {
    const rect = overlayRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCircle({ x, y });
    }
  };

  return (
    <div className="relative w-[100%] h-[63vh]" onMouseMove={handleMouseMove}>
      <div className="absolute top-0 left-0 w-[100%] h-[100%] bg-black z-10" ref={overlayRef}></div>
    </div>
  );
};

export default Fog;
