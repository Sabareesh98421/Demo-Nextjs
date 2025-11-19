import { useMemo, useState} from "react";
import {ErrorMap, ErrorMessage, Form, FormHookReturns,} from "@/sharedUtils/CustomTypes";

export function useForm<T extends Form>(formData:T):FormHookReturns<T>{
    const [finalFormData,setFinalFormData] = useState<T>(formData);

    function handleChange(key:keyof T,value:unknown){
        setFinalFormData((prev)=>({...prev,[key]:value}))
    }
    function resetForm(newData?: Partial<T>) {
        setFinalFormData((prev) => ({
            ...prev,
            ...newData,
        }));
    }
    return {finalFormData,handleChange,resetForm};
}

export function useErrorHandlingStates<T>(formData:ErrorMap<T>):ErrorMessage{
    return useMemo(():ErrorMessage=>{


    const  errorList:string[]=[];

     for( const [key,value] of Object.entries(formData)){
            if(!value){
                errorList.push(`The ${key} field is mandatory `)
            }
     }
   return errorList.length>0?errorList:null;
    },[formData])
}