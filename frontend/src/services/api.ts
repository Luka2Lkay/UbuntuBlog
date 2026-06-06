import axios from "axios";
import { type Site } from "../interfaces/interface";
import { errorMessages } from "../helpers/messages_helper";

export const fetchWithAuth = async (url: string, token: string | null) => {
  try {
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
  } catch (error) {
    console.error(`${errorMessages.apiError("fetch")}: `, error);
    throw new Error(errorMessages.apiError("fetch"));
  }
};

export const postWithAuth = async (
  url: string,
  data: Site,
  token: string | null,
) => {
  if (!token) {
    throw new Error(errorMessages.noToken);
  }

  try {
    const response = axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.error(`${errorMessages.apiError("post")}: `, error);
    throw new Error(errorMessages.apiError("post"));
  }
};

export const deleteWithAuth = async (url: string, token: string | null) => {
  if (!token) {
    throw new Error(errorMessages.noToken);
  }

  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.error(`${errorMessages.apiError("delete")}: `, error);
    throw new Error(errorMessages.apiError("delete"));
  }
};

export const updateWithAuth = async (
  url: string,
  data: Site,
  token: string | null,
) => {
  if (!token) {
    throw new Error(errorMessages.noToken);
  }

  try {
    const response = await axios.patch(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.error(`${errorMessages.apiError("edit")}: `, error);
    throw new Error(errorMessages.apiError("edit"));
  }
};

export const fetchOneWithAuth = async (url: string, token: string | null) => {
  if (!token) {
    throw new Error(errorMessages.noToken);
  }

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error(`${errorMessages.apiError("fetch")}: `, error);
    throw new Error(errorMessages.apiError("fetch"));
  }
};
