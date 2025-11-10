import {FilesHandling} from "@/serverUtils/fileHandling";
import {LoginFormData, UserData} from "@/sharedUtils/CustomTypes";
import {serverResponse} from "@/serverUtils/ServerResponse";
import {cookies} from "next/headers";
import {createJWT} from "@/serverUtils/JWT/jwt";

type isUserValid={
    isPasswordMatched:boolean,
    isEmailMatched:boolean
}

const fs = new FilesHandling("users.json");
export async function POST(req:Request){
    const {email,password} = await req.json() as LoginFormData;
    const loweredEmail=email.toLowerCase();
    await fs.ensureDataFile([]);
    const {isPasswordMatched,isEmailMatched} = await isUserValid(loweredEmail,password)

    if(!(isPasswordMatched && isEmailMatched)){
        return serverResponse({status:403,message:"User doesn't not exist"})
    }
    if( isEmailMatched && !isPasswordMatched){
        return serverResponse({status:401,message:"Password incorrect"})
    }
    console.log("User",loweredEmail,"is logging in");
    const token = createJWT(loweredEmail);
    await setCookies(loweredEmail,token);

    return serverResponse({message:"User Exists Logging in"});
}

async function setCookies(email:string,token:string){
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
async function isUserValid (email:string,password:string):Promise<isUserValid>{
    const  isLegitUser:UserData[]= await fs.readDataJson<UserData[]>();

    const foundUser:UserData|undefined= isLegitUser.find((user)=> user.email === email);
    if(!foundUser){
        return{isPasswordMatched:false,isEmailMatched:false}
    }
    if(foundUser.password === password ){
        return  {isPasswordMatched:true ,isEmailMatched:true}
    }
    return{
        isPasswordMatched:false,isEmailMatched:true
    }
}