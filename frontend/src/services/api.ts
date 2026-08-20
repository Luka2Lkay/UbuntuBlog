import axios from "axios";
import { type Site } from "@/interfaces/Site";
import { type PostFormData } from "@/interfaces/Post";
import { errorMessages } from "@/helpers/messages_helper";

export const fetchWithAuth = async (
  url: string,
  token: string | null,
  site?: string,
) => {
  if (!token) {
    throw new Error(errorMessages.noToken);
  }

  const response = await axios.get(url, {
    ...(site && { params: { site } }),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response;
};

type NewSite = Omit<Site, "_id">;

export const createWithAuth = async (
  url: string,
  data: NewSite | FormData,
  token: string | null,
  site?: string,
) => {
  if (!token) {
    throw new Error(errorMessages.noToken);
  }

  const response = await axios.post(url, data, {
    ...(site && { params: { site } }),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export const deleteWithAuth = async (url: string, token: string | null) => {
  if (!token) {
    throw new Error(errorMessages.noToken);
  }

  const response = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export const updateWithAuth = async (
  url: string,
  data: Site | PostFormData,
  token: string | null,
) => {
  if (!token) {
    throw new Error(errorMessages.noToken);
  }

  const response = await axios.patch(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export const fetchOneWithAuth = async (url: string, token: string | null) => {
  if (!token) {
    throw new Error(errorMessages.noToken);
  }

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};
