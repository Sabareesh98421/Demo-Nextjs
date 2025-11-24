import { AppAPI } from "@/features/RTK/CreateAPI/DefineAppApi";
import { HTTP_Method } from "@/serverUtils/Enums/HTTP_Enum";

const deleteCandidateAPI = AppAPI.injectEndpoints({
    endpoints: (build) => ({
        deleteCandidate: build.mutation<void, string>({
            query: (id) => ({
                url: `/Admin/DeleteCandidate/${id}`,
                method: HTTP_Method.DELETE,
            }),
            invalidatesTags: (result, error, id ) => [
                { type: "Candidates", id },
                { type: "Candidates", id: "candidateList" },
            ],
        }),
    }),
});

export const { useDeleteCandidateMutation } = deleteCandidateAPI;
