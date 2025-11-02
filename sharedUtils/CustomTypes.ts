// CustomTypes.ts
export type TInputType = "email"
    | "number"
    | "text"
    | "password"
    | "phoneNumber"
    | "radio";
export type TInpValue = {
    name: string,
    value: string
}
export interface IInputProps {
    id: string,
    cls?: string,
    name: string | undefined,
    value?: string,
    type: TInputType,
    getInpValueOnBlur:
    (inpValue: TInpValue | null) => void
}