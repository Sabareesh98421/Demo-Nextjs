import {v4 as uuidv4} from "uuid";
import {FilesHandling} from "@/serverUtils/fileHandling";
import {serverResponse} from "@/serverUtils/ServerResponse";
interface Candidates {
    id:string;
    name:string;
}
interface NewCandidate{
    name:string
}
const fs = new FilesHandling("candidates.json");
export async function POST(req:Request){
    try{

    const newCandidate:NewCandidate= await req.json() as NewCandidate;
    await fs.ensureDataFile<Array<Candidates[]>>([]);
    const candidates:Candidates[] = await fs.readDataJson();

    const  transformedCandidates:Candidates={
        id:generateCandidateID(),
        name:newCandidate.name,
    };

    const duplicateEntry:boolean=candidates.some((candidate)=>(newCandidate.name===candidate.name));
    if(duplicateEntry){
        return serverResponse({status:409,message:"Candidate already exists"});
    }
    candidates.push(transformedCandidates);
        await fs.writeDataJson(candidates);
    }
    catch (err:any){
        console.error(err);
        return serverResponse({status:500,message:"Server Error"});
    }

}
function generateCandidateID():string{
    return uuidv4()
}