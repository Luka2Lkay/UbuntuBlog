import axios from "axios";

export const fetchWithAuth = async (url: string, token: string | null) => {
  try {
    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
};

export const postWithAuth = async (
  url: string,
  data: {},
  token: string | null,
) => {
  if (!token) {
    throw new Error("No token found");
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
    console.error("Error posting data", error);
    throw new Error("Failed to post data");
  }
};

export const deleteWithAuth = async (url: string, token: string | null) => {
  if (!token) {
    throw new Error("No token found");
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
    console.error("Error deleting data", error);
    throw new Error("Failed to delete data");
  }
};

export const updateWithAuth = async (
  url: string,
  data: {},
  token: string | null,
) => {
  if (!token) {
    throw new Error("No token found!");
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
    console.error("Error editing data", error);
    throw new Error("Failed to edit data");
  }
};
