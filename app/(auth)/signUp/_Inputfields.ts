import {Form} from "@/sharedUtils/CustomTypes";

export const signUpForm:Form[] =[
    {
        id:"email",
        type:"email",
        name:"Email",

    },
    {
        id:"password",
        type:"password",
        name:"Password",

    }
    ,
    {
        id:"confirm-password",
        type:"password",
        name:"Confirm Password",

    }
]

export const initialData = {
    email: "",
    password: "",
    "confirm-password": ""
};