import {AppAPI} from "@/features/RTK/CreateAPI/DefineAppApi";

export const candidatesApi = AppAPI.injectEndpoints({
    endpoints: (builder) => ({
        addCandidate: builder.mutation({
            query: (formData) => ({
                url: "/Admin/AddCandidates",
                method: "POST",
                body: formData,
            }),
        }),

        editCandidate: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/Admin/EditCandidates/${id}`,
                method: "PUT",
                body: formData,
            }),
        }),
    }),
});
export const {useAddCandidateMutation,useEditCandidateMutation} = candidatesApi;