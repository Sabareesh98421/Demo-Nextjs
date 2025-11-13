import type {DashboardData, CardData, IconName, ColorName} from "@/sharedUtils/CustomTypes";
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
