import {NextRequest} from "next/server";
import {jwtParserMiddleWare} from "@/serverUtils/middleWares/jwtParser";
import {next, redirect} from "@/serverUtils/ServerResponse";

export function proxy(req:NextRequest){
    const pathName=req.nextUrl.pathname;

    const token = req.cookies.get("token")?.value;
    if(!token)
    {

        return redirect(new URL("/signIn",req.url))
    }
    return jwtParserMiddleWare(token,pathName)
}
export const config={
    matcher:[ '/((?!api/LogIn|api/signUp|signIn|signUp|ForgotPassword|_next|favicon\\.ico|images|fonts).*)',]
}