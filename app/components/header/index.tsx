import { userData } from "@/app/protected";
import ThemeButton from "@/app/themeContext/themeButton";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

const Header = () => {
    const [userToggle, setUserToggle] = useState(false);
    const userDetails = userData();
    
    return (
        <header className="dark:bg-black theme-box-shadow z-50 relative">
            <div className="lg:container
            md:container 
            sm:container
            mx-auto px-4 py-5">
                <div className="header-col flex justify-between items-center">
                    <div className="logo max-w-[150px]">
                        <img
                            src="/logo.png"
                            className="dark:invert"
                            alt="Next.js logo"
                        />
                    </div>

                    <div className="menu-dd-wrapper flex gap-10">
                        <div className="relative  w-[120px]">
                            <button
                                className="flex items-center gap-2
                            cursor-pointer
                            "
                            onClick={()=>setUserToggle(!userToggle)}
                            >
                                <i className="border-2 border-black overflow-hidden rounded-2xl w-[30px] h-[30px]
                        flex items-center justify-center bg-white
                        ">
                                    <Image
                                        src="/image-wm.png"
                                        className=""
                                        alt="Next.js logo"
                                        width={25}
                                        height={25}
                                        priority
                                    />
                                </i>
                                <span
                                    className="theme-body-text
                                        dark:text-white
                                    "
                                >Nagaraj</span> <FaChevronDown className="text-[10px]" />
</button>
                            {
                                userToggle &&
                                <div className="absolute top-10 w-full dark:theme-box-shadow-light theme-box-shadow
                                    bg-white dark:bg-black 
                                ">
                                    <button className="theme-body-text dark:text-white
                                        text-[13px] flex p-1 cursor-pointer w-full items-center justify-between
                                        hover:bg-sky-100  p-2
                                    ">Settings <IoSettingsOutline /></button>
                                    <button className="theme-body-text dark:text-white
                                        text-[13px] flex p-1 cursor-pointer w-full items-center justify-between
                                        hover:bg-sky-100 p-2
                                    ">Logout <AiOutlineLogout /></button>
                                </div>
                            }
                            
                        </div>

                        <ThemeButton />
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header;