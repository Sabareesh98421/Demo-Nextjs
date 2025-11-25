"use client"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import InfoRoundedIcon from "@mui/icons-material/InfoRounded"
import Image from "next/image"

interface CandidateListProps {
    name: string
    img: string
    pros: string[]
    cons: string[]
    expanded: boolean
    onClick: () => void
}

interface DetailsProps {
    title: string
    detailsArray: string[]
    color: string
}

export default function CandidateList({
                                          name,
                                          img,
                                          pros,
                                          cons,
                                          expanded,
                                          onClick,
                                      }: CandidateListProps) {
    return (
        <Stack
            direction="row"
            onClick={onClick}
            sx={{
                height: expanded ? "28rem" : "26rem",
                width: "100%",
                boxShadow: 3,
                borderRadius: "1rem",
                overflow: "hidden",
                position: "relative",
                backdropFilter: "blur(8px)",
                cursor: "pointer",
                transition: "height 0.3s ease, width 0.35s ease",
                "&:hover": { boxShadow: 6 }
            }}
        >
            <InfoRoundedIcon
                sx={{
                    position: "absolute",
                    top: 10,
                    right: 15,
                    opacity: expanded ? 0 : 0.75,
                    transition: "opacity 0.2s ease",
                    zIndex: 20
                }}
            />

            <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                    width: expanded ? "45%" : "100%",
                    minWidth: expanded ? "260px" : "100%",
                    transition: "width 0.35s ease"
                }}
            >
                <Image
                    src={img}
                    alt={name}
                    width={190}
                    height={190}
                    style={{ objectFit: "contain" }}
                    unoptimized
                />
                <Typography variant="h5" textAlign="center" mt={2}>
                    {name}
                </Typography>
            </Stack>

            <Box
                sx={{
                    width: expanded ? "55%" : "0%",
                    opacity: expanded ? 1 : 0,
                    transition: "width 0.35s ease, opacity 0.25s ease",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                {expanded && (
                    <Stack direction="row" spacing={4}>
                        <Details title="Pros" color="success.main" detailsArray={pros} />
                        <Details title="Cons" color="error.main" detailsArray={cons} />
                    </Stack>
                )}
            </Box>
        </Stack>
    )
}

function Details({ title, detailsArray, color }: DetailsProps) {
    return (
        <Stack>
            <Typography variant="subtitle1" fontWeight={700} color={color}>
                {title}
            </Typography>
            <List dense>
                {detailsArray.map((p) => (
                    <ListItem key={p}>{p}</ListItem>
                ))}
            </List>
        </Stack>
    )
}
