import type {
    DashboardData,
    CardData,
    IconName,
    DashboardStats,
    FrameWorkNItTotal, DashboardChartData
} from "@/sharedUtils/CustomTypes";
import {ColorName} from "@/sharedUtils/CustomTypes";
type IconColorMap = Record<
    "totalVotes" | "totalUsers" ,
    { iconName: IconName; color: ColorName }
>;
export function getDashboardCardsData(dashboardData: DashboardData, iconColorMap:IconColorMap): CardData[] {
    const totalVotes = dashboardData.totalVotes;
    const totalUsers = dashboardData.users.reduce((sum, u) => sum + u.users.length, 0);



    return [
        { label: "Total Votes", value: totalVotes, ...iconColorMap.totalVotes },
        { label: "Total Users", value: totalUsers, ...iconColorMap.totalUsers },


    ];
}

export function getFrameWorkCard(dashboardStats:DashboardStats){

return dashboardStats.frameWork.map((frameworkData:FrameWorkNItTotal) => ({
    label: frameworkData.frameWork,
    value: frameworkData.totalVotes,
    color: ColorName.Primary,
    image: `/${frameworkData.frameWork}.png`,
}));
}

export function getChartData(frameWork:FrameWorkNItTotal[]):DashboardChartData{

return frameWork.reduce<DashboardChartData>(
    ([labels, votes],frameWorkData:FrameWorkNItTotal) => {
        labels.push(frameWorkData.frameWork);
        votes.push(frameWorkData.totalVotes);
        return [labels, votes];
    },
    [[], []]
);
}
