import {FilesHandling} from "@/serverUtils/fileHandling";
import {Candidates} from "@/sharedUtils/CustomTypes";
import {serverResponse} from "@/serverUtils/ServerResponse";
const fs = new FilesHandling("candidates.json");

export async function POST (req:Request){
    try{
        const updateRequestData:Candidates = await req.json() as Candidates ;
        await fs.ensureDataFile([]);
        const candidates:Candidates[] = await fs.readDataJson();
        if(!candidates.length ){
            return serverResponse({status:404,message:"No candidates found"});
        }

        const existedCandidate:Candidates|null= candidates.find(({id:candidateID} :Candidates)=>candidateID===updateRequestData.id)??null;

        if(!existedCandidate ){
            return serverResponse({status:404,message:`The candidate with id ${updateRequestData.id} does not exist`});
        }
        existedCandidate.name=updateRequestData.name;
        await fs.writeDataJson(candidates);
        return  serverResponse({status:200,message:"Candidate Successfully Updated"});
    }
    catch (err:any){
        console.error(err.message);
        return  serverResponse({status:500,message:"Server Error"});
    }
}