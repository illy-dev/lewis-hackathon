'use client';

import RandomImages from "./RandomImages";
import Fog from "./Fog";

import { useState, useEffect } from 'react';

export default function WeatherDisplay() {
    const screenWidth = useWidth();
    const cloudy = false

    return(
        <div className="flex justify-center items-center mt-7">
            {cloudy && (
                <RandomImages 
                    n={5}
                    imageUrl="cloud.png"
                    divWidth={screenWidth} 
                    divHeight={600} 
                    speed={2}
                />
            )}
            <Fog></Fog>
        </div>
    );
}

const useWidth = () => {
    const [width, setWidth] = useState(0)
    const handleResize = () => setWidth(window.innerWidth)
    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    return width
  }