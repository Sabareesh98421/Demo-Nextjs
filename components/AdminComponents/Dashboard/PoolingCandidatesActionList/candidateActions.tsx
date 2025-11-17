"use client";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import {useTheme} from "@mui/material";
import {addCandidates, useDialogBoxHandler} from "@/components/Component.Hooks/DialogBoxHandler";
import DialogBox from "@/components/DialogBox/DialogBox";

interface FrameworkRow {
    frameWork: string;
    image?: string;
}

export default function CandidatesActionList({ frameworks }: { frameworks: FrameworkRow[] }) {
    const theme = useTheme();
    const {handleOpenDialog}=useDialogBoxHandler()
    const handleAddCandidate=()=>{
        handleOpenDialog(addCandidates)
    }
    const handleDelete = (frameworkName: string) => {
        console.log("DELETE →", frameworkName);
    };

    return (
        <Paper sx={{ width: "100%", mt: 4, p: 3 }}>
            <Box className="flex justify-between items-center  " sx={{
                bgcolor:theme.palette.background.default,
                p:2,

            }} >
                <Typography  variant="h2" sx={{fontSize:16,fontWeight:"Bold"}}>Candidates List</Typography>

                <Button
                    variant="contained"
                    startIcon={<AddRoundedIcon />}
                    onClick={() => handleAddCandidate() }
                >
                    Add Candidate
                </Button>
                <DialogBox></DialogBox>
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Logo</TableCell>
                            <TableCell>Framework</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {frameworks.map((candidate) => (
                            <TableRow key={candidate.frameWork}>
                                {candidate.image && (<TableCell>

                                    <Image
                                        src={`/${candidate.image}.png`}
                                        alt={candidate.frameWork}
                                        width={40}
                                        height={40}
                                        unoptimized
                                    />
                                </TableCell>)}

                                <TableCell>{candidate.frameWork}</TableCell>

                                <TableCell align="right">
                                    <IconButton color="primary">
                                        <EditIcon />
                                    </IconButton>

                                    <IconButton
                                        color="error"
                                        onClick={() => handleDelete(candidate.frameWork)}
                                    >
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Paper>
    );
}
