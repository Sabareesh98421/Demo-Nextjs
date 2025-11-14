import jwt, {JwtPayload, Secret} from "jsonwebtoken";
import {responseCarrier} from "@/serverUtils/ServerResponse";
import {Role, ServerJwtPayload} from "@/sharedUtils/CustomTypes";

const secretKey:Secret|null = process.env.SECRET_KEY ?? null;
if(!secretKey){
    throw new ReferenceError("There Is no Secret key for the JWT , that I can secure please creat a .env file if it's doesn't exist")
}
export function createJWT(email:string,role:Role){
    return jwt.sign({email,role},( secretKey as Secret), {algorithm:"HS512",expiresIn: "2h"});
}
export function parseJWT(token:string){
    try {
        const decoded: ServerJwtPayload = jwt.verify(token, (secretKey as Secret)) as ServerJwtPayload;
        return responseCarrier<ServerJwtPayload>({message:"Token Verified successfully",status:200,data:decoded})

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
