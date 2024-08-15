'use client';

import Searchbar from "@/components/Searchbar";
import TitleBanner from "@/components/TitleBanner";
import WeatherDisplay from "@/components/Weather/WeatherDisplay";
import Navbar from "@/components/Navbar";

import getWeather from "@/api/callWeatherApi";

export default function Home() {
  let weatherData = null

  const handleSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const loc = formData.get('location')?.toString()
    if (loc != null) {
        console.log(getWeather({ city: loc }));
        weatherData = getWeather({ city: loc });
    }
    
    console.log(loc);
}

  return (
   <>
   <Navbar />
    <TitleBanner />
    <Searchbar handleSubmit={handleSubmit}/>
    <WeatherDisplay weatherData={weatherData} />
   </>
  );
}
