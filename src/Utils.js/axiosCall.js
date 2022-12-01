import axios from "axios";

export const getToken = () => {
  return localStorage.getItem("tp_token");
};

export const getStudentToken = () => {
  return localStorage.getItem("tp_token_student");
};

export const getCall = async ({ url, options }) => {
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${
        localStorage.getItem("isAdmin") === "true"
          ? getToken()
          : getStudentToken()
      }`,
      ...options,
    },
  });
};

export const postCall = async ({ url, body, options }) => {
  console.log("BODY", body);
  return await axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${
        localStorage.getItem("isAdmin") === "true"
          ? getToken()
          : getStudentToken()
      }`,
      ...options,
    },
  });
};
export const putCall = async ({ url, body, options }) => {
  console.log("BODY", body);
  return await axios.put(url, body, {
    headers: {
      Authorization: `Bearer ${
        localStorage.getItem("isAdmin") === "true"
          ? getToken()
          : getStudentToken()
      }`,
      ...options,
    },
  });
};

export const studentGetCall = async ({ url, options }) => {
  const headers = new Headers();
  headers.set("Authorization", `Bearer ${getToken()}`);
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${getStudentToken()}`,
      ...options,
    },
  });
};

export const studentPostCall = async ({ url, body, options }) => {
  console.log("BODY", body);
  return await axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${getStudentToken()}`,
      ...options,
    },
  });
};
