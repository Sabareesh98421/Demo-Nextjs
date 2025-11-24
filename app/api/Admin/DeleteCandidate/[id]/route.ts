import {FilesHandling} from "@/serverUtils/fileHandling";
import {Candidates} from "@/sharedUtils/CustomTypes";
import {serverResponse} from "@/serverUtils/ServerResponse";

const fs = new FilesHandling("candidates.json")
export async function DELETE(req:Request,{params}:{params:Promise<{id:string}>}){
    const {id:candidateId}: { id:string } = await params;

    await fs.ensureDataFile([]);

    const candidates:Candidates[] = await fs.readDataJson();


    const success = candidates.deleteItemById(candidateId)

    if(!success){
        return serverResponse({status:404,message:"Can't find the candidate, so can't be get deleted"});
    }
    await fs.writeDataJson<Candidates[]>(candidates)
    return serverResponse({message:"Successfully deleted candidate"});
}