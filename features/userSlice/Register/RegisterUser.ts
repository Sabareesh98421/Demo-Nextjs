import {createSlice,PayloadAction} from "@reduxjs/toolkit";
import { SignUpFormData} from "@/sharedUtils/CustomTypes";
const initialFormData:SignUpFormData= {
    email:"",
    password:"",
    confirmPassword:""
}
type ActionPayload=PayloadAction<{key:keyof SignUpFormData,value:string}>
const RegisterUserSlice=createSlice({
    name:"Register",
    initialState:initialFormData,
    reducers:{
        setFormData(FormState,action:ActionPayload){
                FormState[action.payload.key] = action.payload.value;
        },
        resetForm:()=>initialFormData,

    }
})

export const {setFormData:setRegisterFormData,resetForm}=RegisterUserSlice.actions;
export default RegisterUserSlice.reducer;