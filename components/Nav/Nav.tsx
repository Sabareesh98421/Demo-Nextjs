import {ThemeToggle} from "@/components/ThemeToggle/themeToggle";
import Link from "next/link";
import {cookies} from "next/headers";
import {ReadonlyRequestCookies} from "next/dist/server/web/spec-extension/adapters/request-cookies";
import {decode} from "jsonwebtoken";
import {Role, ServerJwtPayload} from "@/sharedUtils/CustomTypes";
import Box from "@mui/material/Box"

export async function Nav(){
    const token :string | null= (await getCookies());
    let  isAdmin:boolean=false;
    if(token)
    {
        isAdmin= isUserIsAdmin(token)
    }

    return(
        <nav className="bg-transparent flex justify-between items-center gap-8 w-[90%]   z-50  pt-8 ">
            { token &&  (<Link href="/">Polling Candidates</Link>)}
            <Box className="flex justify-evenly itmes-center w-1/2 ">
                <ThemeToggle/>
                {
                    token &&
                    <Link href="/vote" className="text-end flex justify-end items-center  underline ">Click Here for
                        Vote</Link>
                }
                {isAdmin && AdminNavContent()}</Box>
        </nav>
    )
}
function AdminNavContent(){
    return<>
        <Link href="/Admin/Dashboard"  className="text-end flex justify-end items-center  underline ">Dashboard</Link>
    </>
}
async function getCookies():Promise<string | null>{
    // I am sure that the middle ware would redirect to the signup/signIn when there is no token at all in the cookie,
    //  so I used the `!` here.
    const cookieStore:ReadonlyRequestCookies =  await cookies();
        return cookieStore.get("token")?.value ?? null
}
function isUserIsAdmin(token:string):boolean{
    const user:ServerJwtPayload = decode(token) as ServerJwtPayload;
    return user.role===Role.Admin
}