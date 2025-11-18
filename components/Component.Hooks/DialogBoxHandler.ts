"use client";
import { useAppDispatch, useAppSelector } from "@/CustomHooks/ReduxHooks/Selector";
import {openDialog, closeDialog} from "@/features/DialogSlice/DialogSlice";
import {ButtonActionType, DialogGlobalState, } from "@/sharedUtils/CustomTypes";

export const addCandidates:DialogGlobalState ={
    title: "Add Framework",
    buttonAction: ButtonActionType.Add
}
export function editCandidateDialog():DialogGlobalState{
    return {
        title: "Edit Framework",
        buttonAction: ButtonActionType.Edit
    }
}
function DialogFormStruct(frameWorkName:string){
    return {
        form: {
            frameWork: frameWorkName, image:null
        }
    ,
        fields: [
            {name: "frameWork", label: "Framework Name", type: "text", value: frameWorkName},
            {name: "image", label: "Logo", type: "file"}
        ]
    }
}
export function useDialogBoxHandler<T extends Record<string, unknown>>() {
    const dispatch = useAppDispatch();
    const { open, title,  buttonAction } = useAppSelector((state) => state.DialogBox);

    function handleOpenDialog(data:DialogGlobalState):void {
        dispatch(
            openDialog({
                title: data.title,
                buttonAction: data.buttonAction
            })
        );
    }



    const handleClose = () => dispatch(closeDialog());

    return {
        open,
        title,
        buttonAction,
        handleClose,
        handleOpenDialog
    };
}
