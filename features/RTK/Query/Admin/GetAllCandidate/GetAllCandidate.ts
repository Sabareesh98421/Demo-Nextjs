import {AppAPI} from "@/features/RTK/CreateAPI/DefineAppApi";
import {Framework, ServerResponseWithData} from "@/sharedUtils/CustomTypes";
const getAllCandidate = AppAPI.injectEndpoints({
    endpoints:(build)=>({
        allCandidates:build.query<ServerResponseWithData<Framework[]>,void>({
            query:()=>"/GetCandidates",
        })
    })
})
export const {useAllCandidatesQuery} = getAllCandidate;
