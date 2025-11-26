import { InputTypeSType, TInputType} from "@/sharedUtils/CustomTypes";

export interface SignUpField {
    id:string;
    type: TInputType,
    name: string;
}
export type FormSchema<T> = T[]
export const signUpForm:FormSchema<SignUpField>
    =[
    {
        id:"email",
        type:InputTypeSType.Email,
        name:"Email",

    },
    {
        id:"password",
        type:InputTypeSType.Password,
        name:"Password",


    }
    ,
    {
        id:"confirmPassword",
        type:InputTypeSType.Password,
        name:"Confirm Password",

    }
]
