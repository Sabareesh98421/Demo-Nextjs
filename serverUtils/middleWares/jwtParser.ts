import {parseJWT} from "@/serverUtils/JWT/jwt";

import {next, redirect} from "@/serverUtils/ServerResponse";
import {ResponseGeneratorParam, Role} from "@/sharedUtils/CustomTypes";
import {JwtPayload} from "jsonwebtoken";

export  function jwtParserMiddleWare(token:string,reqURL:string){

    const {status,data}:ResponseGeneratorParam<JwtPayload> = parseJWT(token);
    console.error("ReqUrl : " ,reqURL)
    const isAdminPath:boolean = reqURL.includes("/Admin")
    if(status!=200 || !data){
        return  redirect("/LogIn",reqURL)
    }

    if((data.role !== Role.Admin) && isAdminPath ) {
        return  redirect("/",reqURL);
    }

    return next()
}