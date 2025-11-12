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
    const loweredEmail=email.toLowerCase();
    await fs.ensureDataFile([]);
    const {isPasswordMatched,isEmailMatched,data} = await isUserValid(loweredEmail,password)

    if(!(isPasswordMatched && isEmailMatched)){
        return serverResponse({status:403,message:"User doesn't not exist"})
    }
    if( isEmailMatched && !isPasswordMatched){
        return serverResponse({status:401,message:"Password incorrect"})
    }
    console.log("User",loweredEmail,"is logging in");
    if(!data){
        return serverResponse({status:500,message:"Unexpected error"});
    }
    const token = createJWT(loweredEmail,data.role);
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