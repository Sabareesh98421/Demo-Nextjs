"use client"
import Switch from "@mui/material/Switch";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeMode } from "@/components/themeProvider/ThemeProvider";


export function ThemeToggle()
{
    const {mode,toggleMode} = useThemeMode();

    return(
        <div className="flex items-center justify-center w-full gap-2">

            <Brightness7
                fontSize="small"
                style={{
                    color: mode === "light" ? "#f5c518" : "#9e9e9e",
                    transition: "color 0.3s ease",
                }}
            />


            <Switch
                checked={mode === "dark"}
                onChange={toggleMode}
                color="default"
                sx={{
                    "& .MuiSwitch-thumb": {
                        backgroundColor: mode === "dark" ? "#fff" : "#000",
                    },
                    "& .MuiSwitch-track": {
                        backgroundColor: mode === "dark" ? "#555" : "#ccc",
                    },
                }}
            />


            <Brightness4
                fontSize="small"
                style={{
                    color: mode === "dark" ? "#90caf9" : "#9e9e9e",
                    transition: "color 0.3s ease",
                }}
            />
        </div>
    )
}