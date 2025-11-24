"use client"
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Image from "next/image";
interface CandidateListProps {
    name: string;
    img: string;
    pros: string[];
    cons: string[];
    expanded: boolean;
    onClick: () => void;
}
interface DetailsProps{
    title:string,
    detailsArray:string[],
    color:string
}
export default function CandidateList({name,img,pros,cons,expanded,onClick}:CandidateListProps){
    return(

        <Box className="relative rounded-xl  cursor-pointer transition-all duration-300 flex flex-row   "
            sx={{
                boxShadow: 3,
                transition: "all 0.4s ease",
                backdropFilter: "blur(6px)",
                "&:hover": { boxShadow: 5 },
                height:"25rem",
            }}
             onClick={onClick}
        >
            <Box className="flex justify-around items-center flex-col"
            >
                <Box component="section"   sx={{
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    padding:2,

                }}>
                    <Image
                    src={img}
                    alt={name}
                    width={800}
                    height={500}
                    className="w-full h-auto block object-cover scale-75"
                    unoptimized
                    />
                </Box>
                <Typography variant="h2" textAlign="center" p={2} className="w-full">
                    {name}
                </Typography>

            </Box>
            <Box component="section"  sx={{
                alignItems:"center",
                justifyContent:"center",

            }}>
                {expanded && (
                    <Collapse in={expanded} timeout="auto" unmountOnExit >
                        <Grid container spacing={2} p={2}>
                            <Grid item xs={12} md={6} >
                                <Details title="Pros" color="success.main" detailsArray={pros} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Details title="Cons" color="error.main" detailsArray={cons} />
                            </Grid>
                        </Grid>
                    </Collapse>
                )}


            </Box>
        </Box>
    )
}

function Details({color,detailsArray,title}:DetailsProps){
    return (
        <>
            <Typography variant="subtitle1" color={color} px={2}>
                {title}
            </Typography>
            <List dense>
                {
                    detailsArray.map((p)=>(
                        <ListItem key={p}>{p}</ListItem>
                    ))
                }
            </List>
        </>
    )
}