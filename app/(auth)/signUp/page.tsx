"use client"
import { FormEvent, JSX, useEffect, useState} from "react";
import {useErrorHandlingStates} from "@/CustomHooks/useForm";
import  FormControl from "@mui/material/FormControl";
import Typography from  "@mui/material/Typography";
import {ErrorMessage, Form, SignUpFormData, SignUpResponse} from "@/sharedUtils/CustomTypes";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {signUpForm} from "./_Inputfields";
import Link from "@mui/material/Link";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/lib/Store";
import {resetForm, setRegisterFormData} from "@/features/userSlice/Register/RegisterUser";
import {useRegisterUserMutation} from "@/features/RTK/Query/userRegister/UserRegisterAPI";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import {Theme, useTheme} from "@mui/material";
import {useRouter} from "next/navigation";
import {HTTP_Method} from "@/serverUtils/Enums/HTTP_Enum";
import {userRegisterSchema} from "@/Validations/singupFormSchema";

export default function Page():JSX.Element{
    const router = useRouter();
    const theme:Theme = useTheme();
    const dispatchFormData=useDispatch();
    const [isLoadingBegins,setLoadingState] = useState<boolean>(false);
    const  formDataRedux:SignUpFormData=useSelector((formDataState:RootState)=>formDataState.Register)
    let validatedFormData:SignUpFormData;
    const [displayError,setDisplayError] = useState(false);
    const [serverResponse,setServerResponse] = useState<string>("");
    const [registerUser, {isLoading,isSuccess,isError}] = useRegisterUserMutation();

    const   [errors,setErrorsMessage]= useState<string[]>([]);

     function  changeHandlerRedux(field:  keyof  SignUpFormData,value:string){

        dispatchFormData(setRegisterFormData({key:field,value}))
    }

        useEffect(() => {
            if (isSuccess) {

                dispatchFormData(resetForm());
                setLoadingState(false);
            }
            if(isError){
                setLoadingState(false);
                dispatchFormData(resetForm());
            }
            if(isLoading){
                setLoadingState(true);
            }
        }, [isSuccess, isLoading,isError,dispatchFormData,]);

    const handleSubmit=async (eve:FormEvent)=>{

        eve.preventDefault();
        // this 1st try/catch belongs to the yup validation.
        // I am planning to simplifying it.......
        try{

            validatedFormData = await userRegisterSchema.validate(formDataRedux, {abortEarly: false});
            setErrorsMessage([]);
            setDisplayError(false);
            console.log(formDataRedux);
        }
        catch(err:any){
            if (err.name === "ValidationError") {
                // Yup errors
                const validationMessages = err.inner.map((e) => e.message);
                setErrorsMessage(validationMessages);
                setDisplayError(true);
            } else {
                // Server errors
                setServerResponse(err.data?.message || "Something went wrong");
            }
            setDisplayError(true);
            return ;
        }

        // this 2nd try/catch belongs to the API calls
        try {

            const res:SignUpResponse = await registerUser(validatedFormData).unwrap();
            console.warn(res)
            setServerResponse(res.message);
            console.log(res)
            router.push("/signIn")
        }
        catch(err){
            console.error(err)

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setServerResponse(err.data.message)
        }

    }

    return(
            <Box className="w-6xl flex  gap-2 justify-evenly items-center flex-row  p-12 rounded-xl "  sx={{color:theme.palette.text.secondary}}>
                <Snackbar autoHideDuration={2000} message={serverResponse}  anchorOrigin={{ vertical: "top", horizontal: "right" }} open={!!serverResponse} onClose={()=> {
                    setServerResponse("")
                }}/>

            <FormControl component="form"  method={HTTP_Method.POST}  className="w-full max-w-xl  rounded-lg flex justify-center items-center flex-row shadow-2xl "
                         sx={{bgcolor:"white",p:2,border:1,borderColor:"ghostwhite"}} onSubmit={handleSubmit}>
                <Typography variant="h3" textAlign="center" className={"border-b-2 block w-full"} color={theme.palette.text.secondary}> Sign Up</Typography>
                <Box className="w-full flex  flex-col gap-2 " m={2} sx={{color:theme.palette.text.secondary}}>
                    {
                        RenderFormFields<Form>(signUpForm,formDataRedux,true,theme,changeHandlerRedux)
                    }

                    <Link textAlign="right" href="/signIn" sx={{
                        m:2
                    }}>Already Logged in ? SignIn here</Link>
                </Box>

                <Button variant="contained" size="medium" disabled={isLoadingBegins} fullWidth sx={{
                    display:"flex",
                    p:2,
                    bgcolor:theme.palette.primary.main,
                    '&.Mui-disabled': {
                        backgroundColor: theme.palette.action.disabledBackground,
                        color: theme.palette.action.disabled,
                    },
                }}
                        className="w-8"
                type="submit"
                >
                    {isLoadingBegins ? <CircularProgress size={25} /> : "Sign Up"}
                </Button>
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



function RenderFormFields<T extends Form>(fields:T[],value:SignUpFormData,isMandatory:boolean,theme:Theme,changeHandler:(field:keyof SignUpFormData,value:string)=>void) {

    return fields.map((field) => {

            return (
                <Box component="section" key={field.id as string} className="w-full flex justify-between items-center gap-8"
                 sx={{
                     padding: 1,
                 }}>
                <FormLabel htmlFor={field.id as string} sx={{
                    textAlign: "start"
                }}>{field.name as string}{ isMandatory &&(<span className="text-red-600 ">*</span>)}</FormLabel>

                <TextField variant="outlined" {...field}

                           size="small" value={value[field.id]} slotProps=
                    {
                        {
                            input: {
                                sx: { color: theme.palette.text.secondary ,
                                    borderColor:theme.palette.divider,
                                }
                            },
                        }

                }
                           onChange={(eve) => changeHandler(field.id, eve.target.value)}/>
            </Box>)
        }

    )
}


