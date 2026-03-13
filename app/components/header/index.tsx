import ThemeButton from "@/app/themeContext/themeButton";
import Image from "next/image";

const Header = ()=>{
    return(
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
                                >Nagaraj</span></button>

                                <div className="absolute top-10 w-full dark:theme-box-shadow-light theme-box-shadow
                                    p-2 bg-white dark:bg-black 
                                ">
                                    <button className="theme-body-text dark:text-white
                                        text-[13px] flex p-1 cursor-pointer w-full
                                    ">Settings</button>
                                    <button className="theme-body-text dark:text-white
                                        text-[13px] flex p-1 cursor-pointer w-full
                                    ">Logout</button>
                                </div>
                        </div>

                        <ThemeButton/>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header;