// CustomTypes.ts
import {JwtPayload} from "jsonwebtoken";

export interface FormUIStruct {
    label:string;
    id: string;
    name: string;
    type:InputTypeSType;
    value?:string;
    className?:string;
    onChange?:()=>void;
    required?:boolean;
}

export interface SignUpFormData{
   email:string,
   password:string,
   confirmPassword:string
}

// Define the structure of your mock data file
export type FrameworkData = {
    emails: string[];
    totalVotes: number;
}
export interface Framework {
    id:string;
    name: string;
    logo?: string;
}
export type VoteData = {
    [key in Framework["name"]]:{
        emails:string[],
        totalVotes:number
    }
};


export type LoginFormData = LoginUserData;


export type TInputType = "email"
    | "number"
    | "text"
    | "password"
    | "phoneNumber"
    | "radio"
    |"file"
    ;

export enum InputTypeSType{
    Number = "number" ,
    Text = "text",
    Email = "email",
    Password = "password",
    PhoneNumber = "phoneNumber",
    Radio = "radio",
    File = "file"
}
export interface DialogFormStruct  extends  Record<string, unknown>{
    frameWork:string,
    image?:File|null,
}

export interface DialogGlobalState{
    title:string;
    buttonAction:ButtonActionType;
    value?:string|null
    id?:string|null
}
export interface FormStruct<T extends Record<string, unknown>>{
    title:string,
    form:T,
    fields:FormField[],
    ButtonAction:ButtonActionType;
}
export type TInpValue = {
    name: string,
    value: string
}
export enum ButtonActionType{
    Add="Add",
    Edit="Edit"
}
export interface FormField {
    name: string;
    label: string;
    type: TInputType;
    value?:string;

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


export type ReturnVoidFunction =(arg?:any)=>void;


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


// Server side Types.....

export interface ServerJwtPayload extends JwtPayload {
    email: string;
    role: string;
}

export interface CurrentUser{
    isTokenAvailable:boolean,
    isAdmin:boolean,
    user:ServerJwtPayload|null
}
export enum Role{
    Admin="Admin",
    User = "User"
}
export interface LoginUserData{
    email:string,
    password:string,
}
export interface UserData extends LoginUserData{

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

export interface Candidates {
    id:string;
    name:string;
    logo?:string|null
}
export interface NewCandidate{
    name:string
    logo?:Candidates["logo"],
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
export type DashboardChartData = [string[], number[]];
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
export interface UserNVotes{
    users: string[];
    frameWork: string;
}
export interface FrameWorkNItTotal {
    frameWork: string;
    totalVotes: number;
}
export interface DashboardStats{
    totalVotes: number;
    users:UserNVotes[];
    frameWork:FrameWorkNItTotal[];
}
export interface AddCandidate{
    frameWork: string;
    file?:File|null
}