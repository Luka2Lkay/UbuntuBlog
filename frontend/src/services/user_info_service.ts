import { fetchWithAuth } from "@/services/api";

const BASE_URL = import.meta.env.VITE_BASE_LOCAL_URL;

export const userInfoService = async (token: string | null) => {
  try {
    const response = await fetchWithAuth(`${BASE_URL}/api/user`, token);

    console.log("res", response.data.user);
    return response.data.user;
  } catch (error) {
    console.error("Error fetching user info: ", error);
  }
};
