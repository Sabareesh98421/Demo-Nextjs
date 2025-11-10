import jwt, {Secret} from "jsonwebtoken";
import {serverResponse} from "@/serverUtils/ServerResponse";

const secretKey:Secret = process.env.SECRET_KEY!;

export function createJWT(email:string){
    console.log("secretKey : ",secretKey)
    return jwt.sign({email}, secretKey, {expiresIn: "2h"});
}
export function parseJWT(token:string){
    try {
        jwt.verify(token, secretKey);
        return serverResponse({message:"Token Verified successfully",status:200})

    }
    catch(err:JsonWebTokenError|TokenExpiredError){
        if(err instanceof  jwt.JsonWebTokenError){
          return   serverResponse({message:"Token corrupted ",status:401})
        }
        if(err instanceof  jwt.TokenExpiredError){
            return  serverResponse({message:"Token Expired long ago 🤣🤣🤣.....",status:403})
        }
        // NotBeforeError-Token timing related need to check.
        return serverResponse({ message: "Invalid token timing 🕐", status: 400 });
    }

}
