import {FilesHandling} from "@/serverUtils/fileHandling";
import {Candidates, Framework} from "@/sharedUtils/CustomTypes";

const fs = new FilesHandling("candidates.json");

export async function getCandidate(){
    await fs.ensureDataFile<Array<Candidates[]>>([]);
    return ( await fs.readDataJson<Framework[]>()  )
}