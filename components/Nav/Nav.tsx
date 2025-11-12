import { Button } from "@mui/material";
import {ThemeToggle} from "@/components/ThemeToggle/themeToggle";


export function Nav(){
    return(
        <nav className="bg-transparent">
            <ThemeToggle/>
        </nav>
    )
}