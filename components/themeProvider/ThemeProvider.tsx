"use client"
import { ThemeProvider,CssBaseline } from "@mui/material";
import Button from "@mui/material/Button"
import {AppTheme} from "@/Themes/theme";
import React, {createContext, useContext, useEffect, useMemo, useState} from "react";

type Mode ="light"|"dark";
type ThemeContext={
    mode:Mode,
    toggleMode:()=>void;
};
const themeModeContext=createContext<ThemeContext>({
    mode:"light",
    toggleMode:()=>{},
})
export function useThemeMode(){
    return useContext(themeModeContext)
}
export default function ThemeProviderWrapper({children}:{children:React.ReactNode}){
    const [mode,setMode]= useState<"light"|"dark">("light");
    const theme = useMemo(()=>AppTheme(mode),[mode])

    const toggleMode = () => {
        setMode((prev) => {
            const newMode = prev === "light" ? "dark" : "light";
            localStorage.setItem("themeMode", newMode);
            return newMode;
        });
    };




    return(
        <>
            <themeModeContext.Provider  value={{mode,toggleMode}}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                    {children}
            </ThemeProvider>
            </themeModeContext.Provider>
        </>
    )
}