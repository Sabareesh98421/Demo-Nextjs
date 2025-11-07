// PoolingResultsAPI.ts

import {AppAPI} from "@/features/RTK/CreateAPI/DefineAppApi";

type ResponseData=Record<string,number>;
export const pollingResultsAPI= AppAPI.injectEndpoints({
    endpoints:(build)=>({
        getVoteResults:build.query<ResponseData,void>({
            query:()=>"result"
        })
    })
})

export const {useGetVoteResultsQuery} = pollingResultsAPI;