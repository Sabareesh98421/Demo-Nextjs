import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ButtonActionType, FormField} from "@/sharedUtils/CustomTypes";

interface DialogSlice<T extends  Record<string, unknown>>{
    open:boolean;
    title:string;
    form?:T|null;
    fields:FormField[];
    buttonAction:ButtonActionType
}
interface OpenDialogPayload<T> {
    title: string;
    form?: T | null;
    fields: FormField[];
    buttonAction:ButtonActionType;
}
const initialState: DialogSlice<any> = {
    open:false,
    title:"",
    form:null,
    fields:[],
    buttonAction:ButtonActionType.Add
}
const DialogBoxSlice = createSlice({
    name:"DialogBox",
    initialState,
    reducers:{
        openDialog<T extends Record<string, unknown>>(state:any, action:PayloadAction<OpenDialogPayload<T>>){
            state.open = true;
            state.title = action.payload.title;
            state.form = action.payload.form?? {};
            state.fields = action.payload.fields;
            state.buttonAction = action.payload.buttonAction;

        },
        closeDialog(state:any){
            Object.assign(state,initialState);
        },
        updateDialogForm<T extends Record<string, unknown>>(state:any,action:PayloadAction<Partial<T>>){
            state.form={...(state.form||{}),...action.payload};
        }
    }
    }
)
export const {openDialog, closeDialog,updateDialogForm} = DialogBoxSlice.actions;
export default DialogBoxSlice.reducer;


