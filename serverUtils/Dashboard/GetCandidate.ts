import {FilesHandling} from "@/serverUtils/fileHandling";
import {Framework} from "@/sharedUtils/CustomTypes";

const fs = new FilesHandling("candidates.json");

export async function getCandidate(){
    return ( await fs.readDataJson<Framework[]>()  )
}