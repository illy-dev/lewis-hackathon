import { useEffect, useState } from 'react';

type Raindrop = {
  id: number;
  left: number;
};

const Rain = () => {
  const [raindrops, setRaindrops] = useState<Raindrop[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRaindrops((prev) => [
        ...prev,
        { id: Math.random(), left: Math.random() * 100 },
      ]);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {raindrops.map((raindrop) => (
        <div
          key={raindrop.id}
          className="absolute top-0 w-[2px] h-5 bg-blue-500 animate-fall"
          style={{ left: `${raindrop.left}%` }}
          onAnimationEnd={() =>
            setRaindrops((prev) =>
              prev.filter((drop) => drop.id !== raindrop.id)
            )
          }
        />
      ))}
    </div>
  );
};

export default Rain;
