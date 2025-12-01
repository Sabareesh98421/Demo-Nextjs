import {NextRequest, NextResponse} from "next/server";
import {getOAuthClient} from "@/serverUtils/googleOAuth";
import {cookies} from "next/headers";
import fs from "fs";
import {LoginTicket, type OAuth2Client, TokenPayload} from "google-auth-library";
import {ReadonlyRequestCookies} from "next/dist/server/web/spec-extension/adapters/request-cookies";
import {createJWT} from "@/serverUtils/JWT/jwt";
import {Role} from "@/sharedUtils/CustomTypes";
import {serverResponse} from "@/serverUtils/ServerResponse";


export async function GET(req: NextRequest):Promise<NextResponse> {
    const code:string|null = req.nextUrl.searchParams.get("code");

    if (!code) {
        return NextResponse.json({ error: "Missing code." }, { status: 400 });
    }

    try {
        const oauth2Client:OAuth2Client = getOAuthClient();
        const { tokens } = await oauth2Client.getToken(code);
        const ticket:LoginTicket = await oauth2Client.verifyIdToken({
            idToken:tokens.id_token!,
            audience:process.env.GOOGLE_CLIENT_ID,
        })
        const googleUser:TokenPayload|null= ticket.getPayload() ?? null;
        fs.writeFileSync("google_tokens.json", JSON.stringify(tokens, null, 2));
        if(!googleUser || !googleUser.email){
            return serverResponse({status:401,message:"unauthorized"});
        }

        const cookieStore:ReadonlyRequestCookies = await  cookies();
        cookieStore.set({
            name: "token",
            value: createJWT(googleUser.email,Role.Admin),
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
