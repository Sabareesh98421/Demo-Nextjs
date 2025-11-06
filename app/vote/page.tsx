"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {PollingList} from "@/components/PoolingList/poolingList";
import {DataForBackend, FeedbackType} from "@/sharedUtils/CustomTypes";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

// page.tsx
const GLOBAL_TIMING = 3000;
export default function Vote() {
    const router:AppRouterInstance = useRouter();
    const [feedback, setFeedBack] = useState<FeedbackType>(null);
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) router.push("/signIn")
    }, [router]);

    const clearFeedback = useCallback(() => {
        setFeedBack(null);
    }, []);

    const perfectFrameWork = ["Angular", "Next", "Nuxt","react","Nest","Vue"];


    const [votedData, setVotedData] = useState<DataForBackend | null>(null);
    const [disableRadio, setDisableRadio] = useState(false);


    // Function passed to the child to receive the data
    const userVoteReceiver = useCallback((data: DataForBackend | null) => {
        setVotedData(data); // Update the state when the child calls this function
    }, []);
    
    const handleSubmitWrapper = (eve: React.FormEvent) => {
        // alert(`You voted for "${votedData?.frameWork}"`)
        handleSubmit(eve, votedData, setFeedBack, setDisableRadio, clearFeedback, router)
        setDisableRadio(true)

    }
    const handleLogout = () => {
        localStorage.clear();
        router.push("/signIn")

    }
    const feedbackClasses = feedback?.type === 'error'
        ? 'bg-red-500 text-white'
        : 'bg-green-500 text-white';
    return <>
        {feedback && (
            <div
                className={`fixed top-5 left-1/2 transform -translate-x-1/2 p-3 rounded-lg shadow-xl z-50 ${feedbackClasses}`}
                role="alert"
            >
                {feedback.text}
            </div>
        )}
        <FormControl component="form" className='h-fit w-fit flex justify-center items-center  bg-white text-black shadow-md shadow-gray-200  ' onSubmit={handleSubmitWrapper}>
            <Box component="section" className='h-fit w-fit p-5  flex flex-col justify-evenly items-center select-none cursor-default gap-5'>
                <Box component="div" className="nav h-fit w-full p-5 border-b-2 border-gray-300   flex justify-between items-center select-none cursor-default ">
                    <Typography component="span" className='self-start text-3xl   h-fit ' >
                        <Link href="/">
                            <Button variant="contained">Back</Button>
                        </Link>
                    </Typography>
                    <Box component="div" className="flex p-1 justify-evenly items-center gap-5  " >
                        <Typography component="span" className='self-end text-xl   h-fit  text-right ' >
                            <Link href="/vote/result">
                                <p>Result</p>
                            </Link>
                        </Typography>

                        <Typography component="span" className='self-end text-right text-xl  h-fit '  onClick={handleLogout}>Logout</Typography>
                    </Box>
                </Box>
                <Typography>Please Vote For The Listed Candidates Below</Typography>
                <PollingList frameWorks={perfectFrameWork} getVote={userVoteReceiver} disableRadio={disableRadio} />
                {/* I share the same state of the disable button */}
                <Button type="submit" variant="contained" className=' text-center cursor-default disabled:bg-gray-500 disabled:cursor-not-allowed' disabled={disableRadio}> Vote </Button>
            </Box>
        </FormControl>
    </>
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleSubmit(eve: React.FormEvent, votedData: DataForBackend | null,  setFeedBack: any, setDisableRadio: any, clearFeedBack: any,router:AppRouterInstance) {
    eve.preventDefault();
    if (votedData === null) {
        alert("please vote for some one");
        return
    }
    const fetchConfig = {
        method: "POST",
        body: JSON.stringify(votedData)
    }
    try {
        const res = await fetch("/api/vote", fetchConfig);
        const data = await res.json();
        if (res.ok) {

            setDisableRadio(true);
            setFeedBack({ text: data.message || "Vote successful!", type: 'success' });
            alert("congratulation you completed the vote")
            console.log(res);
            router.push("/vote/result")
        }
        if (res.status === 403) {
            // alert("❌ You have already voted ");
            const errorMessage = data.message || `Vote failed with status ${res.status}.`;
            setFeedBack({ text: errorMessage, type: 'error' });
            setDisableRadio(true); // Re-enable button on error
        }
    }
    catch (err) {
        console.log(votedData)
        console.log(err);
        setDisableRadio(false);
        setFeedBack({ text: "something went wrong", type: 'error' });
    }
    finally {
        // Schedule cleanup regardless of result
        setTimeout(clearFeedBack, GLOBAL_TIMING);
    }
}

