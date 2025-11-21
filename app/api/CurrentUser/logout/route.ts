import {cookies} from "next/headers";
import {serverResponse} from "@/serverUtils/ServerResponse";

export async function POST(req:Request){
    const cookieStore  = await cookies();
    cookieStore.set({
        name:"token",
        value:"",
        path:"/",
        maxAge:0,
        expires:new Date(0)
        }
    );
    return serverResponse({})
}