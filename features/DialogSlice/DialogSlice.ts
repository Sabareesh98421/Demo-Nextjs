import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ButtonActionType} from "@/sharedUtils/CustomTypes";

interface DialogSlice{
    open:boolean;
    title:string;
    buttonAction:ButtonActionType
}
interface OpenDialogPayload {
    title: string;
    buttonAction:ButtonActionType;
}
const initialState: DialogSlice = {
    open:false,
    title:"",
    buttonAction:ButtonActionType.Add
}
const DialogBoxSlice = createSlice({
    name:"DialogBox",
    initialState,
    reducers:{
        openDialog(state:any, action:PayloadAction<OpenDialogPayload>){
            state.open = true;
            state.title = action.payload.title;
            state.buttonAction = action.payload.buttonAction;
        },
        closeDialog(state:any){
            Object.assign(state,initialState);
        },

    }
    }
);
export const { openDialog, closeDialog } =   DialogBoxSlice.actions;
export default DialogBoxSlice.reducer;

