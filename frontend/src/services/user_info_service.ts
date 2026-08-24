import { fetchWithAuth } from "@/services/api";
import { errorMessages } from "@/helpers/messages_helper";

const BASE_URL = import.meta.env.VITE_BASE_LIVE_URL;

export const userInfoService = async (token: string | null) => {
  if (!token) {
    throw new Error(errorMessages.noToken);
  }

  try {
    const response = await fetchWithAuth(`${BASE_URL}/api/user`, token);

    return response.data.user;
  } catch (error) {
    console.error("Error fetching user info: ", error);
  }
};
