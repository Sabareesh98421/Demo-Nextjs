import {getCandidate} from "@/serverUtils/Dashboard/GetCandidate";
import {serverResponse} from "@/serverUtils/ServerResponse";
import {Framework} from "@/sharedUtils/CustomTypes";

export async function GET(){
    const data = await getCandidate();
    return serverResponse<Framework[]>({data});
}