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
import { useTheme, Snackbar, Alert } from "@mui/material";
import { addCandidates, DialogFormFields, editCandidateDialog, useDialogBoxHandler } from "@/components/Component.Hooks/DialogBoxHandler";
import DialogBox from "@/components/DialogBox/DialogBox";
import { DialogFormStruct, DialogGlobalState, Framework } from "@/sharedUtils/CustomTypes";
import { useState, useEffect } from "react";
import { useDeleteCandidateMutation } from "@/features/RTK/Query/Admin/DeleteCandidate/DeleteCandidate";

const fields = DialogFormFields;

export default function CandidatesActionList({ frameworks }: { frameworks: Framework[] }) {
    const theme = useTheme();
    const [deleteCandidate, { isSuccess, isError, isLoading }] = useDeleteCandidateMutation();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const { handleOpenDialog } = useDialogBoxHandler<DialogFormStruct>();

    const handleAddCandidate = () => {
        handleOpenDialog(addCandidates);
    };

    const handleDelete = async (candidateId: string) => {
        try {
            await deleteCandidate(candidateId).unwrap();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditCandidate = (frameWorkName: string, candidateId: string) => {
        const editFramework: DialogGlobalState = editCandidateDialog(frameWorkName, candidateId);
        handleOpenDialog(editFramework);
    };

    useEffect(() => {
        if (isSuccess) {
            setSnackbarMessage("Candidate Deleted Successfully!");
            setOpenSnackbar(true);
        }
        if (isError) {
            setSnackbarMessage("Failed to Delete Candidate.");
            setOpenSnackbar(true);
        }
    }, [isSuccess, isError]);

    return (
        <>
            <Paper sx={{ width: "100%", mt: 4, p: 3 }}>
                <Box
                    className="flex justify-between items-center"
                    sx={{ bgcolor: theme.palette.background.default, p: 2 }}
                >
                    <Typography variant="h2" sx={{ fontSize: 16, fontWeight: "Bold" }}>
                        Candidates List
                    </Typography>

                    <Button
                        variant="contained"
                        startIcon={<AddRoundedIcon />}
                        onClick={handleAddCandidate}
                    >
                        Add Candidate
                    </Button>

                    <DialogBox fields={fields()} />
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
                                <TableRow key={candidate.name}>
                                    {candidate.logo && (
                                        <TableCell>
                                            <Image
                                                src={`${candidate.logo}`}
                                                alt={candidate.name}
                                                width={40}
                                                height={40}
                                                unoptimized
                                            />
                                        </TableCell>
                                    )}

                                    <TableCell>{candidate.name}</TableCell>

                                    <TableCell align="right">
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleEditCandidate(candidate.name, candidate.id)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            color="error"
                                            onClick={() => handleDelete(candidate.id)}
                                            disabled={isLoading}
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

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    severity={isError ? "error" : "success"}
                    onClose={() => setOpenSnackbar(false)}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}
