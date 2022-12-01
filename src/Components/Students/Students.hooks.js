import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { baseUrl } from "../../Utils.js/baseUrl";
import { getCall, postCall } from "../../Utils.js/axiosCall";

export const useStudents = () => {
  return useQuery(
    "getStudents",
    () => getCall({ url: `${baseUrl}/api/admin/getStudents` }),
    {
      refetchOnWindowFocus: false,
      onError: (error) => {
        const message =
          error?.response?.errors?.[0]?.message || "Something went wrong!";
        console.log(message);
        // dispatch(pushToSnackbar(message, "error"));
      },
      select: (response) => response?.data,
    }
  );
};

export const useBranches = () => {
  return useQuery(
    "getBranches",
    () => getCall({ url: `${baseUrl}/api/admin/getBranch` }),
    {
      refetchOnWindowFocus: false,
      onError: (error) => {
        const message =
          error?.response?.errors?.[0]?.message || "Something went wrong!";
        console.log(message);
        // dispatch(pushToSnackbar(message, "error"));
      },
      select: (response) => response?.data,
    }
  );
};

export const useBatches = () => {
  return useQuery(
    "getBatches",
    () => getCall({ url: `${baseUrl}/api/admin/getBatch` }),
    {
      refetchOnWindowFocus: false,
      onError: (error) => {
        const message =
          error?.response?.errors?.[0]?.message || "Something went wrong!";
        console.log(message);
        // dispatch(pushToSnackbar(message, "error"));
      },
      select: (response) => response?.data,
    }
  );
};
export function useUploadStudents() {
  // const queryClient = useQueryClient();
  return useMutation(
    async (body) => postCall({ url: `${baseUrl}/search/search_music `, body }),

    {
      onError: (err) => console.log(err),
    }
  );
}
