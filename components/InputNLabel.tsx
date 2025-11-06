// InputNLabel.tsx
"use client";
import { FocusEvent, useState } from "react"
import { checkPassword } from "./utils/input.utils";
import { IInputProps, TInpValue } from "@/sharedUtils/CustomTypes";


export function InputNLabel({ id, cls, name: htmlName, type: inpType, value: htmlValue, getInpValueOnBlur }: IInputProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
        if (inpType === "password") {
            const error: null | string[] = checkPassword(event.target.value);
            setErrors(error ?? []);
        }
        valueHandler(event, getInpValueOnBlur);
    }

    cls = cls ? cls : "";
    return (
        <>
            <section className="form-field-wrapper flex flex-col md:flex-row justify-between items-center">
                <label htmlFor={id}>{htmlName}</label>
                <input id={id}
                    type={showPassword && inpType === "password" ? "text" : inpType}
                    className={" border-[0.2px] p-1 pl-2 rounded-sm " + cls} name={htmlName} value={htmlValue} onBlur={handleBlur} />
                <span>
                    {inpType === "password" && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="relative text-sm "
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    )}
                </span>
            </section>
            {errors.length > 0 && (
                <ul className="text-sm mt-2 list-disc list-inside text-red-500">
                    {errors.map((err, index) => (
                        <li key={index}>{err}</li>
                    ))}
                </ul>
            )}
        </>
    )
}
function valueHandler(event: FocusEvent<HTMLInputElement>, getInpValueOnBlur: (inpValu: TInpValue | null) => void) {
    if (!(typeof getInpValueOnBlur === "function")) throw new TypeError(`The getInpValueOnBlur must be an function, but found ${typeof getInpValueOnBlur}`);
    const inpValue = event.target.value
    const inpName = event.target.name
    getInpValueOnBlur({ name: inpName, value: inpValue })
}