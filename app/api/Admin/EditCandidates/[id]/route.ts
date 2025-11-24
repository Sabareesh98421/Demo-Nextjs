import {FilesHandling} from "@/serverUtils/fileHandling";
import {Candidates} from "@/sharedUtils/CustomTypes";
import {serverResponse} from "@/serverUtils/ServerResponse";
const fs = new FilesHandling("candidates.json");

export async function PUT (req:Request,{params}:{params:Promise<{id:string}>}){
    try{
        const {id}:{id:string} = await params

        console.log("id From server :",id);
        const updateRequestData:FormData= await req.formData()  ;
        const name:string|null= (updateRequestData.get("name") as string)??null ;
        const logo :File | null =(updateRequestData.get("logo") as File)??null;

        if(!name){
            return serverResponse({status:403,message:"The Framework name needs to be mandatory"})
        }
        await fs.ensureDataFile([]);
        const candidates:Candidates[] = await fs.readDataJson();

        const existedCandidate= candidates.find(({id:candidateID} )=>candidateID===id)??null;

        if(!existedCandidate ){
            return serverResponse({status:404,message:`The candidate with id ${id} does not exist`});
        }
        // if(existedCandidate.name === name && !logo.size){
        //     return serverResponse({status:400,message:"The name of the candidate is the same as old"});
        // }
        if(logo && logo.size){
            existedCandidate.logo=await fs.savePublicFiles(logo,name);
        }
        else {
            existedCandidate.logo = "";
        }
        existedCandidate.name=name;
        await fs.writeDataJson(candidates);
        return  serverResponse({status:200,message:"Candidate Successfully Updated"});
    }
    catch (err:any){
        console.error(err.message);
        return  serverResponse({status:500,message:"Server Error"});
    }
}