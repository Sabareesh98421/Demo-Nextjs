import {FilesHandling} from "@/serverUtils/fileHandling";
import {LoginFormData, Role, UserData} from "@/sharedUtils/CustomTypes";
import {serverResponse} from "@/serverUtils/ServerResponse";
import {cookies} from "next/headers";
import {createJWT} from "@/serverUtils/JWT/jwt";

type isUserValid<T>={
    isPasswordMatched:boolean,
    isEmailMatched:boolean,
    data?:T|null
}

const fs = new FilesHandling("users.json");
export async function POST(req:Request){
    const {email,password} = await req.json() as LoginFormData;
    const loweredEmail:string=email.toLowerCase();
    await fs.ensureDataFile([]);
    const {isPasswordMatched,isEmailMatched,data} = await isUserValid(loweredEmail,password)
    const {isValid:isPasswordValidFormate,errors} =  isPasswordValid(password)
    if(!isPasswordValidFormate){
        return serverResponse({status:401,message:errors.toString()})
    }
    if(! isEmailMatched){
        return serverResponse({status:403,message:"User doesn't exist"})
    }
    if(!isPasswordMatched){
        return serverResponse({status:401,message:"Password incorrect"})
    }
    console.log("User",loweredEmail,"is logging in");
    if(!data){
        return serverResponse({status:500,message:"Unexpected error"});
    }
    const token:string = createJWT(loweredEmail,data.role);
    await setCookies(token);
    if(data.role==Role.Admin ){
        return serverResponse({message:"Welcome Admin "});
    }

    return serverResponse({message:"User Exists Logging in"});
}

async function setCookies(token:string){
    const cookiesStore = await  cookies();
    cookiesStore.set({
        name:"token",
        value:token,
        httpOnly:true,
        secure:process.env.NODE_ENV=== "production",
        path:"/",
        maxAge:60*60*2,
        sameSite:"lax"
    })
}
async function isUserValid (email:string,password:string):Promise<isUserValid<UserData>>{
    const  isLegitUser:UserData[]= await fs.readDataJson<UserData[]>();

    const foundUser:UserData|undefined= isLegitUser.find((user)=> user.email === email);
    if(!foundUser){
        return{isPasswordMatched:false,isEmailMatched:false,data:null}
    }
    if(foundUser.password === password ){
        return  {isPasswordMatched:true ,isEmailMatched:true,data:foundUser}
    }
    return{
        isPasswordMatched:false,isEmailMatched:true,data:null
    }
}

function isPasswordValid(password:string){
    const errors:string[] =[];

    if(password.length<8){
        errors.push("Password must be at least 8 characters");

    }
    if(!/[a-z]/.test(password)){
        errors.push("Password must be at least one lowercase letter");

    }
    if(!/[A-Z]/.test(password)){
        errors.push("Password must be at least one uppercase letter");

    }
    if(!/[0-9]/.test(password)){
        errors.push("Password must be at least one number");

    }
    if(!/[\W_]/.test(password)){
        errors.push("Password must be at least one special character");

    }
    return {
        isValid:errors.length===0,errors
    };
}