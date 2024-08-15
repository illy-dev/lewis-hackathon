'use client';
import { IoSearch } from "react-icons/io5";

import getWeather from "@/api/callWeatherApi";

export default function Searchbar({ handleSubmit } : { handleSubmit: any }) {



    return(
        <form action="post" onSubmit={handleSubmit}>
            <div className="flex flex-row justify-center mt-2">
                <input type="text" name="location" className="w-[30%] pr-14 pl-6 h-11 text-[15px] leading-5 bg-[#f5f5f5] rounded-l-[1.625rem] focus:outline-none" placeholder="Search for City..."/>
                <div className="text-[#747474]">
                    <button type="submit" className="bg-[#f5f5f5] rounded-r-[1.625rem] hover:bg-[#f0efef] absolute px-2 h-11 mr-10 "><IoSearch size={28}/></button>
                </div>
            </div>
        </form>
    );
}