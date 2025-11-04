"use client"
// reduxStoreProvider.tsx
import {Provider}from "react-redux";
import {demoStore} from "@/lib/Store";
import React, {useRef} from "react";


export default function ReduxStoreProvider({children} : {children: React.ReactNode})
{
    const storeRef = useRef<ReturnType<typeof demoStore>|null>(null);
    if(storeRef.current==null){
        storeRef.current = demoStore();
    }
    return(
        // eslint-disable-next-line react-hooks/refs
        <Provider store={storeRef.current}>
            {children }
        </Provider>
    )
}