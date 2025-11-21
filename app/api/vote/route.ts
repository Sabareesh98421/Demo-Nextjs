// route.ts
import { NextResponse } from "next/server";
import { FilesHandling} from "@/serverUtils/fileHandling";
import {VoteData} from "@/sharedUtils/CustomTypes";


// per instance for per db/json file
const fs = new FilesHandling("votes.json")

export async function POST(req: Request) {
    const res = NextResponse;
    try {
        await fs.ensureDataFile<VoteData[]>([]);
        const { email, frameWork } = await req.json();
        console.log(req.json())
        if (!frameWork || !email) {
            return res.json({ message: "Missing FrameWork or email" }, { status: 400 })
        }
        const trimmedFw = frameWork.trim();

        const loweredEmail = email.toLowerCase().trim();
        const votes: VoteData = await  fs.readDataJson<VoteData>();
        const existingData = Object.values(votes);
        const isAlreadyVotedUser = existingData.some(fw => fw.emails.includes(email));
        if (isAlreadyVotedUser) {
            return res.json({ message: "this user is already voted" }, { status: 403 })
        }
        const targetFw = votes[trimmedFw];
        if (!targetFw) {
            return res.json({ message: "Invalid FrameWorkSelected" }, { status: 400 })
        }

        if (targetFw.emails.includes(loweredEmail)) {
            return res.json({ message: "this user is already voted" }, { status: 403 })
        }
        targetFw.emails.push(email);
        targetFw.totalVotes += 1;
        await fs.writeDataJson<VoteData>(votes);
        return res.json({ message: "Successfully Voted " }, { status: 201 })
    }
    catch (err) {
        console.error(err);
        return res.json({ message: "Internal server Error" }, { status: 500 })
    }
}

