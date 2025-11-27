import {AppAPI} from "@/features/RTK/CreateAPI/DefineAppApi";
import {SignUpFormData, SignUpResponse} from "@/sharedUtils/CustomTypes";
import {HTTP_Method} from "@/sharedUtils/Enums/HTTP_Enum";

export const registerUserAPI = AppAPI.injectEndpoints(
    {
        endpoints:(build)=>({
            registerUser:build.mutation<SignUpResponse,SignUpFormData>({
                query:(userData:SignUpFormData)=>({
                    url:"signUp",
                    method:HTTP_Method.POST,
                    body:userData
                })
            })
        })
    }
);
export const {useRegisterUserMutation} = registerUserAPI;