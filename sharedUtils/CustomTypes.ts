// CustomTypes.ts
export interface SignUpFormData{
   email:string,
   password:string,
   confirmPassword:string
}

export type SignUpResponse = {
    status: boolean;
    message: string;
};

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

export type LayoutTag="section"|"div"|"main"|"header"|"footer"

export type DataForBackend = {
    frameWork: string,
    email: string
}




export type FeedbackType = { text: string, type: 'success' | 'error' } | null


// export type CB_Void =(param:unknown)=>void


export type ReturnVoidFunction =()=>void;


export type ErrorMessage=string[]|null;


// Here unknown is better than generic Type, because I just validate and create new string here, so unknown I fine I guess.
export type ErrorMap<T> = Partial<Record<keyof T,unknown>>;

// Form
export type Form= Record<string,unknown>;


export type FormHookReturns<T>={
    finalFormData: T;
    handleChange: (key: keyof T | string, value: unknown) => void;
    resetForm:ReturnVoidFunction;
}