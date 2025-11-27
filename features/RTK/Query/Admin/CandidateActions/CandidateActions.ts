import {AppAPI} from "@/features/RTK/CreateAPI/DefineAppApi";
import {CandidateListEnum, RTKTagsEnum} from "@/sharedUtils/Enums/RTK_InvalidationTags";

export const candidatesApi = AppAPI.injectEndpoints({
    endpoints: (builder) => ({
        addCandidate: builder.mutation({
            query: (formData) => ({
                url: "/Admin/AddCandidates",
                method: "POST",
                body: formData,
            }),
            invalidatesTags:[{type: RTKTagsEnum.Candidates as const,id:CandidateListEnum.LIST}],
        }),

        editCandidate: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/Admin/EditCandidates/${id}`,
                method: "PUT",
                body: formData,
            }),
            invalidatesTags:[{type:RTKTagsEnum.Candidates as const,id:CandidateListEnum.LIST}],
        }),
    }),
});
export const {useAddCandidateMutation,useEditCandidateMutation} = candidatesApi;