import {AppAPI} from "@/features/RTK/CreateAPI/DefineAppApi";
import {CurrentUser, ServerResponseWithData} from "@/sharedUtils/CustomTypes";


const getCurrentUserAPI = AppAPI.injectEndpoints({
    endpoints:(build)=>({
        currentUser:build.query<ServerResponseWithData<CurrentUser>,void>(
            {
                query:()=>"CurrentUser",
                providesTags:["CurrentUser"],
                keepUnusedDataFor:0
            }
        )
    })
})
export const {useCurrentUserQuery}=getCurrentUserAPI;