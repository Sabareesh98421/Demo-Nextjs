import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


export const AppAPI=createApi({
    reducerPath:"fetchApi",
    baseQuery:fetchBaseQuery({baseUrl:"/api/"}),
    endpoints:()=> ({})
})