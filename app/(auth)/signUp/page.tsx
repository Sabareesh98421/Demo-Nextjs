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

export default function Page():JSX.Element{
    const router = useRouter();
    const theme:Theme = useTheme();
    const dispatchFormData=useDispatch();
    const [isLoadingBegins,setLoadingState] = useState<boolean>(false);
    const formDataRedux:SignUpFormData=useSelector((formDataState:RootState)=>formDataState.Register)
    const [displayError,setDisplayError] = useState(false);
    const [serverResponse,setServerResponse] = useState<string>("");
    const [registerUser, {isLoading,isSuccess,isError}] = useRegisterUserMutation();

    const   errors :ErrorMessage= useErrorHandlingStates<SignUpFormData>(formDataRedux);

    function changeHandlerRedux(field:  keyof  SignUpFormData,value:string){

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
        // const validation = validateFormFields(formDataRedux);

        if (errors) {
            setDisplayError(true);
            return;
        } else {
            setDisplayError(false);
            
            try {
                const res:SignUpResponse = await registerUser(formDataRedux).unwrap();

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

    }

    return(
            <Box className="w-6xl flex  gap-2 justify-evenly items-center flex-row  p-12 rounded-xl "  sx={{color:theme.palette.text.secondary}}>
                <Snackbar autoHideDuration={2000} message={serverResponse}  anchorOrigin={{ vertical: "top", horizontal: "right" }} open={!!serverResponse} onClose={()=> {
                    setServerResponse("")
                }}/>

            <FormControl component="form"  method={HTTP_Method.POST}  className="w-full max-w-md  rounded-lg flex justify-center items-center flex-row shadow-2xl "
                         sx={{bgcolor:"white",p:2,border:1,borderColor:"ghostwhite"}} onSubmit={handleSubmit}>
                <Typography variant="h3" textAlign="center" className={"border-b-2 block w-full"} color={theme.palette.text.secondary}> Sign Up</Typography>
                <Box className="w-full flex  flex-col gap-2 " sx={{color:theme.palette.text.secondary}}>
                    {RenderFormFields<Form>(signUpForm,formDataRedux,theme,changeHandlerRedux)}

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



function RenderFormFields<T extends Form>(fields:T[],value:SignUpFormData,theme:Theme,changeHandler:(field:keyof SignUpFormData,value:string)=>void) {
    return fields.map((field) => {
        const key = field.id === "confirm-password" ? "confirmPassword" : (field.id as keyof SignUpFormData);
            return (<Box component="section" key={field.id as string} className="w-full flex justify-between items-center gap-8"
                 sx={{
                     padding: "8px"
                 }}>
                <FormLabel htmlFor={field.id as string} sx={{
                    textAlign: "start"
                }}>{field.name as string}</FormLabel>
                <TextField variant="outlined" {...field} size="small" value={value[key]} slotProps=
                    {
                        {
                            input: {
                                sx: { color: theme.palette.text.secondary ,
                                    borderColor:theme.palette.divider,
                                }

                            }
                        }
                }
                           onChange={(eve) => changeHandler(key, eve.target.value)}/>
            </Box>)
        }

    )
}