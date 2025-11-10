"use client"
import Typography from  "@mui/material/Typography";
import Grid from "@mui/material/Grid"
import {useState} from "react";
import {candidates} from "@/data/candidateList";
import CandidateList from "@/components/candidatesList";
export default function Candidates(){
    const [isDetailedOpened,setDetailedOpen] = useState<number|null>(null);


    return (
            <Grid className="overflow-auto overflow-x-hidden h-full "  container
                  direction="column">
                    <Typography component="h1"  textAlign="center" m={2} fontSize={20} fontWeight={28}>
                        Candidate Lists (click for details)
                    </Typography>
                <Grid container  spacing={3}>

                    {
                        candidates.map((candidate,i)=>(
                            <Grid
                                item
                                key = {candidate.name}
                                xs={12}
                                sm={isDetailedOpened===i?12:6}
                                sx={{ transition: "all 0.4s ease" }}
                            >
                                <CandidateList {...candidate} expanded={isDetailedOpened===i} onClick={()=>(setDetailedOpen(isDetailedOpened===i?null:i))}></CandidateList>
                            </Grid>
                            )

                        )
                    }

                </Grid>
            </Grid>
    )
}