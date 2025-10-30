"use client"
// ./result/page.tsx

import Link from "next/link";
import { useEffect, useState } from "react";
type ResponseData = Record<string, number>;
export default function Result() {
    const [results, setResults] = useState<ResponseData | null>(null);

    // Derived State: True if we haven't successfully fetched anything yet
    const isLoading = results === null;
    useEffect(() => {
        getResults(setResults)
    }, [])
    return (
        <div className="p-8 max-w-lg mx-auto bg-white shadow-xl rounded-lg text-black">
            <h1 className="text-3xl font-bold mb-6 text-center border-b pb-2">🗳️ Poll Results</h1>

            {/* 1. LOADING STATE */}
            {isLoading && (
                <p className="text-lg text-gray-600">Loading current vote counts...</p>
            )}

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
                    🔙 Go back to the main page
                </Link>
            </div>
        </div>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getResults(setResults: any) {
    try {
        const res = await fetch("/api/result");
        if (!res.ok) {
            console.error("Failed to fetch results. Status:", res.status);

            return;
        }

        // CRITICAL FIX: Await the res.json() call
        const data: ResponseData = await res.json();
        console.log(data);

        // Store the data and stop loading state
        setResults(data);
    }
    catch (err) {
        console.error(err)
        setResults({} as ResponseData)
    }
}