import { useEffect, useState } from 'react';

import RandomImages from './RandomImages';

import Fog from './Fog';
import Sun from './Sun';
import Rain from './Rain';

import { WeatherCard } from './ShowWeather';

interface ShowWeatherProps {
    weatherData: {
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
    } | null;
}

export default function WeatherDisplay({ weatherData, location }: ShowWeatherProps & { location: string }) {
    let cloudy = false;
    let foggy = false;
    let sunny = false;
    let raining = false;

    if (weatherData?.current.cloudCover != null && weatherData?.current.cloudCover > 60) {cloudy = true}
    if (weatherData?.current.rain != null && weatherData?.current.rain > 0) {raining = true}
    if (weatherData?.current.showers != null && weatherData?.current.showers > 0) {raining = true}
    if (cloudy == false && raining == false && weatherData?.current.snowfall != null && weatherData?.current.snowfall > 0 ) {sunny = true}
    const screenWidth = useWidth();



    return (
        <div className="mt-7">
            <div className='flex justify-center items-center'><ShowWeather weatherData={weatherData} location={location} cloudy={cloudy} raining={raining} sunny={sunny}/></div>
            {cloudy && (
                <div className='absolute'>
                <RandomImages
                    n={2}
                    imageUrl="cloud.png"
                    divWidth={screenWidth}
                    divHeight={390}
                    speed={2}
                /></div>
            )}
            {foggy && <Fog />}
            {sunny && <Sun />}
            {raining && <div className="w-screen h-[23rem] absolute"><Rain /></div>}
        </div>
    );
}

const useWidth = () => {
    const [width, setWidth] = useState(0);
    const handleResize = () => setWidth(window.innerWidth);
    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return width;
};

function ShowWeather({ weatherData, location, cloudy, raining, sunny }: ShowWeatherProps & { location: string, cloudy: boolean, raining: boolean, sunny: boolean }) {
    let image = '';
    if (cloudy == true) {image = 'cloudy.png'}
    if (raining == true) {image = 'rainy.png'}
    if (sunny == true) {image = 'sunny.png'}

    console.log(weatherData?.current.rain)

    return (
        <div>
            {weatherData && 
                    <div className='left-[36%] absolute w-[30%] h-[25%]'>
                        <WeatherCard location={location.toString()} max_temp={weatherData?.daily.temperature2mMax[0].toFixed(1)} min_temp={weatherData?.daily.temperature2mMin[0].toFixed(1)} date={weatherData?.current.time.toString().substring(0, 10)} image={image} />
                    </div>
                    }
        
        </div>
    );
}
