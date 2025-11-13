import {FilesHandling} from "@/serverUtils/fileHandling";
import {FrameworkData, VoteData} from "@/sharedUtils/CustomTypes";
const fs = new FilesHandling("votes.json");
export async function dashBoardStats(){
       await fs.ensureDataFile()
        const votes:VoteData= await fs.readDataJson<VoteData>();
        totalEntierVote(votes); // component = DashboardComponent
        whichUserNFrameWork(votes);
        whichFrameWorkNItTotal(votes) // component = DashboardComponent
}

function totalEntierVote(votes:VoteData){
    return  Object.values(votes).reduce((sum:number,{totalVotes}:FrameworkData)=>sum+totalVotes,0)
}
function whichUserNFrameWork(votes:VoteData){
    return Object.entries(votes).map(([frameWork,data])=>({
        frameWork,users:data.emails
    }))
}
function whichFrameWorkNItTotal(votes:VoteData){
    return Object.entries(votes).map(([frameWork,totalVotes])=>({
        frameWork,totalVotes
    }))
}