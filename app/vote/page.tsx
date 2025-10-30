"use client"
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type DataForBackend = {
    frameWork: string,
    email: string
}
type FeedbackType = { text: string, type: 'success' | 'error' } | null
// page.tsx

const GLOBAL_TIMING = 3000;
export default function Vote() {
    const router = useRouter();
    const [feedback, setFeedBack] = useState<FeedbackType>(null);
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) router.push("/signIn")
    }, [router]);

    const clearFeedback = useCallback(() => {
        setFeedBack(null);
    }, []);

    const perfectFrameWork = ["Angular", "Next", "Nuxt"];
    const [votedData, setVotedData] = useState<DataForBackend | null>(null);
    const [disableRadio, setDisableRadio] = useState(false);
    const [isUserVoted, setUserVoted] = useState(false);
    // Function passed to the child to receive the data
    const userVoteReceiver = useCallback((data: DataForBackend | null) => {
        setVotedData(data); // Update the state when the child calls this function
    }, [])
    const handleSubmitWrapper = (eve: React.FormEvent) => {
        alert(`You voted for "${votedData?.frameWork}"`)
        handleSubmit(eve, votedData, setUserVoted, setFeedBack, setDisableRadio, clearFeedback)
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
        <form className='h-fit w-fit flex justify-center items-center  bg-white text-black shadow-md shadow-gray-200  ' onSubmit={handleSubmitWrapper}>
            <section className='h-fit w-fit p-5  flex flex-col justify-evenly items-center select-none cursor-default gap-5'>
                <section className="nav h-fit w-full p-5 border-b-2 border-gray-300   flex justify-between items-center select-none cursor-default">
                    <span className='self-start text-3xl  w-1/2 h-fit ' >
                        <Link href="/">
                            🔙
                        </Link>
                    </span>
                    {
                        isUserVoted &&
                        <span className='self-end text-xl w-1/2  h-fit  text-right' >
                            <Link href="/vote/result">
                                <p>Result</p>
                            </Link>
                        </span>
                    }
                    <span onClick={handleLogout}>Logout</span>
                </section>
                <p>Please Vote For The Listed Candidates Below</p>
                <PollingList frameWorks={perfectFrameWork} getVote={userVoteReceiver} disableRadio={disableRadio} />
                {/* I share the same state of the disable button */}
                <button className='bg-blue-600 h-12 w-16 m-5 p-2 text-center cursor-default disabled:bg-gray-500 disabled:cursor-not-allowed' disabled={disableRadio}>   Vote </button>
            </section>
        </form>
    </>
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleSubmit(eve: React.FormEvent, votedData: DataForBackend | null, setUserVoted: any, setFeedBack: any, setDisableRadio: any, clearFeedBack: any) {
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
            setUserVoted(true);
            setDisableRadio(true);
            setFeedBack({ text: data.message || "Vote successful!", type: 'success' });
            alert("congratulation you completed the vote")
            console.log(res);

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

function PollingList({ frameWorks, getVote, disableRadio }: { disableRadio: boolean, frameWorks: string[], getVote: (userVote: DataForBackend) => void }) {
    const [selectedFW, setFW] = useState<string | null>(null);
    const [userEmail] = useState<string | null>(() => {
        // This check ensures we only access localStorage in the browser environment.
        if (typeof window !== 'undefined') {
            return localStorage.getItem("userEmail");
        }
        return null; // Return null if running on the server
    });
    const colors = ["bg-red-400", "bg-zinc-800", "bg-green-800"];
    const imgType = ["png", "png", "svg"];
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
        <ul className='w-full h-full flex justify-center items-center gap-5'>
            {frameWorks.map(
                (frameWork, index) => {

                    const isSelected = selectedFW === frameWork;
                    let bgColor;
                    let textColor = "text-black ";
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
                    const cursorStyle = disableRadio ? 'cursor-not-allowed ' : 'cursor-pointer ';


                    return <li key={index} className="">
                        <section className={'h-16 w-fit p-5 flex justify-center items-center border-2 disabled:opacity-25 border-black ' + textColor + bgColor + cursorStyle}>
                            <section className='h-fit w-full flex justify-center items-center '>
                                <input type="radio" name="frameWork" id={frameWork} className='hidden disabled:opacity-25' value={frameWork} onChange={handleChangeWrapper}
                                    checked={selectedFW === frameWork} disabled={disableRadio} />
                                <Image src={`/${frameWork}.${imgType[index]}`}
                                    alt={`${frameWork}Icon`}
                                    width={40}
                                    height={40}
                                    className={invertImageColor}
                                />
                                <label htmlFor={frameWork} className={`h-full w-full p-5 `}>{frameWork}</label>
                            </section>
                        </section>
                    </li>
                }
            )}
        </ul>
    )

}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleVoteClick(eve: React.ChangeEvent, setFw: any) {
    const target: EventTarget = eve.currentTarget;
    const value: string = (target as HTMLInputElement).value;
    setFw(value)
}