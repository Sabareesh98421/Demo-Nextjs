// page.tsx
"use client"
import InputNLabelMui from "@/components/muiComponents/InputNLabel";
import { IInputProps, TInpValue } from "@/sharedUtils/CustomTypes";
import FormControl from "@mui/material/FormControl";
let data: TInpValue | null;
export default function VoteMui() {
    const inpData: IInputProps[] = [
        {
            id: "a1",
            name: "email",
            type: "email",
            getInpValueOnBlur: (value) => { getInputValue(value) }
        }
    ]
    return (
        <>
            <FormControl>

                {
                    inpData.map((inp) => (
                        <InputNLabelMui key={inp.id} {...inp} />
                    ))
                }

            </FormControl >
        </>
    )
}
function getInputValue(inpData: TInpValue | null) {
    if (inpData == null) return;
    data = inpData;
}