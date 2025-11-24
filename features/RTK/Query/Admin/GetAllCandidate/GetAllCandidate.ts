import {AppAPI} from "@/features/RTK/CreateAPI/DefineAppApi";
import {Framework, ServerResponseWithData} from "@/sharedUtils/CustomTypes";
import path from "path";


const getAllCandidate = AppAPI.injectEndpoints({
    endpoints:(build)=>({
        allCandidates:build.query<ServerResponseWithData<Framework[]>,void>({
            query:()=>"Admin/GetCandidates",
        })
    })
})
export const {useAllCandidatesQuery} = getAllCandidate;




function fetcher<T>(path:string,method:string,data?:T){
    const headers={}

    return fetch(path,{
        method:method,
        headers:headers,
        body:data
    })
}