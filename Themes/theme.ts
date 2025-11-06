// theme.ts
import { createTheme, Shadows } from '@mui/material/styles';
import {PaletteMode} from "@mui/material";

const modes={
    light: {
        primary: { main: '#1976d2' },
        secondary: { main: '#9c27b0' },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
        },
        text: {
            primary: '#333',
            secondary: '#555',
        },

    },
    dark:{
        // 🌚 Dark mode colors
        primary: { main: '#90caf9' },
        secondary: { main: '#ce93d8' },
        background: {
            default: '#121212',
            paper: '#1d1d1d',
        },
        text: {
            primary: '#ffffff',
            secondary: '#aaaaaa',
        },
    }
}
// const darkModeShadow: Shadows = [
//     "none",
//     "0px 1px 3px rgba(255, 255, 255, 0.05)",
//     "0px 1px 5px rgba(255, 255, 255, 0.08)",
//     "0px 2px 8px rgba(255, 255, 255, 0.1)",
//     ...Array(21).fill("0px 2px 10px rgba(255, 255, 255, 0.12)"),
// ] as Shadows;
const getDesignTokens=(mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === 'light' ? modes.light : modes.dark),
    },
    typography: {
        fontFamily: `'Poppins', 'Roboto', sans-serif`,
    },
    shape: {
        borderRadius: 10,
    },
    // shadows: mode === "dark" ? darkModeShadow : undefined,

});


export const AppTheme=(mode: PaletteMode) => createTheme(getDesignTokens(mode))