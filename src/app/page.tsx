import Searchbar from "@/components/Searchbar";
import TitleBanner from "@/components/TitleBanner";
import WeatherDisplay from "@/components/Weather/WeatherDisplay";

export default function Home() {
  return (
   <>
    <TitleBanner />
    <Searchbar />
    <WeatherDisplay />
   </>
  );
}
