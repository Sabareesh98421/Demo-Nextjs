"use client"
import Box from "@mui/material/Box";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {useTheme} from "@mui/material";
import Candidates from "@/app/Candidates/page";

export default function Home() {

  const router = useRouter();
  //
  // useEffect(() => {
  //   const token = localStorage.getItem("authToken");
  //   if (!token) router.push("/signIn")
  // }, [router]);

  return (<>
    {<MainContent />}
  </>
  )

}
function MainContent() {
    const theme = useTheme();
  return (
    <Box  className="flex min-h-screen h-full w-full items-center justify-center  font-sans  overflow-x-hidden  flex-col" sx={{color:theme.palette.text.primary, transition: "box-shadow 0.3s ease, background-color 0.3s ease",}}>

        <Link href="/vote"  className="text-end flex justify-end items-center w-full underline  ">Click Here for Vote</Link>
     <Candidates></Candidates>
    </Box>
  );
}
