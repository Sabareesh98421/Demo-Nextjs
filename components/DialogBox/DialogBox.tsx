"use client";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, IconButton } from "@mui/material";
import {useDialogBoxHandler} from "@/components/Component.Hooks/DialogBoxHandler";
import { InputTypeSTypeChecker } from "@/sharedUtils/CustomTypes";
import CloseIcon from '@mui/icons-material/Close';

export default function DialogBox() {
    const { open, title, form,fields, handleChange, handleClose, handleSubmit,buttonAction } = useDialogBoxHandler();

    return (
        <Dialog open={open} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <DialogTitle sx={{ position: "relative", pr: 5 }}>
                    {title}


                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {fields.map(field =>
                        field.type === InputTypeSTypeChecker.File ? (
                            <Button key={field.name} component="label" variant="outlined">
                                {form?.[field.name] ? "Change File" : field.label}
                                <input
                                    type="file"
                                    hidden
                                    onChange={(e) =>
                                        handleChange(field.name, e.target.files?.[0] ?? null)
                                    }
                                />
                            </Button>
                        ) : (
                            <TextField
                                key={field.name}
                                label={field.label}
                                value={(form?.[field.name] as string) ?? ""}
                                onChange={(e) => handleChange(field.name, e.target.value)}
                                required={field.required ?? false}
                            />
                        )
                    )}

                </DialogContent>

                <DialogActions>
                    <Button type="submit" variant="contained">{buttonAction}</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
