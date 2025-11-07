import {AppAPI} from "@/features/RTK/CreateAPI/DefineAppApi";
import {SignUpFormData, SignUpResponse} from "@/sharedUtils/CustomTypes";

export const registerUserAPI = AppAPI.injectEndpoints(
    {
        endpoints:(build)=>({
            registerUser:build.mutation<SignUpResponse,SignUpFormData>({
                query:(userData:SignUpFormData)=>({
                    url:"signUp",
                    method:"POST",
                    body:userData
                })
            })
        })
    }
);
export const {useRegisterUserMutation} = registerUserAPI;