import { AppAPI } from "@/features/RTK/CreateAPI/DefineAppApi";
import { HTTP_Method } from "@/sharedUtils/Enums/HTTP_Enum";
import {CandidateListEnum, RTKTagsEnum} from "@/sharedUtils/Enums/RTK_InvalidationTags";

const deleteCandidateAPI = AppAPI.injectEndpoints({
    endpoints: (build) => ({
        deleteCandidate: build.mutation<void, string>({
            query: (id) => ({
                url: `/Admin/DeleteCandidate/${id}`,
                method: HTTP_Method.DELETE,
            }),
            invalidatesTags: (result, error, id ) => [
                { type: RTKTagsEnum.Candidates, id },
                { type: RTKTagsEnum.Candidates, id: CandidateListEnum.LIST },
            ],
        }),
    }),
});

export const { useDeleteCandidateMutation } = deleteCandidateAPI;
