// store.ts
import {configureStore} from "@reduxjs/toolkit";
import countSlicer from "@/features/CounterSlice/counterSlice";
import RegisterUserSlice from "@/features/userSlice/Register/RegisterUser";
import {AppAPI} from "@/features/RTK/CreateAPI/DefineAppApi";
import DialogSlice from "@/features/DialogSlice/DialogSlice";


export function demoStore(){
    return configureStore({
        reducer:
            {
                [AppAPI.reducerPath]:AppAPI.reducer,
                counter:countSlicer,
                Register:RegisterUserSlice,
                DialogBox:DialogSlice
                // userData:userSlicer
            },
        middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(AppAPI.middleware)
    })
}

export type Appstore = ReturnType<typeof  demoStore>;
export type RootState = ReturnType<Appstore['getState']>;
export type AppDispatch = Appstore["dispatch"]