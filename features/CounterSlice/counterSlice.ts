// counterSlice.ts
import {createSlice} from "@reduxjs/toolkit";
interface CounterState {
    value: number;
}
const initialState: CounterState = { value: 0 };

const countSlicer=createSlice({
    name:"counter",
    initialState,
    reducers:{
        increment(state){
            state.value++
        },
        decrement(state){
            if(state.value>0)   state.value--;
        },
        reset(){
            return initialState
        }
    }
})
export const {increment,decrement,reset} = countSlicer.actions;
export default countSlicer.reducer