import * as Yup from "yup";
export const CandidateSchema = Yup.object({
    name: Yup.string().required("Candidate name is required"),
    logo: Yup.mixed().nullable(),
});
export type CandidateFormSchema = Yup.InferType<typeof CandidateSchema>;