"use client"
import {FormEvent, JSX, useState} from "react";
import {useForm,useErrorHandlingStates} from "@/CustomHooks/useForm";
import  FormControl from "@mui/material/FormControl";
import Typography from  "@mui/material/Typography";
import {ErrorMessage, Form} from "@/sharedUtils/CustomTypes";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {signUpForm,initialData} from "./_Inputfields";
import Link from "@mui/material/Link";

export default function Page():JSX.Element{
    const {finalFormData:formData,handleChange} = useForm(initialData);
    const [displayError,setDisplayError] = useState(false);
    const   errors :ErrorMessage= useErrorHandlingStates(formData);
    const handleSubmit=(eve:FormEvent)=>{

        eve.preventDefault();
        if (errors) {
            setDisplayError(true);
            return;
        } else {
            setDisplayError(false);
        }
        console.log(formData);
    }

    return(
        <Box className="w-6xl flex  gap-12 justify-between items-center flex-row  p-12 rounded-xl" sx={{bgcolor:"whitesmoke"}}>
        <FormControl component="form" className="w-full max-w-md  text-black rounded-lg flex justify-center items-center flex-row shadow-2xl " sx={{bgcolor:"white",p:2,border:1,borderColor:"ghostwhite"}} onSubmit={handleSubmit}>
            <Typography variant="h3" textAlign="center" className={"border-b-2 block w-full"} > Sign Up</Typography>
            <Box className="w-full flex  flex-col gap-2 ">
                {RenderFormFields<Form>(signUpForm,handleChange)}
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
            <Box component="section">

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

function RenderFormFields<T extends Form>(fields:T[],changeHandler:(key:string,value:unknown)=>void) {
    return fields.map((field) =>
        <Box component="section" key={field.id as string} className="w-full flex justify-between items-center gap-8" sx={{
                padding: "8px"
        }}>
            <FormLabel htmlFor={field.id as string} sx={{
                textAlign:"start"
            }}>{field.name as string}</FormLabel>
            <TextField variant="outlined" {...field} size="small" onChange={(eve)=>changeHandler((field.id as string),eve.target.value)}/>
        </Box>

    )
}