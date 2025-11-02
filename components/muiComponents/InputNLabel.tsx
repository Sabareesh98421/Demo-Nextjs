"use client"
import { IInputProps, TInpValue } from "@/sharedUtils/CustomTypes";
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel";
import { checkPassword } from "../utils/input.utils";
import TextField from "@mui/material/TextField";
import { useState, FocusEvent } from "react";
// InputNLabel.tsx
export default function InputNLabelMui({ type: inpType, id, cls, name, value, getInpValueOnBlur }: | IInputProps) {
    const [errors, setErrors] = useState<string[]>([])
    const handleBlur = (eve: FocusEvent) => {
        const target: HTMLInputElement = eve.target as HTMLInputElement;

        if (inpType === "password") {
            const error: null | string[] = checkPassword(target.value);
            setErrors(error ?? []);
        }
        valueHandler(target, getInpValueOnBlur);
    }

    return (
        <Box sx={{ color: "white" }}>
            {/* <InputLabel htmlFor="Email" sx={{ color: "white" }} >Email</InputLabel> */}
            <TextField
                type={inpType}
                id={id}
                name={name}
                value={value}
                onBlur={handleBlur}
                autoComplete="false"
                label="Email"
                variant="filled"
                color="primary"
            />
            {errors.length > 0 && (
                <ul className="text-sm mt-2 list-disc list-inside text-red-500">
                    {errors.map((err, index) => (
                        <li key={index}>{err}</li>
                    ))}
                </ul>
            )}
        </Box>
    )

}
function valueHandler(target: HTMLInputElement, getInpValueOnBlur: (inpValue: TInpValue | null) => void) {
    if (!(typeof getInpValueOnBlur === "function")) throw new TypeError(`The getInpValueOnBlur must be an function, but found ${typeof getInpValueOnBlur}`);
    const inpValue = target.value
    const inpName = target.name
    getInpValueOnBlur({ name: inpName, value: inpValue })
}