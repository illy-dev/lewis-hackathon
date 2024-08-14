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
  speed: number;
}

const RandomImages: React.FC<RandomImagesProps> = ({ n, imageUrl, divWidth, divHeight, speed }) => {
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    const generateInitialPositions = () => {
      const newPositions: Position[] = [];
      for (let i = 0; i < n; i++) {
        const y = Math.random() * divHeight;
        newPositions.push({ x: divWidth, y });
      }
      setPositions(newPositions);
    };

    generateInitialPositions();
  }, [n, divWidth, divHeight]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPositions(prevPositions =>
        prevPositions
          .map(pos => ({ ...pos, x: pos.x - speed }))
          .filter(pos => pos.x > -100)
      );
    }, 1000 / 60);

    return () => clearInterval(intervalId);
  }, [speed]);

  useEffect(() => {
    const spawnInterval = setInterval(() => {
      const y = Math.random() * divHeight;
      setPositions(prevPositions => [...prevPositions, { x: divWidth, y }]);
    }, 1300); 

    return () => clearInterval(spawnInterval);
  }, [divWidth, divHeight]);

  return (
    <div style={{ width: divWidth, height: divHeight, position: 'relative', overflow: 'hidden'}}>
      {positions.map((pos, index) => (
        <img
          key={index}
          src={imageUrl}
          alt={`random-img-${index}`}
          className='max-h-32 max-w-64'
          style={{
            position: 'absolute',
            top: pos.y,
            left: pos.x,
            transform: 'translate(-50%, -50%)',
            transition: 'transform 1s linear',
          }}
        />
      ))}
    </div>
  );
};

export default RandomImages;
