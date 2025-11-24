import {v4 as uuidv4} from "uuid";
import {FilesHandling} from "@/serverUtils/fileHandling";
import {serverResponse} from "@/serverUtils/ServerResponse";
import {Candidates} from "@/sharedUtils/CustomTypes";
const fs = new FilesHandling("candidates.json");
export async function POST(req:Request){
    try{
        const newCandidateFormData:FormData= await req.formData() ;
        const candidateName:string = newCandidateFormData.get("name")  as string;
        const logo:File|null=newCandidateFormData.get("logo") as File | null;
        if(!(candidateName.length)){
            return serverResponse({status:400,message:"Candidate name is required"});
        }
        await fs.ensureDataFile<Array<Candidates[]>>([]);
        const candidates:Candidates[] = await fs.readDataJson();
        const newCandidate={
            name:candidateName
        }
        console.log(newCandidate)
        const  transformedCandidates:Candidates={
            id:generateCandidateID(),
            name:newCandidate.name as string,
        };

        const duplicateEntry:boolean=candidates.some((candidate)=>(newCandidate.name===candidate.name));
        if(duplicateEntry){
            return serverResponse({status:409,message:"Candidate already exists"});
        }
        if(logo){
            transformedCandidates.logo= await fs.savePublicFiles(logo,transformedCandidates.name);
        }
        else{
            // Just ensure even if the there is no logo just use a placeholder that set this filed in the db,for it's structure.
                transformedCandidates.logo=""
        }
        candidates.push(transformedCandidates);
        console.table(transformedCandidates);
        await fs.writeDataJson(candidates);
        return serverResponse({status:200,message:"Candidate Added"});
    }
    catch (err:any){
        console.error(err);
        return serverResponse({status:500,message:"Server Error"});
    }

}
function generateCandidateID():string{
    return uuidv4()
}