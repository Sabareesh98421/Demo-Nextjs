"use client";

import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
    labels: string[];
    data: number[];
}

export default function DashboardChart({ labels, data }: BarChartProps) {
    const theme = useTheme();

    const chartData = {
        labels,
        datasets: [
            {
                label: "Dataset",
                data,
                backgroundColor: theme.palette.primary.main,
                borderRadius: 6,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false, labels: { color: theme.palette.text.primary } },
        },
        scales: {
            x: {
                grid: { color: theme.palette.divider },
                ticks: { color: theme.palette.text.primary }
            },
            y: {
                beginAtZero: true,
                grid: { color: theme.palette.divider },
                ticks: { color: theme.palette.text.primary }
            },
        },
    };

    return (
        <Box className="w-full" sx={{ height: '10%', minHeight: 250 }}>
            <Bar data={chartData} options={options} />
        </Box>
    );
}
