"use client"
import {FormEvent, JSX, useState} from "react";
import {useErrorHandlingStates} from "@/CustomHooks/useForm";
import  FormControl from "@mui/material/FormControl";
import Typography from  "@mui/material/Typography";
import {ErrorMessage, Form, SignUpFormData} from "@/sharedUtils/CustomTypes";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {signUpForm} from "./_Inputfields";
import Link from "@mui/material/Link";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/lib/Store";
import {resetForm, setRegisterFormData} from "@/features/userSlice/Register/RegisterUser";

export default function Page():JSX.Element{
    const dispatchFormData=useDispatch();
    const formDataRedux:SignUpFormData=useSelector((formDataState:RootState)=>formDataState.Register)

    const [displayError,setDisplayError] = useState(false);
    const   errors :ErrorMessage= useErrorHandlingStates<SignUpFormData>(formDataRedux);

    function changeHandlerRedux(field:  keyof  SignUpFormData,value:string){

        dispatchFormData(setRegisterFormData({key:field,value}))
    }
    const handleSubmit=(eve:FormEvent)=>{

        eve.preventDefault();
        if (errors) {
            setDisplayError(true);
            return;
        } else {
            setDisplayError(false);
            console.warn(formDataRedux)
            dispatchFormData(resetForm())
            // resetForm();
        }

    }

    return(

            <Box className="w-6xl flex  gap-2 justify-evenly items-center flex-row  p-12 rounded-xl" >
            <FormControl component="form" className="w-full max-w-md  text-black rounded-lg flex justify-center items-center flex-row shadow-2xl "
                         sx={{bgcolor:"white",p:2,border:1,borderColor:"ghostwhite"}} onSubmit={handleSubmit}>
                <Typography variant="h3" textAlign="center" className={"border-b-2 block w-full"} > Sign Up</Typography>
                <Box className="w-full flex  flex-col gap-2 ">
                    {RenderFormFields<Form>(signUpForm,formDataRedux,changeHandlerRedux)}

                    <Link textAlign="right" href="/signIn" sx={{
                        m:2
                    }}>Already Logged in ? SignIn here</Link>
                </Box>

                <Button variant="contained" size="medium" fullWidth sx={{
                    p:2
                }}
                        className="w-8"
                type="submit"
                >SignUp</Button>
            </FormControl>
                <Box component="section" className="font-medium text-sm">

                {(displayError && errors) &&  errors.map((eachError,index)=>
                    <Typography key={"errorID-"+index}
                        variant="body2"
                        color="error"
                        sx={{ mt: 1, fontWeight: 500 }}
                    >
                        {eachError}
                    </Typography>
                )}
                </Box>
            </Box>

    )
}

function RenderFormFields<T extends Form>(fields:T[],value:SignUpFormData,changeHandler:(field:keyof SignUpFormData,value:string)=>void) {
    return fields.map((field) => {
        const key = field.id === "confirm-password" ? "confirmPassword" : (field.id as keyof SignUpFormData);
            return (<Box component="section" key={field.id as string} className="w-full flex justify-between items-center gap-8"
                 sx={{
                     padding: "8px"
                 }}>
                <FormLabel htmlFor={field.id as string} sx={{
                    textAlign: "start"
                }}>{field.name as string}</FormLabel>
                <TextField variant="outlined" {...field} size="small" value={value[key]}
                           onChange={(eve) => changeHandler(key, eve.target.value)}/>
            </Box>)
        }

    )
}