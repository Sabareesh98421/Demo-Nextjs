"use client"
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useSelector,useDispatch} from "react-redux";
import {AppDispatch, RootState} from "@/lib/Store";
import {decrement, increment,reset} from "@/features/CounterSlice/counterSlice";

// counter/page
export default function CounterButton(){

    const dispatch:AppDispatch = useDispatch();

    const count = useSelector((state:RootState) =>state.counter.value )

    return(
        <Box component="section"  className=" flex flex-2  justify-around items-center gap-8 flex-col">

            <Box component="div" className=" flex flex-2  justify-around items-center gap-8">
                <Button variant="contained" onClick={()=>{dispatch(decrement())}}>-</Button>
                    {count}
                <Button variant="contained" onClick={()=>{dispatch(increment())}}>+</Button>
            </Box>
            <Button variant="contained" onClick={()=>{dispatch(reset())}}> Reset </Button>
        </Box>
    )
}