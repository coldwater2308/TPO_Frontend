import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { baseUrl } from "../../Utils.js/baseUrl";
import { getCall, postCall } from "../../Utils.js/axiosCall";

export const useJobs = (body) => {
  return useQuery(
    "getJobs",
    () =>
      postCall({
        url: `${baseUrl}/api/${
          localStorage.getItem("isAdmin") === "true" ? "admin" : "student"
        }/${
          localStorage.getItem("isAdmin") === "true"
            ? "getPosts"
            : "getCurrentPost"
        }`,
        body,
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
export function useUploadJob() {
  // const queryClient = useQueryClient();
  return useMutation(async (body) =>
    postCall({ url: `${baseUrl}/api/admin/addPost`, body })
  );
}
export function useApplyJob() {
  const queryClient = useQueryClient();
  return useMutation(
    async (body) => postCall({ url: `${baseUrl}/api/student/apply`, body }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getJobs"]);
      },
    }
  );
}
