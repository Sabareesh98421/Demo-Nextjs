// CustomTypes.ts
export interface SignUpFormData{
   email:string,
   password:string,
   confirmPassword:string
}
export enum Role{
    Admin="Admin",
    User = "User"
}
// Define the structure of your mock data file
export type FrameworkData = {
    emails: string[];
    totalVotes: number;
}
export type VoteData = Record<string, FrameworkData>;

export interface UserData{
    email:string,
    password:string,
    role: Role
}
export type SignUpResponse = {
    status: number;
    message: string;
};

export interface ResponseGeneratorParam<T=unknown>{
    status?:number,
    message?:string,
    data?:T|null
}

export type LoginFormData = UserData;



export interface LoginResponse{
    status:number,
    message:string
}
export interface ServerResponse{
    status:number,
    message:string
}
export interface ServerResponseWithData<T> extends ServerResponse{
    data:T
}
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
export interface FrameworkInfo {
    frameWork: string;
    totalVotes: number;
}
export interface DashboardUser {
    users: string[];
}

export interface DashboardData {
    totalVotes: number;
    users: DashboardUser[];
    frameWork: FrameworkInfo[];
}
export enum IconName {
    TotalVotes = "totalVotes",
    People = "People",
    Code = "Code",
    TrendingUp = "TrendingUp",
}
export enum ColorName{
    Primary= "primary",
    Warning= "warning",
    Success="success",
    Error="error"
}
export interface DashboardCardProps {
    label: string;
    value: number;
    iconName?: IconName;
    color: ColorName;
    image?: string;
}

export interface CardData {
    label: string;
    value: number;
    iconName?: IconName;
    color: ColorName;
    image?:string;
}