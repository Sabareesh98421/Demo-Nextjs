import * as yup from "yup";
import type {ObjectSchema} from "yup";
import {SignUpFormData} from "@/sharedUtils/CustomTypes";
export const userRegisterSchema:ObjectSchema<SignUpFormData>=yup.object().shape({
    email:yup.string().required("Email is mandatory").email(),
    password:yup.string().required().min(8,"Password Must need to 8 or more  character of length")
        .matches(/[a-z]/,"Password must have least a Lowercase letter ")
        .matches(/[A-Z]/,"Password must have least a Uppercase letter ")
        .matches(/[0-9]/,"Password must have least a Number ")
        .matches(/[^a-zA-Z-0-9]/,"Password must have least a Symbol letter "),
    confirmPassword:yup.string().required().oneOf([yup.ref("password")],"Password Must math")
});