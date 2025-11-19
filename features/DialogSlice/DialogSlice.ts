import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ButtonActionType} from "@/sharedUtils/CustomTypes";

interface DialogSlice{
    open:boolean;
    title:string;
    buttonAction:ButtonActionType;
    value?:string|null;
    id?:string|null
}
interface OpenDialogPayload {
    title: string;
    buttonAction:ButtonActionType;
    value?:string|null;
    id?:string|null
}
const initialState: DialogSlice = {
    open:false,
    title:"",
    buttonAction:ButtonActionType.Add,
    value:"",
    id:"",
}
const DialogBoxSlice = createSlice({
    name:"DialogBox",
    initialState,
    reducers:{
        openDialog(state:any, action:PayloadAction<OpenDialogPayload>){
            state.open = true;
            state.title = action.payload.title;
            state.buttonAction = action.payload.buttonAction;
            state.value = state.buttonAction===ButtonActionType.Edit?action.payload.value:null;
            state.id=state.buttonAction===ButtonActionType.Edit?action.payload.id:null;
        },
        closeDialog(state:any){
            Object.assign(state,initialState);
        },

    }
    }
);
export const { openDialog, closeDialog } =   DialogBoxSlice.actions;
export default DialogBoxSlice.reducer;

