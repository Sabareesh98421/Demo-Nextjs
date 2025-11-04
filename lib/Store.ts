// store.ts
import {configureStore} from "@reduxjs/toolkit";
import countSlicer from "@/features/CounterSlice/counterSlice";


export function demoStore(){
    return configureStore({
        reducer:
            {
                counter:countSlicer,
                // userData:userSlicer
            }
    })
}

export type Appstore = ReturnType<typeof  demoStore>;
export type RootState = ReturnType<Appstore['getState']>;
export type AppDispatch = Appstore["dispatch"]