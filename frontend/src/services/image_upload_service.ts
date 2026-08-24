import axios from "axios";
import { errorMessages } from "@/helpers/messages_helper";

const BASE_URL = import.meta.env.VITE_BASE_LIVE_URL;

export const uploadImage = async (image: FormData, token: string | null) => {
  if (!token) {
    throw new Error(errorMessages.noToken);
  }

  try {
    const response = await axios.post(`${BASE_URL}/api/upload/image`, image, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to upload");
  }
};
