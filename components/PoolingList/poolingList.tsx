import React, {useEffect, useState} from "react";
import Image from 'next/image';
import {DataForBackend} from "@/sharedUtils/CustomTypes";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import { useTheme } from "@mui/material";

export function PollingList({ frameWorks, getVote, disableRadio }: { disableRadio: boolean, frameWorks: string[], getVote: (userVote: DataForBackend) => void }) {
    const [selectedFW, setFW] = useState<string | null>(null);
    const [userEmail] = useState<string | null>(() => {

        if (typeof window !== 'undefined') {
            return localStorage.getItem("userEmail");
        }
        return null;
    });
    const theme= useTheme()
    useEffect(() => {

        const userVote: DataForBackend = {
            email: "",
            frameWork: ""
        }

        if (userEmail && selectedFW) {
            userVote.email = userEmail
            userVote.frameWork = selectedFW
            // console.log(userVote);
        }

        getVote(userVote);

    }, [selectedFW, userEmail, getVote])

    const handleChangeWrapper = (eve: React.ChangeEvent) => {
        handleVoteClick(eve, setFW);
    }
    return (
        <List className='w-full h-full grid  sm:grid-cols-2 md:grid-cols-3 '>
            {frameWorks.map(
                (frameWork, index) => {
                    console.log("frameWork : ",frameWork)
                    const cursorStyle = disableRadio ? 'cursor-not-allowed ' : 'cursor-pointer ';
                    const selectedOption = frameWork===selectedFW ? ` ${theme.palette.primary.main} ` : " ";
                    return <ListItem key={index} className="self-stretch w-full">
                        <section className={'h-16 w-fit  flex justify-center items-center border-2 disabled:opacity-25 border-black ' + cursorStyle } style={{backgroundColor:selectedOption}}>
                            <Typography component="label" htmlFor={frameWork} className={`h-full  w-full flex justify-start items-center text-center `}>
                                <section className='h-full w-full p-5 flex justify-center items-center  gap-4'>
                                    <Radio name="frameWork" id={frameWork} className='disabled:opacity-25' sx={{display:"none"}} value={frameWork} onChange={handleChangeWrapper}
                                       checked={selectedFW === frameWork} disabled={disableRadio} />
                                    <Image src={`/${frameWork.trim()}.png`}
                                       alt={`${frameWork}Icon`}
                                       width={40}
                                       height={40}

                                       unoptimized
                                    />
                                    {frameWork}
                                </section>
                            </Typography>
                        </section>
                    </ListItem>
                }
            )}
        </List>
    )

}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleVoteClick(eve: React.ChangeEvent, setFw: any) {
    const target: EventTarget = eve.currentTarget;
    const value: string = (target as HTMLInputElement).value;
    setFw(value)
}