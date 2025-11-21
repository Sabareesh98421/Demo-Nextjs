"use client";
import { IInputProps, TInpValue } from "@/sharedUtils/CustomTypes";
import { InputNLabel } from '@/components/InputNLabel';
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import {AlertColor} from "@mui/material";
import { useDispatch } from "react-redux";
import { AppAPI } from "@/features/RTK/CreateAPI/DefineAppApi";
import {useLoginUserMutation} from "@/features/RTK/Query/loginAPI/Loginapi";
import {HTTP_Method} from "@/serverUtils/Enums/HTTP_Enum";
import Snackbar from "@mui/material/Snackbar";

// signIn/page.tsx
interface ISignInDataForAPi {
    email: string,
    password: string
}
interface SnackbarState{
    message:string,
    severity: AlertColor
}
export default function SignIn() {
    const router = useRouter();

    const [snackbar, setSnackbar] = useState<SnackbarState|null>(null);
    const dispatch = useDispatch();
    const [loginUser,{isLoading}] = useLoginUserMutation();

    const formData = {
        email: "",
        password: ""
    };

    const inputClass = "border-gray-400 shadow-md ";
    const [userData, setUserData] = useState<ISignInDataForAPi>(formData);

    const fields: IInputProps[] = [{
        id: "email",
        name: "Email",
        type: "email",
        cls: inputClass,
        getInpValueOnBlur: (value) => { handleBlur(value, setUserData) }
    },
    {
        id: "password",
        name: "Password",
        type: "password",
        cls: inputClass,
        getInpValueOnBlur: (value) => { handleBlur(value, setUserData) ;}
    },
];


    const signingIn = async (eve: React.FormEvent) => {
        eve.preventDefault();
        const validation = validateFormFields(userData);
        if (!validation.isValid) {
            setSnackbar({
                message: validation.message,
                severity: "warning"
            });
            return;
        }
        try{
            const res = await loginUser(userData).unwrap();
            setSnackbar({
                message:res.message,
                severity:"success"
            })
            console.log(res.message);
            dispatch(AppAPI.util.invalidateTags(["CurrentUser"]));
            setLocalStorage(userData.email);
            router.push("/")

        }catch(err:any){
            console.error(err)
            setSnackbar({
                message:err.data.message || "Login In failed" ,
                severity:"error"
            })
        }

    }
    
    return (
        <section className=" w-md p-5 flex justify-center  items-center outline-[0.1px]  shadow-md bg-white text-black flex-col gap-5">



            <Snackbar
                autoHideDuration={3000}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={!!snackbar}
                onClose={() => setSnackbar(null)}
            >
                <Alert
                    onClose={() => setSnackbar(null)}
                    severity={snackbar?.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbar?.message}
                </Alert>
            </Snackbar>
            {
                isLoading && (
                    <div className="w-full relative -top-1 left-0 z-50">
                        <LinearProgress color="primary" sx={{ height: '4px' }} />
                    </div>
                )
            }
            <div className="headingWrapper w-full p-1 h-fit flex justify-center items-center">
                <h1 className="w-full h-fit p-1 font-bold text-3xl text-center underline underline-offset-4">Sign in</h1>
            </div>
            <form method={HTTP_Method.POST} className="w-full flex justify-center items-center flex-col gap-5 " onSubmit={signingIn}>
                {RenderFormFields(fields)}
                <Link href="/signUp">don&#39;t have an account? register here </Link>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isLoading}
                    className="h-10"
                    sx={{
                        width:"auto",
                        textTransform: 'none',
                        fontWeight: 500,
                    }}
                >
                    {isLoading ? "Signing in..." : "Submit"}
                </Button>
            </form>
        </section>
    )
}

// Validation function outside component
function validateFormFields(data: ISignInDataForAPi): { isValid: boolean; message: string } {
    if (!data.email || data.email.trim() === "") {
        return { isValid: false, message: "Email is required" };
    }

    if (!data.password || data.password.trim() === "") {
        return { isValid: false, message: "Password is required" };
    }

    return { isValid: true, message: "" };
}

function setLocalStorage(email:string){
    localStorage.setItem("userEmail",email);
}
function handleBlur(
    value: TInpValue | null,
    setUserData: Dispatch<SetStateAction<ISignInDataForAPi>>
) {
    if (!value) return;

    setUserData((prev) => ({
        ...prev,
        [value.name.toLowerCase()]: value.value,
    }));
}
function RenderFormFields(fields: IInputProps[]) {
    return fields.map((field: IInputProps) =>
        <div key={field.name} className="formFieldsWrapper w-full px-5">
            <InputNLabel {...field} />
        </div>

    )
}
