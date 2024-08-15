export default function Navbar() {
    return(
        <div className="absolute navbar-font text-white mt-4 right-[0%] tracking-wide">
             <ul className="list-none m-0 p-0 overflow-hidden flex justify-end text-2xl">
                <li className="float-right hover:cursor-pointer inline px-8 hover:underline">Home</li>
                <li className="float-right hover:cursor-pointer inline px-8 hover:underline">FAQ</li>
            </ul>
        </div>
    );
}