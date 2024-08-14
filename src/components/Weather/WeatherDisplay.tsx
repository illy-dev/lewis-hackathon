'use client';

import RandomImages from "./Clouds";
import { useState, useEffect } from 'react';

export default function WeatherDisplay() {
    const screenWidth = useWidth();


    return(
        <div className="flex justify-center items-center mt-7">
            <RandomImages 
                n={10}
                imageUrl="https://images.rawpixel.com/image_png_social_landscape/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvdjExNDctZWxlbWVudC0wMS1renoxbjhnZi5wbmc.png"
                divWidth={screenWidth} 
                divHeight={500} 
            />
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return width
  }