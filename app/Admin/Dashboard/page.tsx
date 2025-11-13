import DashboardCard from "@/components/Dashaboard/Cards/DashboardCards";
import { dashBoardStats } from "@/serverUtils/Dashboard/route";
import { getDashboardCardsData } from "@/serverUtils/Dashboard/dashboardUtils";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { CardData, ColorName, IconName } from "@/sharedUtils/CustomTypes";
import DashboardChart from "@/components/Dashaboard/statsGraph/Chart";

type ChartData = [string[], number[]];

const ICON_COLOR_MAP = {
    totalVotes: { iconName: IconName.TotalVotes, color: ColorName.Primary },
    totalUsers: { iconName: IconName.People, color: ColorName.Warning },
};

export default async function Dashboard() {
    const dashboardStats = await dashBoardStats();

    const statisticsCards: CardData[] = getDashboardCardsData(dashboardStats, ICON_COLOR_MAP);

    const frameworkCards: CardData[] = dashboardStats.frameWork.map((frameworkData) => ({
        label: frameworkData.frameWork,
        value: frameworkData.totalVotes,
        color: ColorName.Primary,
        image: `/${frameworkData.frameWork}.png`,
    }));
    console.log(frameworkCards);
    const [chartLabels, chartData]: ChartData = dashboardStats.frameWork.reduce(
        ([labels, votes]: ChartData, frameworkData) => {
            labels.push(frameworkData.frameWork);
            votes.push(frameworkData.totalVotes);
            return [labels, votes];
        },
        [[], []]
    );

    return (
        <Stack className="w-full overflow-y-auto">
            <Box
                className="p-6 flex flex-wrap justify-center gap-6 "
            >

            {statisticsCards.map((card) => (
                    <DashboardCard
                        key={card.label}
                        label={card.label}
                        value={card.value}
                        iconName={card.iconName}
                        color={card.color}
                    />
                ))}
            </Box>

            <Box className="p-6 flex flex-wrap gap-6 mt-6">
                {frameworkCards.map((card) => (
                    <DashboardCard
                        key={card.label}
                        label={card.label}
                        value={card.value}
                        color={card.color}
                        image={card.image}
                    />
                ))}
            </Box>

            <DashboardChart labels={chartLabels} data={chartData} />
        </Stack>
    );
}
