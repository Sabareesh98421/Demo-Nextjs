"use client"
import { LayoutTag} from "@/sharedUtils/CustomTypes";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {useTheme} from "@mui/material";
import React from "react";

export const frameworkColors = [

    {

        name: "Angular",
        word: "VOTE",
        className:
            "bg-gradient-to-r from-[#DD0031] to-[#C3002F] text-transparent bg-clip-text", // Angular red gradient
    },
    {
        name: "React",
        word: "VOTER",
        className:
            "text-[#61DAFB]", // React cyan (flat, iconic)
    },
    {
        name: "Vue",
        word: "VOTING",
        className:
            "bg-gradient-to-r from-[#42B883] to-[#35495E] text-transparent bg-clip-text", // Vue green-to-slate
    },

    {
        name: "Svelte",
        word: "VOTERS",
        className:
            "bg-gradient-to-r from-[#FF3E00] to-[#FF7B00] text-transparent bg-clip-text", // Svelte orange gradient
    },
    {
        name: "Next.js",
        word: "VOTE",
        className:
            "text-black dark:text-white", // Next is usually monochrome
    },
    {
        name: "Tailwind",
        word: "VOTER",
        className:
            "bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] text-transparent bg-clip-text", // Tailwind blue gradient
    },

    {
        name: "Bootstrap",
        word: "VOTING",
        className:
            "text-[#7952B3]", // Bootstrap purple (flat)
    },
    {
        name: "Vite",
        word: "VOTERS",
        className:
            "bg-gradient-to-r from-[#646CFF] to-[#FFCA3A] text-transparent bg-clip-text", // Vite gradient (indigo → yellow)
    },
    {
        name: "Chakra",
        word: "VOTE",
        className:
            "bg-gradient-to-r from-[#319795] to-[#2C7A7B] text-transparent bg-clip-text", // Chakra teal gradient
    },
    {
        name: "SolidJS",
        word: "VOTER",
        className:
            "bg-gradient-to-r from-[#2C4F7C] to-[#4A6FA5] text-transparent bg-clip-text", // Solid navy gradient
    },
];


export function Bg({variant="section",children}:{variant:LayoutTag,children:React.ReactNode}){
    const theme = useTheme();
    return(
        <Box component={variant} className="h-dvh w-dvw grid overflow-hidden" sx={{
            backgroundColor:theme.palette.background.default,

        }} >

                <Grid
                    container
                    spacing={{ xs: 2, sm: 3, md: 4 }}
                    sx={{
                        position: "absolute",
                        inset: 0,
                        zIndex: 0,
                        pointerEvents: "none",
                        p: { xs: 2, sm: 4, md: 6 },
                        alignContent: "space-evenly",
                        gridTemplateColumns: {
                            xs: "repeat(auto-fill, minmax(120px, 1fr))",
                            sm: "repeat(auto-fill, minmax(150px, 1fr))",
                            md: "repeat(auto-fill, minmax(180px, 1fr))",
                            lg: "repeat(auto-fill, minmax(200px, 1fr))",
                        },
                        gridAutoRows: {
                            xs: "minmax(80px, auto)",
                            sm: "minmax(100px, auto)",
                            md: "minmax(120px, auto)",
                        },
                        gap: { xs: 2, sm: 3, md: 4 },

                        m: 0,
                    }}
                >
                    {frameworkColors.map((framework, index) => (
                        <Grid
                            key={index}
                            size={{ xs: 6, sm: 4, md: 3, lg: 2.4 }}
                            sx={{
                                alignContent: "space-evenly",
                                gridTemplateColumns: {
                                    xs: "repeat(auto-fill, minmax(120px, 1fr))",
                                    sm: "repeat(auto-fill, minmax(150px, 1fr))",
                                    md: "repeat(auto-fill, minmax(180px, 1fr))",
                                    lg: "repeat(auto-fill, minmax(200px, 1fr))",
                                },
                                gridAutoRows: {
                                    xs: "minmax(80px, auto)",
                                    sm: "minmax(100px, auto)",
                                    md: "minmax(120px, auto)",
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    transform: `rotate(${(index % 5 - 2) * 6}deg)`,
                                    opacity: 0.1 + (index % 5) * 0.05,
                                }}
                            >
                           <span
                               className={`font-extrabold select-none stroke-text ${framework.className}`}
                               style={{
                                   fontSize: "clamp(2rem, 4vw, 4.5rem)",
                                   WebkitTextStroke: "2px",
                                   paintOrder: "stroke fill",
                               }}
                           >
                                {framework.word}
                            </span>
                            </Box>
                        </Grid>
                    ))}
                </Grid>

                {/* Content layer */}
                <Box sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 10,
                    display: "grid",
                    justifyContent: "center",
                    alignItems: "center",
                    gridAutoRows:"min-content",
                    p: { xs: 2, sm: 3, md: 4 },
                }}>{children}</Box>
        </Box>
    )
}