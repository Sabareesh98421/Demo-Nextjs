import { google } from "googleapis";
import fs from "fs";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const tokens = JSON.parse(fs.readFileSync("google_tokens.json", "utf-8"));

        const oauth2 = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_REDIRECT_URI
        );

        oauth2.setCredentials(tokens);

        const api = google.mybusinessaccountmanagement({
            version: "v1",
            auth: oauth2,
        });

        const result = await api.accounts.list();

        return NextResponse.json(result.data);

    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
