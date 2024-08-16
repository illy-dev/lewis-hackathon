'use client';

import { useState } from 'react';

import Searchbar from "@/components/Searchbar";
import TitleBanner from "@/components/TitleBanner";
import WeatherDisplay from "@/components/Weather/WeatherDisplay";
import Navbar from "@/components/Navbar";

import getWeather from "@/api/callWeatherApi";

interface WeatherData {
  current: {
      time: Date;
      temperature2m: number;
      apparentTemperature: number;
      isDay: number;
      rain: number;
      showers: number;
      snowfall: number;
      cloudCover: number;
  };
  daily: {
      time: Date[];
      temperature2mMax: Float32Array;
      temperature2mMin: Float32Array;
  };
}


export default function Home() {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [location, setLocation] = useState('')

    const handleSubmit = async (e: React.ChangeEvent<any>) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const loc = formData.get('location')?.toString();
        setLocation(`${loc}`)
        if (loc != null) {
            const data = await getWeather({ city: loc });
            setWeatherData(data);
        }
        
        console.log(loc);
    };

    return (
        <>
            <Navbar />
            <TitleBanner />
            <Searchbar handleSubmit={handleSubmit} />
            <WeatherDisplay weatherData={weatherData} location={location} />
        </>
    );
}
