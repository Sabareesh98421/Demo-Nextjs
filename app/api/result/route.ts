// route.ts
import { NextResponse } from 'next/server';
import * as fs from 'fs/promises';
import * as path from 'path';
// Define the structure of your mock data file
type FrameworkData = {
    emails: string[];
    totalVotes: number;
}
type VoteData = Record<string, FrameworkData>;

// Ensure the path matches the one used in your POST handler
const dataFilePath = path.join(process.cwd(), 'data', 'votes.json');


export async function GET() {
    try {
        const content = await fs.readFile(dataFilePath, "utf-8");
        const votes: VoteData = JSON.parse(content);
        const result = Object.entries(votes).reduce((acc, [key, value]) => {
            acc[key] = value.totalVotes;
            return acc;
        }, {} as Record<string, number>)
        return NextResponse.json(result, { status: 200 });
    }
    catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Could not fetch current results." }, { status: 500 });
    }

}