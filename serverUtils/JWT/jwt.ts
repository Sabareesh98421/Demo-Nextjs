import jwt, {JwtPayload, Secret} from "jsonwebtoken";
import {responseCarrier} from "@/serverUtils/ServerResponse";
import {Role} from "@/sharedUtils/CustomTypes";

const secretKey:Secret = process.env.SECRET_KEY!;

export function createJWT(email:string,role:Role){
    return jwt.sign({email,role}, secretKey, {expiresIn: "2h"});
}
export function parseJWT(token:string){
    try {
        const decoded: JwtPayload = jwt.verify(token, secretKey) as JwtPayload;
        return responseCarrier<JwtPayload>({message:"Token Verified successfully",status:200,data:decoded})

    }
    catch(err:unknown){
        if(err instanceof  jwt.JsonWebTokenError){
          return   responseCarrier({message:"Token corrupted ",status:401})
        }
        if(err instanceof  jwt.TokenExpiredError){
            return  responseCarrier({message:"Token Expired long ago 🤣🤣🤣.....",status:403})
        }
        // NotBeforeError-Token timing related need to check.
        return responseCarrier({ message: "Invalid token timing 🕐", status: 400 });
    }

}
