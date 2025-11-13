import {NextResponse} from "next/server";
import {ResponseGeneratorParam} from "@/sharedUtils/CustomTypes";
export function responseCarrier<T=unknown>({status = 200, message = "ok", data= null}:ResponseGeneratorParam<T>){
    if(data){
        return {message,data,status}
    }
    return {
        message,status
    }

}

export function serverResponse<T=unknown>({status = 200, message = "ok", data= null}:ResponseGeneratorParam<T>){
    if(data){
        return NextResponse.json({message,data},{status})
    }
    return NextResponse.json({message},{status})

}

export function redirect(path:string,reqUrl:string)
{
       return  NextResponse.redirect(new URL(path,reqUrl));
}
export function next(){
    return NextResponse.next()
}