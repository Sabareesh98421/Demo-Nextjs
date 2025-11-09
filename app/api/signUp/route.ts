import {FilesHandling} from "@/serverUtils/fileHandling";
import {SignUpFormData, UserData} from "@/sharedUtils/CustomTypes";
import {NextResponse} from "next/server";

const fs = new FilesHandling("users.json")

function hasMissingFields(userData:SignUpFormData){
    for(const [key,value] of Object.entries(userData)){
        if(!value || value.trim()===""){
            return key;
        }
    }

}
function isExistingUserFound(existingData:UserData[],email:string){
    return existingData.some((eachUser)=>eachUser.email === email)
}

export async function POST(req:Request){
    const res = NextResponse;
    try{
            await fs.ensureDataFile<UserData[]>([]);
            const userdata:SignUpFormData = await req.json();
            const {email,password,confirmPassword} = userdata;
            const existingData=await fs.readDataJson<UserData[]>()
            const loweredEmail:string = email.toLowerCase();
            if( isExistingUserFound(existingData,loweredEmail)){
                return res.json({message:"User already exists"},{status:409});

            }
            const missedField = hasMissingFields(userdata)
            if(missedField)
            {
                return res.json({message:`${missedField} is Mandatory`},{status:400})
            }
            if(!(password === confirmPassword)){
                   return res.json({message:"Password Mismatch"}, {status:400});
            }

            const finalData={
                email:loweredEmail,
                password
            }
            existingData.push(finalData)
            await fs.writeDataJson<UserData[]>(existingData);
        return res.json({message:"user Registered Successfully"},{status:201});
    }
    catch(err){
        console.error(err);
        return res.json({message:"Internal Server Error"},{status:500});
    }
}