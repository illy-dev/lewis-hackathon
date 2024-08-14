'use client';
import { IoSearch } from "react-icons/io5";

import getWeather from "@/api/callWeatherApi";

export default function Searchbar() {

    const handleSubmit = (e: React.ChangeEvent<any>) => {
        e.preventDefault();
        const formData = new FormData(e.target);
    
        const loc = formData.get('location')?.toString()
        if (loc != null) {
            getWeather({ city: loc })
        }
        
        console.log(loc)
    }

    return(
        <form action="post" onSubmit={handleSubmit}>
            <div className="flex flex-row justify-center mt-5">
                <input type="text" name="location" className="w-[50%] py-3 ps-2 pe-0 text-[15px] leading-5 bg-[#3b4252] rounded-l-lg focus:outline-none" placeholder="Search for City..."/>
                <div>
                    <button type="submit" className="bg-[#353b4a] rounded-r-lg hover:bg-[#292e3b] absolute py-2 px-2 mr-10 "><IoSearch size={28}/></button>
                </div>
            </div>
        </form>
    );
}