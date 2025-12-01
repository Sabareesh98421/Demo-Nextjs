import { NextRequest, NextResponse } from "next/server";
import { getOAuthClient } from "@/serverUtils/googleOAuth";
import { cookies } from "next/headers";
import fs from "fs";
import {type OAuth2Client} from "google-auth-library";
import {ReadonlyRequestCookies} from "next/dist/server/web/spec-extension/adapters/request-cookies";

export async function GET(req: NextRequest):Promise<NextResponse> {
    const code:string|null = req.nextUrl.searchParams.get("code");

    if (!code) {
        return NextResponse.json({ error: "Missing code." }, { status: 400 });
    }

    try {
        const oauth2Client:OAuth2Client = getOAuthClient();
        const { tokens } = await oauth2Client.getToken(code);


        fs.writeFileSync("google_tokens.json", JSON.stringify(tokens, null, 2));


        const cookieStore:ReadonlyRequestCookies = await  cookies();
        cookieStore.set({
            name: "token",
            value: "google-authenticated",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 *2, //only 2hrs
        });


        const redirectUrl = new URL("/", req.url);
        return NextResponse.redirect(redirectUrl);

    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "OAuth failed" }, { status: 500 });
    }
}
