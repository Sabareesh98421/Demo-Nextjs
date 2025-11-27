import DashboardCard from "@/components/AdminComponents/Dashboard/Cards/DashboardCards";
import { dashBoardStats } from "@/serverUtils/Dashboard/route";
import {getChartData, getDashboardCardsData, getFrameWorkCard} from "@/serverUtils/Dashboard/dashboardUtils";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {CardData, ColorName, DashboardStats, IconName,DashboardChartData} from "@/sharedUtils/CustomTypes";
import DashboardChart from "@/components/AdminComponents/Dashboard/statsGraph/Chart";
import CandidatesActionList from "@/components/AdminComponents/Dashboard/PoolingCandidatesActionList/candidateActions";
import {getCandidate} from "@/serverUtils/Dashboard/GetCandidate";


const ICON_COLOR_MAP = {
    totalVotes: { iconName: IconName.TotalVotes, color: ColorName.Primary },
    totalUsers: { iconName: IconName.People, color: ColorName.Warning },
};

export default async function Dashboard() {
    const dashboardStats:DashboardStats = await dashBoardStats();

    const fraworkList = await getCandidate();
    const frameworkCards: CardData[] = getFrameWorkCard(dashboardStats);
    const [chartLabels, chartData]: DashboardChartData = getChartData(dashboardStats.frameWork);
    const statisticsCards: CardData[] = getDashboardCardsData(dashboardStats, ICON_COLOR_MAP);

    return (
        <Stack className="w-full overflow-y-auto p-6 gap-6">
            <Box
                className="flex flex-wrap justify-center gap-6 "
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

            <Box className=" flex flex-wrap gap-6 mt-6">
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

            <Box className="flex flex-wrap gap-6">
                <CandidatesActionList
                    propsFrameworks={fraworkList.map(f => ({
                    id:f.id,
                    name: f.name,
                    logo: f.logo!
                }))}
            />

            </Box>
                <DashboardChart labels={chartLabels} data={chartData}/>
        </Stack>
    );
}
