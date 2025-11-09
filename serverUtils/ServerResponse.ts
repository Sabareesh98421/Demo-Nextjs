import {NextResponse} from "next/server";
import {ResponseGeneratorParam} from "@/sharedUtils/CustomTypes";

export function serverResponse<T=unknown>({status = 200, message = "ok", data= null}:ResponseGeneratorParam<T>){
    const res = NextResponse;
    if(data){
        return res.json({message,data},{status})
    }
    return res.json({message},{status})

}