"use client";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormLabel,
    IconButton,
    TextField,
    Snackbar,
    Alert
} from "@mui/material";
import { useDialogBoxHandler } from "@/components/Component.Hooks/DialogBoxHandler";
import { ButtonActionType, FormUIStruct, InputTypeSType, ServerResponse } from "@/sharedUtils/CustomTypes";
import CloseIcon from "@mui/icons-material/Close";
import { HTTP_Method } from "@/sharedUtils/Enums/HTTP_Enum";
import { useForm } from "@/CustomHooks/useForm";
import {useState, useEffect, type FormEvent, useRef} from "react";
import {
    useAddCandidateMutation,
    useEditCandidateMutation
} from "@/features/RTK/Query/Admin/CandidateActions/CandidateActions";
import { CandidateSchema } from "@/Validations/DialogBoxForms/DialogBoxForm";
import {useDispatch} from "react-redux";
import {AppAPI} from "@/features/RTK/CreateAPI/DefineAppApi";
import {CandidateListEnum, RTKTagsEnum} from "@/sharedUtils/Enums/RTK_InvalidationTags";

export default function DialogBox<T extends FormUIStruct>({ fields }: { fields: T[] }) {
    const { open, title, handleClose, buttonAction, value, id } = useDialogBoxHandler();
    const dispatch = useDispatch();
    const [addCandidate, { isSuccess: addSuccess, isError: addError }] = useAddCandidateMutation();
    const [editCandidate, { isSuccess: editSuccess, isError: editError }] = useEditCandidateMutation();
    const buttonRef = useRef<ButtonActionType>(buttonAction);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const initialFormState = Object.fromEntries(fields.map((f) => [f.name, f.value ?? ""])) as Record<string, unknown>;
    const { finalFormData, handleChange: handleChangeHook, resetForm } = useForm(initialFormState);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const formMethod = buttonAction === ButtonActionType.Edit ? HTTP_Method.PUT : HTTP_Method.POST;

    useEffect(() => {
        const newState = Object.fromEntries(
            fields.map((f) => {
                const fieldValue = buttonAction === ButtonActionType.Edit ? value ?? "" : f.value ?? "";
                return [f.name, fieldValue];
            })
        );
        resetForm(newState);
        setErrors({});
    }, [fields, value, buttonAction]);

    useEffect(() => {
        if (addSuccess || editSuccess) {
            setSnackbarMessage(buttonRef.current === ButtonActionType.Edit ? "Candidate Updated!" : "Candidate Added!");
            setOpenSnackbar(true)
            // dispatch(AppAPI.util.invalidateTags([{ type: RTKTagsEnum.Candidates, id: CandidateListEnum.LIST}]));

        }
        if (addError || editError) {
            setSnackbarMessage("Something Failed.");
            setOpenSnackbar(true);
        }
    }, [addSuccess, editSuccess, addError, editError]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await CandidateSchema.validate(finalFormData, { abortEarly: false });

            const finalForm = toFormData(finalFormData);
            buttonRef.current=buttonAction

            if (buttonAction === ButtonActionType.Edit) {
                await handleFetch(buttonAction, finalForm, editCandidate, id);
            } else {
                await handleFetch(buttonAction, finalForm, addCandidate);
            }
            dispatch(AppAPI.util.invalidateTags([
                { type: RTKTagsEnum.Candidates, id: CandidateListEnum.LIST }
            ]));

            resetForm();
            handleClose();
        } catch (err: any) {
            if (err.inner) {
                const formatted: Record<string, string> = {};
                err.inner.forEach((e: any) => {
                    formatted[e.path] = e.message;
                });
                setErrors(formatted);
            }
        }
    };

    const handleChange = (name: string, value: File | string | null) => {
        handleChangeHook(name, value);
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose} className="flex justify-center items-center h-full w-full">
                <FormControl component="form" method={formMethod} onSubmit={handleSubmit} className="flex flex-col w-full p-4">
                    <DialogTitle sx={{ position: "relative", p: 3 }}>
                        {title}
                        <IconButton
                            onClick={handleClose}
                            sx={{
                                position: "absolute",
                                top: 8,
                                right: 8
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>

                    <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, height: "65%", width: "100%" }}>
                        {fields.map((field) =>
                            field.type === InputTypeSType.File ? (
                                <Button key={field.name} component="label" variant="outlined">
                                    {finalFormData[field.name] ? "Change File" : field.label}
                                    <input
                                        type="file"
                                        hidden
                                        onChange={(e) => handleChange(field.name, e.target.files?.[0] ?? null)}
                                    />
                                </Button>
                            ) : (
                                <Box
                                    key={field.name}
                                    sx={{
                                        display: "flex",
                                        flexGrow: 1,
                                        gap: 2,
                                        flexWrap: "wrap",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}
                                >
                                    <FormLabel>
                                        {field.label} <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <TextField
                                        key={field.name}
                                        value={finalFormData[field.name] ?? ""}
                                        onChange={(e) => handleChange(field.name, e.target.value)}
                                        error={!!errors[field.name]}
                                        helperText={errors[field.name]}
                                        required={field.required ?? false}
                                    />
                                </Box>
                            )
                        )}
                    </DialogContent>

                    <DialogActions>
                        <Button type="submit" variant="contained">
                            {buttonAction}
                        </Button>
                    </DialogActions>
                </FormControl>
            </Dialog>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert severity={addError || editError ? "error" : "success"} onClose={() => setOpenSnackbar(false)}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}

function toFormData(finalFormData: any) {
    const newFormData: any = new FormData();
    for (const key in finalFormData) {
        const value = finalFormData[key];
        if (value !== null && value !== undefined) {
            newFormData.append(key, value);
        }
    }
    return newFormData;
}

async function handleFetch(
    action: ButtonActionType,
    formData: Record<string, unknown>,
    mutationQuery: any,
    id: string | null = null
) {
    if (action === ButtonActionType.Edit) {
        if (!id) throw new Error("Id is mandatory,to edit candidates");
        return editCandidate(id, formData, mutationQuery);
    }
    try {
        const res: ServerResponse = await mutationQuery(formData).unwrap();
        console.log(res);
    } catch (err) {
        console.error(err);
    }
}

async function editCandidate(id: string, formData: Record<string, unknown>, mutationQuery: any) {
    try {
        const res: ServerResponse = await mutationQuery({ id, formData }).unwrap();
        console.log("Id :", id);
        console.log(res);
    } catch (err) {
        console.error(err);
    }
}
