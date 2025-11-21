import {AppAPI} from "@/features/RTK/CreateAPI/DefineAppApi";
import {HTTP_Method} from "@/serverUtils/Enums/HTTP_Enum";

const logoutCurrentUser = AppAPI.injectEndpoints({
endpoints:(build)=>({
    logout:build.mutation<void,void>({
        query:()=>({
            url:"/CurrentUser/logout",
            method:HTTP_Method.POST,
    })
    })
})
})

export const {useLogoutMutation}=logoutCurrentUser;