import { NextResponse } from "next/server";
import { generateAuthUrl } from "@/serverUtils/googleOAuth";

export async function GET() {
    const url = generateAuthUrl();
    return NextResponse.redirect(url);
}
