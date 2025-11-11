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
        id:"confirmPassword",
        type:"password",
        name:"Confirm Password",

    }
]
