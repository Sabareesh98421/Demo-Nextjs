import {parseJWT} from "@/serverUtils/JWT/jwt";

import {next, redirect} from "@/serverUtils/ServerResponse";

export  function jwtParserMiddleWare(token:string,reqURL:string){

    const {status} = parseJWT(token);

    if(status===200){
        return next();
    }

    return  redirect(new URL ("/LogIn",reqURL))


}