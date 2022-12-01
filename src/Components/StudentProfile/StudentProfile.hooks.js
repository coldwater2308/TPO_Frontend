import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { baseUrl } from "../../Utils.js/baseUrl";
import { getCall, postCall, putCall } from "../../Utils.js/axiosCall";

export const useProfile = () => {
  return useQuery(
    "getProfile",
    () =>
      getCall({
        url: `${baseUrl}/api/student/profile`,
      }),
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
export function useUploadProfile() {
  // const queryClient = useQueryClient();
  return useMutation(async (body) =>
    putCall({ url: `${baseUrl}/api/student/editProfile`, body })
  );
}
