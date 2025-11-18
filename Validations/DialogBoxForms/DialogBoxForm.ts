import * as Yup from "yup";
export const CandidateSchema = Yup.object({
    frameWork: Yup.string().required("Framework name is required"),
    image: Yup.mixed().nullable(),
});
export type CandidateFormSchema = Yup.InferType<typeof CandidateSchema>;