import {NextResponse} from "next/server";
import {ResponseGeneratorParam} from "@/sharedUtils/CustomTypes";


export function serverResponse<T=unknown>({status = 200, message = "ok", data= null}:ResponseGeneratorParam<T>){
    if(data){
        return NextResponse.json({message,data},{status})
    }
    return NextResponse.json({message},{status})

}

export function redirect(path:URL|string)
{
       return  NextResponse.redirect(path);
}
export function next(){
    return NextResponse.next()
}