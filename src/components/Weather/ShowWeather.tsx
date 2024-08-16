export const WeatherCard = ({ max_temp, location, min_temp, date, image } : { max_temp: string, location: string, min_temp: string, date: string, image: string }) => (
    <div className="flex w-[100%] h-[100%] bg-gradient-to-b from-[#5f90cb] to-[#9ac2e6] rounded-lg flex-col items-center text-white">
        <h1>{location}</h1>
        <div className="flex flex-row">
            <div className="flex items-center justify-start ml-2">
                <img src={image} alt={image} className="max-w-[50%]" />
            </div>
            <div className="flex items-start justify-center text-2xl flex-col pr-9">
                <p className="whitespace-nowrap">📆 {date}</p>
                <p className="whitespace-nowrap">▲ {max_temp}°C</p>
                <p className="whitespace-nowrap">◆ </p>
                <p className="whitespace-nowrap">▼ {min_temp}°C</p>
            </div>
        </div>
    </div>
);