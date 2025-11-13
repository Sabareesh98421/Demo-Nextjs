import React, {useEffect, useState} from "react";
import Image from 'next/image';
import {DataForBackend} from "@/sharedUtils/CustomTypes";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";

export function PollingList({ frameWorks, getVote, disableRadio }: { disableRadio: boolean, frameWorks: string[], getVote: (userVote: DataForBackend) => void }) {
    const [selectedFW, setFW] = useState<string | null>(null);
    const [userEmail] = useState<string | null>(() => {

        if (typeof window !== 'undefined') {
            return localStorage.getItem("userEmail");
        }
        return null;
    });
    const colors = ["bg-red-400", "bg-zinc-800", "bg-green-800","bg-blue-200","bg-red-200","bg-green-800"];
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
                    const [textColor,bgColor,invertImageColor,cursorStyle] = customStyling(selectedFW,frameWork,disableRadio,colors,index)

                    return <ListItem key={index} className="self-stretch w-full">
                        <section className={'h-16 w-fit p-5 flex justify-center items-center border-2 disabled:opacity-25 border-black ' + textColor + bgColor + cursorStyle}>
                            <section className='h-fit w-full flex justify-center items-center '>
                                <Radio name="frameWork" id={frameWork} className='disabled:opacity-25' sx={{display:"none"}} value={frameWork} onChange={handleChangeWrapper}
                                       checked={selectedFW === frameWork} disabled={disableRadio} />
                                <Image src={`/${frameWork.trim()}.png`}
                                       alt={`${frameWork}Icon`}
                                       width={40}
                                       height={40}
                                       className={invertImageColor}
                                       unoptimized
                                />
                                <Typography component="label" htmlFor={frameWork} className={`h-full w-full p-5 `}>{frameWork}</Typography>
                            </section>
                        </section>
                    </ListItem>
                }
            )}
        </List>
    )

}
function customStyling(selectedFW:string|null,frameWork:string,disableRadio:boolean,colors:string[],index:number):string[]
{
    const isSelected:boolean = selectedFW === frameWork;
    let bgColor;
    let textColor:string;
    const cursorStyle = disableRadio ? 'cursor-not-allowed ' : 'cursor-pointer ';
    if (disableRadio) {
        bgColor = isSelected ? `${colors[index]} ` : 'bg-gray-500 '; // Selected stays blue (lighter), others gray
    } else {
        bgColor = isSelected ? `${colors[index]} ` : ' bg-gray-50  ';
    }
    let invertImageColor;
    if (bgColor === "bg-zinc-800 ") {
        textColor = "text-white ";
        invertImageColor = " invert-100 ";
    }
    else {
        textColor = "text-black "
        invertImageColor = " ";
    }
    return[
        textColor,bgColor,invertImageColor,cursorStyle
    ]
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleVoteClick(eve: React.ChangeEvent, setFw: any) {
    const target: EventTarget = eve.currentTarget;
    const value: string = (target as HTMLInputElement).value;
    setFw(value)
}