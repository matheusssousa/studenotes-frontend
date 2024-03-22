import { useState, useContext, useEffect, createContext} from "react";

const ThemeContext = createContext();

export default function ThemeProvider({children}) {
    const [theme,setTheme] = useState(sessionStorage.getItem("@App:theme") !== "dark" ? "light":"dark");

    useEffect(()=>{
        const root = window.document.documentElement;
        const removeOldtheme = theme === "dark" ? "light" : "dark";

        root.classList.remove(removeOldtheme);
        root.classList.add(theme);
        sessionStorage.setItem("@App:theme", theme);
    }, [theme])
    return(
        <ThemeContext.Provider value={{theme,setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext);
}