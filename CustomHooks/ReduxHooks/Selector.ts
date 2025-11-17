import { useDispatch, useSelector } from "react-redux";
import {AppDispatch} from "@/lib/Store";


export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector = <T>(selector: (state: any) => T): T =>
    useSelector(selector);
