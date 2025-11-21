import {cookies} from "next/headers";
import {decode} from "jsonwebtoken";
import {CurrentUser, Role, ServerJwtPayload} from "@/sharedUtils/CustomTypes";
import {ReadonlyRequestCookies} from "next/dist/server/web/spec-extension/adapters/request-cookies";
import {serverResponse} from "@/serverUtils/ServerResponse";
export async  function GET(){
    const token:string|null = await getCookies();
    if(token === null)
    {
        return serverResponse<CurrentUser>({data:{isTokenAvailable:false,isAdmin:false,user:null}})
    }
    const user:ServerJwtPayload= decodedData(token);
    const isAdmin = user.role===Role.Admin;
    return serverResponse<CurrentUser>({data:{isTokenAvailable:true,isAdmin,user}})
}
async function getCookies():Promise<string |null>{
    const cookieStore:ReadonlyRequestCookies =  await  cookies();
    return cookieStore.get("token")?.value??null
}
function decodedData(token:string){
    return decode(token) as ServerJwtPayload;
}