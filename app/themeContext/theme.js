const { createContext, useState, useEffect, useContext } = require("react");
import {useThemeLocalStorage} from '../customHooks/useThemeLocalStorage'
const ThemeContext = createContext();


export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('');

    useEffect(() => {
        let localTheme = typeof window != undefined ? localStorage.getItem("theme") : null;
        setTheme(localTheme)
    }, []);

    useEffect(() => {
        let html = typeof window !== undefined ? window.document.documentElement : null;
        if (theme === 'dark') {
            html.classList.remove('light');
            html.classList.add('dark');
            localStorage.setItem("theme", 'dark')
        } 
        if (theme === 'light') {
            html.classList.remove('dark');
            html.classList.add('light');
            localStorage.setItem("theme", 'light')
        } 

    }, [theme]);

    return <ThemeContext.Provider className="" value={{ theme, setTheme }}>
        {children}
    </ThemeContext.Provider>
}

export const useTheme = () => {
    return useContext(ThemeContext);
}