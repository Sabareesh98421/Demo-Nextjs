"use client"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import { useState } from "react"
import CandidateList from "@/components/candidatesList"
import { candidates } from "@/app/Candidates/_candidateList"

export default function Candidates() {
    const [isDetailedOpened, setDetailedOpen] = useState<number | null>(null)

    return (
        <Stack direction="column" sx={{ width: "100%", py: 4 }}>
            <Typography
                component="h1"
                width="100%"
                textAlign="center"
                mb={5}
                fontSize={24}
                fontWeight={600}
            >
                Polling Details
            </Typography>

            <Stack
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
                flexWrap="wrap"
                columnGap={4}
                rowGap={5}
                sx={{ width: "100%" }}
            >
                {candidates.map((candidate, i) => {
                    const expanded = isDetailedOpened === i

                    return (
                        <Stack
                            key={candidate.name}
                            sx={{
                                width: expanded
                                    ? "100%"          // full width on expand
                                    : {
                                        xs: "100%",    // 1 card per row on phones
                                        sm: "48%",     // 2 per row on tablets
                                        md: "23%",     // 4 per row on desktops (mandatory)
                                    },
                                transition: "width 0.35s ease",
                            }}
                        >
                            <CandidateList
                                {...candidate}
                                expanded={expanded}
                                onClick={() =>
                                    setDetailedOpen(expanded ? null : i)
                                }
                            />
                        </Stack>
                    )
                })}
            </Stack>
        </Stack>
    )
}
