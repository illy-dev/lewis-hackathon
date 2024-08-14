'use client';
import React, { useState, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

interface RandomImagesProps {
  n: number;
  imageUrl: string;
  divWidth: number;
  divHeight: number;
}

const RandomImages: React.FC<RandomImagesProps> = ({ n, imageUrl, divWidth, divHeight }) => {
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    const generateRandomPositions = () => {
      const newPositions: Position[] = [];
      for (let i = 0; i < n; i++) {
        const x = Math.random() * divWidth;
        const y = Math.random() * divHeight;
        newPositions.push({ x, y });
      }
      setPositions(newPositions);
    };

    generateRandomPositions();
  }, [n, divWidth, divHeight]);

  return (
    <div style={{ width: divWidth, height: divHeight }} className='relative'>
      {positions.map((pos, index) => (
        <img
          key={index}
          src={imageUrl}
          alt={`random-img-${index}`}
          className='absolute cursor-pointer max-h-26 max-w-64'
          style={{
            top: pos.y,
            left: pos.x,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  );
};

export default RandomImages;
