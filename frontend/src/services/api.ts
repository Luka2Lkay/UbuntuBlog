import axios from "axios";
import { type Site } from "@/interfaces/Site";
import { type Post } from "@/interfaces/Post";
import { errorMessages } from "@/helpers/messages_helper";

export const fetchWithAuth = async (url: string, token: string | null) => {
  if (!token) {
    throw new Error(errorMessages.noToken);
  }

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response;
};

type NewSite = Omit<Site, "_id">;
type NewPost = Omit<Post, "_id">;

export const createWithAuth = async (
  url: string,
  data: NewSite | NewPost,
  token: string | null,
) => {
  if (!token) {
    throw new Error(errorMessages.noToken);
  }

  const response = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
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
      "Content-Type": "application/json",
    },
  });

  return response;
};

export const updateWithAuth = async (
  url: string,
  data: Site,
  token: string | null,
) => {
  if (!token) {
    throw new Error(errorMessages.noToken);
  }

  const response = await axios.patch(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
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
