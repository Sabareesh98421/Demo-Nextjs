import { google } from "googleapis";

export function getOAuthClient() {
    return new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID!,
        process.env.GOOGLE_CLIENT_SECRET!,
        process.env.GOOGLE_REDIRECT_URI!,
    );
}

export function generateAuthUrl() {
    const oauth2Client = getOAuthClient();

    const scopes = [
        "openid",
        "email",
        "profile",
        "https://www.googleapis.com/auth/business.manage",
    ];

    return oauth2Client.generateAuthUrl({
        access_type: "offline",
        prompt: "consent",
        scope: scopes,
    });
}
