"use client";
import { useAppDispatch, useAppSelector } from "@/CustomHooks/ReduxHooks/Selector";
import { openDialog, updateDialogForm, closeDialog } from "@/features/DialogSlice/DialogSlice";
import {ButtonActionType, FormStruct} from "@/sharedUtils/CustomTypes";
/*
* Dummy data
*
*
*/
export const addCandidates:FormStruct<any> ={
    title: "Add Framework",
    form: { frameWork: "", image: null },
    fields: [
        { name: "frameWork", label: "Framework Name", type: "text" },
        { name: "image", label: "Logo", type: "file" }
    ],
    ButtonAction: ButtonActionType.Add
}
export function useDialogBoxHandler<T extends Record<string, unknown>>() {
    const dispatch = useAppDispatch();
    const { open, title, form, fields, buttonAction } =
        useAppSelector((state) => state.DialogBox);

    function handleOpenDialog(data: FormStruct<T>) {
        dispatch(
            openDialog({
                title: data.title,
                form: data.form,
                fields: data.fields,
                buttonAction: data.ButtonAction
            })
        );
    }

    const handleChange = (key: string, value: unknown) => {
        dispatch(updateDialogForm({ [key]: value } as Partial<T>));
    };

    const handleClose = () => dispatch(closeDialog());

    const handleSubmit = () => {
        console.log("SUBMIT => ", form);
        handleClose();
    };

    return {
        open,
        title,
        form,
        fields,
        buttonAction,
        handleOpenDialog,
        handleChange,
        handleClose,
        handleSubmit
    };
}
