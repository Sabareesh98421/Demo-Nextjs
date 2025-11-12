"use client"
import Box from "@mui/material/Box";
import Link from "next/link";
import {useTheme} from "@mui/material";
import Candidates from "@/app/Candidates/page";
export default function Home() {



  return (<>
    {<MainContent />}
  </>
  )

}
function MainContent() {
    const theme = useTheme();
  return (
    <Box  className="flex  h-full w-full items-center justify-center  font-sans    flex-col" sx={{color:theme.palette.text.primary, transition: "box-shadow 0.3s ease, background-color 0.3s ease",}}>

        <Link href="/vote"  className="text-end flex justify-end items-center w-full underline ">Click Here for Vote</Link>
        <Candidates></Candidates>
    </Box>
  );
}
