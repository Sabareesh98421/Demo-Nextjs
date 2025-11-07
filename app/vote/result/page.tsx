"use client"
// ./result/page.tsx
import Link from "next/link";
import {useGetVoteResultsQuery} from "@/features/RTK/Query/vote/Result/PoolingResultApi";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";



export default function Result() {

    const {data:results,error,isLoading} = useGetVoteResultsQuery();
    if(error){
        return (
            <p className="text-red-500 text-center mt-10">
                Failed to load results. Please try again later.
            </p>
        );
    }
    return (
        <div className="p-8 max-w-lg mx-auto bg-white shadow-xl rounded-lg text-black">

            <h1 className="text-3xl font-bold mb-6 text-center border-b pb-2">🗳️ Poll Results</h1>

            {/* 1. LOADING STATE */}
            {isLoading && (
                <Box component="div" className="text-lg text-gray-600 flex justify-evenly items-center gap-5">
                    <Typography>
                    Loading current vote counts...
                    </Typography>
                    <CircularProgress size={25}/>
                    {/*<LinearProgress/>*/}
                </Box>
            )}
            {/*<Loading></Loading>*/}

            {/* 3. RESULTS DISPLAY: If results is NOT null and contains data */}
            {results && Object.keys(results).length > 0 && (
                <div className="space-y-4">
                    {Object.entries(results)
                        // Explicit Type for sort parameters: [framework: string, count: number]
                        .sort((entryA: [string, number], entryB: [string, number]) => {
                            // Extract count from the entry arrays
                            const [, countA] = entryA;
                            const [, countB] = entryB;

                            // Sort logic: descending order (highest count first)
                            return countB - countA;
                        })
                        // Explicit Type for map parameters: [framework: string, count: number]
                        .map(([framework, count]: [string, number]) => (
                            <div key={framework} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                                <span className="text-xl font-semibold">{framework}</span>
                                <span className="text-2xl font-extrabold text-blue-600">{count}</span>
                            </div>
                        ))}
                </div>
            )}

            <div className="mt-8 text-center">
                <Link href="/" className="text-blue-500 hover:text-blue-700 underline">
                    Go back to the main page
                </Link>
            </div>
        </div>
    );
}
