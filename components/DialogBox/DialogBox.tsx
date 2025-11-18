"use client";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, IconButton, FormControl,Box,FormLabel } from "@mui/material";
import {useDialogBoxHandler} from "@/components/Component.Hooks/DialogBoxHandler";
import { InputTypeSType,FormUIStruct} from "@/sharedUtils/CustomTypes";
import CloseIcon from '@mui/icons-material/Close';
import {HTTP_Method} from "@/serverUtils/Enums/HTTP_Enum";
import {useForm} from "@/CustomHooks/useForm";

export default function DialogBox<T extends FormUIStruct>({fields}:{fields:T[]}) {
    const { open, title, handleClose,buttonAction } = useDialogBoxHandler();
    // const {} = useForm();
    const handleSubmit=()=>{};
    const handleChange=(name:string,value:File|string|null)=>{};
    return (
        <Dialog open={open} onClose={handleClose}  className="flex justify-center items-center h-full w-full">
            <FormControl component="form" method={HTTP_Method.POST} onSubmit={handleSubmit}  className="flex flex-col w-full p-4" >
                <DialogTitle sx={{ position: "relative", p: 3 }}>
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
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 ,height:"65%" ,width:"100%"}}>
                    {fields.map(field =>
                        field.type === InputTypeSType.File ? (
                            <Button key={field.name} component="label" variant="outlined">
                                { field.name ? "Change File" : field.label}
                                <input
                                    type="file"
                                    hidden
                                    onChange={(e) =>
                                        handleChange(field.name, e.target.files?.[0] ?? null)
                                    }
                                />
                            </Button>
                        ) : (

                            <Box key={field.name} sx={{ display:"flex",flexGrow: 1 ,gap:2,flexWrap:"wrap",justifyContent: "space-between" ,alignItems:"center"}}>
                                <FormLabel>
                                    {field.label} <span className="text-red-500">*</span>
                                </FormLabel>
                                <TextField
                                key={field.name}
                                // value=""//{field.name}
                                onChange={(e) => handleChange(field.name, e.target.value)}
                                required={field.required ?? false}
                            /></Box>
                        )
                    )}

                </DialogContent>

                <DialogActions>
                    <Button type="submit" variant="contained">{buttonAction}</Button>
                </DialogActions>
            </FormControl>
        </Dialog>
    );
}
