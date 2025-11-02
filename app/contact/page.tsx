"use client";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import  TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography"
import React, {useState} from "react";
type THandleClick=()=>void;
export default function Contact(){
    const [email,setEmail] = useState<string|null>(null);
    const getEmail =(eve:React.ChangeEvent)=>{
        setEmail((eve.target as HTMLInputElement).value);
    }

    const handleClick:THandleClick=():void=>{
            console.log(email)
    }
    return(
        <FormControl  className="
            bg-blue-300
             p-4
             justify-center
             items-center
             rounded
             gap-5
             h-screen
             w-xl
             md:h-80
             md:w-2xl
             md:gap-0
             flex-col
             md:flex-row

        "  sx={{
            m:4
            // width: { xs: '90%', sm: '60rem' },
            // height: { xs: 'auto', sm: '20rem' },
            // bgcolor: 'skyblue',
            // p:2,
            // display:"flex",
            // justifyContent:"space-evenly",
            // alignItems:"center",
            // borderRadius: 2,
            // gap: { xs: 1, sm: 5 },
            // flexDirection: { xs: "column", sm: "row" }
        }}
        >
            <Typography variant="h3" >
                Contact Us
            </Typography>
            <Box component="div" className="flex justify-around items-center flex-col md:flex-row  md:justify-center w-xl md:w-1/2 gap-2 md:gap-5 md:h-[10rem]" sx={{
                // display:"flex",
                // justifyContent: {xs:"space-around ",sm:"center"},
                // alignItems:"center",
                // flexDirection: { xs: "column", sm: "row" },
                // gap: { xs: 2, sm: 5 },
                // width: { xs: '100%', sm: '50%' },
                // height: { xs: 'auto', sm: '10rem' },
                // outline:"2px solid green"
            }}>
                <FormLabel htmlFor="Email" className="text-black hidden sm:flex"> Email </FormLabel>
                <TextField variant="outlined" id="Email" onChange={getEmail}/>
            </Box>
            <Button variant="contained" sx={{minHeight:"2rem" }} onClick={handleClick} >
                Contact Me
            </Button>
        </FormControl>
    )
}