"use client"
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type DataForBackend = {
    frameWork: string,
    email: string
}
// page.tsx
export default function Vote() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) router.push("/signIn")
    }, [router]);


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
        handleSubmit(eve, votedData, setUserVoted)
        setDisableRadio(true)
    }
    const handleLogout = () => {
        localStorage.clear();
        router.push("/signIn")

    }
    return <>

        <form className='h-fit w-fit flex justify-center items-center outline-1 outline-white shadow-lg shadow-gray-200  ' onSubmit={handleSubmitWrapper}>
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
async function handleSubmit(eve: React.FormEvent, votedData: DataForBackend | null, setUserVoted: any) {
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
        await res.json();
        if (res.ok) {
            setUserVoted(true);
            alert("congratulation you completed the vote")
            console.log(res);

        }
        if (res.status === 403) {
            alert("❌ You have already voted ")
        }
    }
    catch (err) {
        console.log(votedData)
        console.log(err)
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
                        bgColor = isSelected ? `${colors[index]} ` : 'bg-gray-200 ';
                        console.log(colors[index])
                    }
                    if (bgColor === "bg-zinc-800 ") {
                        textColor = "text-white ";
                    }
                    else {
                        textColor = "text-black "
                    }
                    const cursorStyle = disableRadio ? 'cursor-not-allowed ' : 'cursor-pointer ';

                    return <li key={index} className="">

                        <section className={'h-16 w-fit p-5 flex justify-center items-center ' + textColor + bgColor + cursorStyle}>
                            <section className='h-fit w-fit flex justify-center items-center '>
                                <input type="radio" name="frameWork" id={frameWork} className='hidden peer' value={frameWork} onChange={handleChangeWrapper}
                                    checked={selectedFW === frameWork} disabled={disableRadio} />
                                <Image src={`/${frameWork}.${imgType[index]}`}
                                    alt={`${frameWork}Icon`}
                                    width={40}
                                    height={40}

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