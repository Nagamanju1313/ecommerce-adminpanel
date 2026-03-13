import { useEffect, useState } from "react"

export const useThemeLocalStorage = ()=>{
    const [state, setState] = useState('');

    useEffect(() => {
        let localTheme = typeof window != undefined ? localStorage.getItem("theme") : null;
        setState(localTheme)
    }, []);
    return state;
}