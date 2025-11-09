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
            secondary: '#121212',
        },

    },
    dark:{
        // 🌚 Dark mode colors
        primary: { main: '#9c27b0' },
        secondary: { main: '#1976d2' },
        background: {
            default: '#121212',
            paper: '#ffffff',
            primary: { main: '#9c27b0' },
            secondary: { main: '#1976d2' },
        },
        text: {
            primary: '#ffffff',
            secondary: '#121212',

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
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor:'rgba(0, 0, 0, 0.23)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor:'rgba(0, 0, 0, 0.23)',
                    },

                },
                input: {
                    '&:-webkit-autofill': {
                        WebkitBoxShadow: `0 0 0 100px ${modes[mode].background.paper} inset`,
                        WebkitTextFillColor: modes[mode].text.secondary,
                    },
                    '&:-webkit-autofill:hover': {
                        WebkitBoxShadow: `0 0 0 100px ${modes[mode].background.paper} inset`,
                    },
                    '&:-webkit-autofill:focus': {
                        WebkitBoxShadow: `0 0 0 100px ${modes[mode].background.paper} inset`,
                    }
                },
            },
        },
    }
    // shadows: mode === "dark" ? darkModeShadow : undefined,

});


export const AppTheme=(mode: PaletteMode) => createTheme(getDesignTokens(mode))