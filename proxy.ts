import {NextRequest} from "next/server";
import {jwtParserMiddleWare} from "@/serverUtils/middleWares/jwtParser";
import {next, redirect} from "@/serverUtils/ServerResponse";

export function proxy(req:NextRequest){

    const token = req.cookies.get("token")?.value;
    if(!token)
    {
        return redirect("/signIn",req.url)
    }

    return jwtParserMiddleWare(token,req.url)
}
export const config={
    matcher: [
        '/((?!auth|api/google|api/LogIn|api/signUp|signIn|signUp|ForgotPassword|_next|favicon\\.ico|images|fonts).*)',
    ]
}