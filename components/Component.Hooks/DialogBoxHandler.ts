"use client";
import {useAppDispatch, useAppSelector} from "@/CustomHooks/ReduxHooks/Selector";
import {closeDialog, openDialog} from "@/features/DialogSlice/DialogSlice";
import {ButtonActionType, DialogGlobalState, InputTypeSType,} from "@/sharedUtils/CustomTypes";

export const addCandidates:DialogGlobalState ={
    title: "Add Framework",
    buttonAction: ButtonActionType.Add
}
export function editCandidateDialog(frameWorkName:string,candidateId:string):DialogGlobalState{
    return {
        title: "Edit Framework",
        buttonAction: ButtonActionType.Edit,
        value:frameWorkName,
        id:candidateId
    }
}

export function DialogFormFields(frameWorkName:string|null =null){
    if(!frameWorkName)
    {
        return [
                {name: "name", label: "Framework Name", id:"frameworkInput",type: InputTypeSType.Text},
                {name: "logo", label: "Upload", id:"CandidateFileUploadInput",type: InputTypeSType.File}
            ]

    }
    return [
            {name: "name", label: "Framework Name",id:"frameworkInput", type: InputTypeSType.Text, value: frameWorkName},
            {name: "logo", label: "Upload", id:"CandidateFileUploadInput",type: InputTypeSType.File}
        ]

}
export function useDialogBoxHandler<T extends Record<string, unknown>>() {
    const dispatch = useAppDispatch();
    const { open, title,  buttonAction,value,id } = useAppSelector((state) => state.DialogBox);

    function handleOpenDialog(data:DialogGlobalState):void {
        dispatch(
            openDialog({
                title: data.title,
                buttonAction: data.buttonAction,
                value:data.value,
                id:data.id,
            })
        );
    }



    const handleClose = () => dispatch(closeDialog());

    return {
        open,
        title,
        buttonAction,
        value,
        id,
        handleClose,
        handleOpenDialog
    };
}
