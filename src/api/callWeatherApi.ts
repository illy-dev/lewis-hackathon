import { fetchWeatherApi } from 'openmeteo';

// Main function to fetch and process weather data
export default async function getWeather({ city }: { city: string }) {
    // Function to fetch longitude and latitude based on city name
    const getLongLang = async () => {
        const url = `https://nominatim.openstreetmap.org/search?q=${city}&format=json`;
        const resp = await fetch(url);
        const data = await resp.json();
        return data[0];
    }

    // Fetch location data
    const location = await getLongLang();
    if (!location) {
        throw new Error('Location not found');
    }

    // Extract longitude and latitude
    const long = location.lon;
    const lat = location.lat;

    // Define parameters for weather API
    const params = {
        latitude: lat,
        longitude: long,
        current: ["temperature_2m", "apparent_temperature", "is_day", "rain", "showers", "snowfall", "cloud_cover"],
        daily: ["temperature_2m_max", "temperature_2m_min"]
    };

    const url = "https://api.open-meteo.com/v1/forecast";

    // Function to fetch weather data
    const getResp = async () => {
        const responses = await fetchWeatherApi(url, params);
        return responses;
    }

    // Fetch weather data
    const response1 = await getResp();
    const response = response1[0];

    // Helper function to form time ranges
    const range = (start: number, stop: number, step: number) =>
        Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();

    const current = response.current()!;
    const daily = response.daily()!;

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
        current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature2m: current.variables(0)!.value(),
            apparentTemperature: current.variables(1)!.value(),
            isDay: current.variables(2)!.value(),
            rain: current.variables(3)!.value(),
            showers: current.variables(4)!.value(),
            snowfall: current.variables(5)!.value(),
            cloudCover: current.variables(6)!.value(),
        },
        daily: {
            time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            temperature2mMax: daily.variables(0)!.valuesArray()!,
            temperature2mMin: daily.variables(1)!.valuesArray()!,
        },
    };

    // `weatherData` now contains a simple structure with arrays for datetime and weather data
    for (let i = 0; i < weatherData.daily.time.length; i++) {
        console.log(
            weatherData.daily.time[i].toISOString(),
            weatherData.daily.temperature2mMax[i],
            weatherData.daily.temperature2mMin[i]
        );
    }
}
