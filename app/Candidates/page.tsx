"use client"
import Typography from  "@mui/material/Typography";
import Grid from "@mui/material/Grid"
import {useState} from "react";
import {candidates} from "@/data/candidateList";
import Stack from "@mui/material/Stack";
import CandidateList from "@/components/candidatesList";
export default function Candidates(){
    const [isDetailedOpened,setDetailedOpen] = useState<number|null>(null);


    return (
            <Stack className="h-full flex-col " direction="column">
                    <Typography component="h1" width="100%"  textAlign="center" m={2} fontSize={20} fontWeight={28}>
                        Candidate Lists (click for details)
                    </Typography>
                <Grid container  spacing={3} className="justify-center items-center flex-wrap">

                    {
                        candidates.map((candidate,i)=>(
                            <Grid
                                item
                                key = {candidate.name}
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                // sm={isDetailedOpened===i?12:6}
                                sx={{ transition: "all 0.4s ease" }}
                            >
                                <CandidateList {...candidate} expanded={isDetailedOpened===i} onClick={()=>(setDetailedOpen(isDetailedOpened===i?null:i))}></CandidateList>
                            </Grid>
                            )

                        )
                    }

                </Grid>
            </Stack>
    )
}