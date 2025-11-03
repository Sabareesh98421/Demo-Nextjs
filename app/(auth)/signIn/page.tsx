"use client";
import { IInputProps, TInpValue } from "@/sharedUtils/CustomTypes";
import { InputNLabel } from '../../../components/InputNLabel';
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "@mui/material/Link";
// signIn/page.tsx
interface ISignInDataForAPi {
    email: string,
    password: string
}
export default function Signin() {
    const router = useRouter();
    useEffect(() => {
        const hasToken =
            localStorage.getItem("authToken") && localStorage.getItem("userEmail");
        if (hasToken) router.replace("/"); // replace avoids going back to login with Back btn
    }, [router]);

    const formData = {
        email: "",
        password: ""
    };

    const inputClass = "border-green-400 shadow-md shadow-green-400";
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

    const signingIn = (eve: React.FormEvent) => {
        console.log("Final user data:", userData);
        validUser(userData, router)
        eve.preventDefault();
    }
    
    return (
        <section className=" w-md p-5 flex justify-center items-center outline-[0.1px] outline-green-400 shadow-md text-green-400 shadow-green-400 flex-col gap-5">
            <div className="headingWrapper w-full p-1 h-fit flex justify-center items-center">
                <h1 className="w-full h-fit p-1 font-bold text-3xl text-center underline underline-offset-4">Signin</h1>
            </div>
            <form className="w-full flex justify-center items-center flex-col gap-5 " onSubmit={signingIn}>
                {RenderFormFields(fields)}
                <Link href="/signUp">don't have an account? register here </Link>
                <button type="submit" className="border-2 border-green-400 w-22 h-10 hover:bg-white hover:text-black">Submit</button>
            </form>
        </section>
    )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function validUser(formdata: any, route: any) {
    const { email, password } = formdata
    console.log(formdata)
    const users=["sabareesh@gmail.com","ps@outlook.com","abc@gmail.com"];
    const userPasswords="Abc@1234";
    // Simulate server delay
    setTimeout(() => {
        if (users.includes(email) && password === userPasswords ) {
            // ✅ Mimic successful login
            localStorage.setItem("authToken", "fake-auth-key-123456");
            localStorage.setItem("userEmail", email);
            console.log("✅ Logged in successfully (token stored in browser)");
            console.log("Status: 200 OK");
            route.push("/")
        } else {
            // ❌ Mimic failed login
            localStorage.removeItem("authToken");
            alert("❌ Invalid credentials");
            console.error("401 Unauthorized");
        }
    }, 600);
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
