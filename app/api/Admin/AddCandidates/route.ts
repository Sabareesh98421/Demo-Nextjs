import {v4 as uuidv4} from "uuid";
import {FilesHandling} from "@/serverUtils/fileHandling";
import {serverResponse} from "@/serverUtils/ServerResponse";
import {Candidates} from "@/sharedUtils/CustomTypes";
const fs = new FilesHandling("candidates.json");
export async function POST(req:Request){
    try{
        const newCandidateFormData:FormData= await req.formData() ;
        const candidateNameRaw:FormDataEntryValue|null = newCandidateFormData.get("name");
        const logo:File|null=newCandidateFormData.get("logo") as File | null;
        if(!(candidateNameRaw) || candidateNameRaw.toString().trim().length<=0){
            return serverResponse({status:400,message:"Candidate name is required"});
        }
        const candidateName:string =  candidateNameRaw.toString().trim();
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
        const loweredCandidateName =newCandidate.name.toLowerCase();
        const duplicateEntry:boolean=candidates.some((candidate)=>(loweredCandidateName===candidate.name.trim().toLowerCase()));
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