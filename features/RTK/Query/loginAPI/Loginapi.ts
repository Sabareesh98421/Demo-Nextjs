import {AppAPI} from "@/features/RTK/CreateAPI/DefineAppApi";
import {LoginFormData, LoginResponse} from "@/sharedUtils/CustomTypes";
import {HTTP_Method} from "@/sharedUtils/Enums/HTTP_Enum";

export const loginAPISlice = AppAPI.injectEndpoints({
    endpoints:(build)=>({
        loginUser:build.mutation<LoginResponse,LoginFormData>({
            query:(userData:LoginFormData)=>({
                url:"LogIn",
                method:HTTP_Method.POST,
                body:userData
            }),
            invalidatesTags: ["CurrentUser"]

        })
    })
});
export const   {useLoginUserMutation} = loginAPISlice;