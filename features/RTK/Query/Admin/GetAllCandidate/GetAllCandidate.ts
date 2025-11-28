import {AppAPI} from "@/features/RTK/CreateAPI/DefineAppApi";
import {Framework, ServerResponseWithData} from "@/sharedUtils/CustomTypes";
import {CandidateListEnum, RTKTagsEnum} from "@/sharedUtils/Enums/RTK_InvalidationTags";
const getAllCandidate = AppAPI.injectEndpoints({
    endpoints:(build)=>({
        allCandidates:build.query<ServerResponseWithData<Framework[]>,void>({
            query:()=>"/GetCandidates",
            providesTags:[{type:RTKTagsEnum.Candidates as const ,id:CandidateListEnum.LIST}]
        })
    })
})
export const {useAllCandidatesQuery} = getAllCandidate;
