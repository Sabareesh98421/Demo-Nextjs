// store.ts
import {configureStore} from "@reduxjs/toolkit";
import countSlicer from "@/features/CounterSlice/counterSlice";
import {pollingResultsAPI} from "@/features/RTK/Query/vote/Result/PoolingResultApi";
import RegisterUserSlice from "@/features/userSlice/Register/RegisterUser";

export function demoStore(){
    return configureStore({
        reducer:
            {
                [pollingResultsAPI.reducerPath]:pollingResultsAPI.reducer,
                counter:countSlicer,
                Register:RegisterUserSlice
                // userData:userSlicer
            },
        middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(pollingResultsAPI.middleware)
    })
}

export type Appstore = ReturnType<typeof  demoStore>;
export type RootState = ReturnType<Appstore['getState']>;
export type AppDispatch = Appstore["dispatch"]