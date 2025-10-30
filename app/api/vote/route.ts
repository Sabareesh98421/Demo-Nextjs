// route.ts
import { NextResponse } from "next/server";
import * as fs from "fs/promises";
import * as path from "path";
// Define the structure of your mock data file
type FrameworkData = {
    emails: string[];
    totalVotes: number;
}
type VoteData = Record<string, FrameworkData>;
const dataFilePath = path.join(process.cwd(), "data", "votes.json");

// Initialize default data
const defaultVotes: VoteData = {
    "Next": { emails: [], totalVotes: 0 },
    "Nuxt": { emails: [], totalVotes: 0 },
    "Angular": { emails: [], totalVotes: 0 },
};

async function ensureDataFile() {
    try {
        await fs.access(dataFilePath);
    } catch {
        // File doesn't exist, create it
        const dirPath = path.dirname(dataFilePath);
        await fs.mkdir(dirPath, { recursive: true });
        await fs.writeFile(dataFilePath, JSON.stringify(defaultVotes, null, 2));
    }
}
export async function POST(req: Request) {
    const res = NextResponse;
    try {
        await ensureDataFile();
        console.log("dataFilePath : ", dataFilePath) //not logging in the server
        const { email, frameWork } = await req.json();
        if (!frameWork || !email) {
            return res.json({ message: "Missing FrameWork or email" }, { status: 400 })
        }
        const trimmedFw = frameWork.trim();

        const loweredEmail = email.toLowerCase().trim();
        const fileContent = await fs.readFile(dataFilePath, "utf-8");
        const votes: VoteData = JSON.parse(fileContent);
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
        await fs.writeFile(dataFilePath, JSON.stringify(votes, null, 2));
        return res.json({ message: "Successfully Voted " }, { status: 201 })
    }
    catch (err) {
        console.error(err);
        return res.json({ message: "Internal server Error" }, { status: 500 })
    }
}

