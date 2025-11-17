"use client";

import React from "react";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import { DashboardCardProps } from "@/sharedUtils/CustomTypes";
import { BarChart, People, Code, TrendingUp } from "@mui/icons-material";

// Map icon names to components
const ICONS_MAP = {
    totalVotes: BarChart,
    People: People,
    Code: Code,
    TrendingUp: TrendingUp,
};

export default function DashboardCard({ label, value, iconName, color, image }: DashboardCardProps) {
    const theme = useTheme();
    const Icon = iconName ? ICONS_MAP[iconName] : null;

    return (
        <Paper
            elevation={3}
            className="flex justify-evenly items-center p-6 rounded-xl transform transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg gap-2 flex-1 min-w-[200px]"
            sx={{
                borderLeft: 5,
                borderColor: (theme) => theme.palette[color].main,
                backgroundColor: (theme) => theme.palette.background.paper,
            }}
        >
            <Box>
                <Typography
                    variant="subtitle1"
                    sx={{
                        color: (theme) => theme.palette.text.primary,
                        mb: 0.5,
                        fontWeight: 500,
                    }}
                >
                    {label}
                </Typography>
                <Typography

                    variant="h2"
                    textAlign="center"
                    sx={{
                        color: (theme) => theme.palette.text.primary,
                        fontWeight: 700,
                    }}
                >
                    {value}
                </Typography>
            </Box>

            {image ? (
                <Avatar src={image} alt={label} sx={{ width: 56, height: 56 }} />
            ) : Icon ? (
                <Avatar
                    sx={{
                        bgcolor: (theme) => theme.palette[color].main + "33",
                        width: 56,
                        height: 56,
                    }}
                >
                    <Icon sx={{ fontSize: 28, color: theme.palette[color].main }} />
                </Avatar>
            ) : null}
        </Paper>
    );
}
