import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {RTKTagsEnum} from "@/sharedUtils/Enums/RTK_InvalidationTags";


export const AppAPI=createApi({
    reducerPath:"fetchApi",
    baseQuery:fetchBaseQuery({baseUrl:"/api/"}),
    endpoints:()=> ({}),
    tagTypes:[RTKTagsEnum.CurrentUser as const ,RTKTagsEnum.Candidates as const]
})