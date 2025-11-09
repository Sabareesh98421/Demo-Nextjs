import {FilesHandling} from "@/serverUtils/fileHandling";
import {LoginFormData, UserData} from "@/sharedUtils/CustomTypes";
import {serverResponse} from "@/serverUtils/ServerResponse";
type isUserValid={
    isPasswordMatched:boolean,
    isEmailMatched:boolean
}

const fs = new FilesHandling("users.json");
export async function POST(req:Request){
    const {email,password} = await req.json() as LoginFormData;
    await fs.ensureDataFile([]);
    const {isPasswordMatched,isEmailMatched} = await isUserValid(email,password)

    if(isPasswordMatched && isEmailMatched){
        console.log("User",email,"is logging in")
        return serverResponse({message:"User Exists Logging in"});
    }
    if( isEmailMatched && !isPasswordMatched){
        return serverResponse({status:401,message:"Password incorrect"})
    }
    return serverResponse({status:403,message:"User doesn't not exist"})
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