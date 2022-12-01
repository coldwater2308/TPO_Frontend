import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { baseUrl } from "../../Utils.js/baseUrl";
import { getCall, postCall } from "../../Utils.js/axiosCall";

export function useAddBranch() {
  const queryClient = useQueryClient();
  return useMutation(
    async (body) => postCall({ url: `${baseUrl}/api/admin/addBranch `, body }),

    {
      onError: (err) => console.log(err),
      onSuccess: () => {
        queryClient.invalidateQueries(["getBranches"]);
      },
    }
  );
}

export function useAddBatch() {
  const queryClient = useQueryClient();
  return useMutation(
    async (body) => postCall({ url: `${baseUrl}/api/admin/addBatch `, body }),

    {
      onError: (err) => console.log(err),
      onSuccess: () => {
        queryClient.invalidateQueries(["getBatches"]);
      },
    }
  );
}
