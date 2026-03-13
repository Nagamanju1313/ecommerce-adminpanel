import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5';
import { useTheme } from './theme';

const ThemeButton = () => {
    const { theme, setTheme } = useTheme();
    return <div className="">
        <button
            onClick={() => {
                if (theme === 'light') {
                    setTheme("dark")
                } else{
                    setTheme("light")
                }
            }}
            className="text-yellow-500 cursor-pointer 
            dark:text-white
             dark:border-white border-yellow-500 border-2 w-[25px] h-[25px]
                flex items-center justify-center rounded-2xl
                
            ">
            {
                theme === 'dark' ?
                    <IoMoonOutline className='shrink-0' />
                    :
                    <IoSunnyOutline className='shrink-0'/>
            }
        </button>
    </div>
}
export default ThemeButton