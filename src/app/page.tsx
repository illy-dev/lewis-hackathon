import Searchbar from "@/components/Searchbar";
import TitleBanner from "@/components/TitleBanner";
import WeatherDisplay from "@/components/Weather/WeatherDisplay";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
   <>
   <Navbar />
    <TitleBanner />
    <Searchbar />
    <WeatherDisplay />
   </>
  );
}
