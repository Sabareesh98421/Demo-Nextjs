// PoolingResultsAPI.ts
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

type ResponseData=Record<string,number>;
export const pollingResultsAPI= createApi({
    reducerPath:"vote/Result",
    baseQuery:fetchBaseQuery({baseUrl:"/api/"}),
    endpoints:(build)=>({
        getVoteResults:build.query<ResponseData,void>({
            query:()=>"result"
        })
    })
})

export const {useGetVoteResultsQuery} = pollingResultsAPI;