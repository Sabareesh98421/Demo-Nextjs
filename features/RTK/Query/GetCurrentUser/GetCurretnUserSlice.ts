import {AppAPI} from "@/features/RTK/CreateAPI/DefineAppApi";
import {CurrentUser, ServerResponseWithData} from "@/sharedUtils/CustomTypes";
import {RTKTagsEnum} from "@/sharedUtils/Enums/RTK_InvalidationTags";


const getCurrentUserAPI = AppAPI.injectEndpoints({
    endpoints:(build)=>({
        currentUser:build.query<ServerResponseWithData<CurrentUser>,void>(
            {
                query:()=>"CurrentUser",
                providesTags:[RTKTagsEnum.CurrentUser],
                keepUnusedDataFor:0
            }
        )
    })
})
export const {useCurrentUserQuery}=getCurrentUserAPI;