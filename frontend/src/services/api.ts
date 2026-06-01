import axios from "axios";

interface Props {
  template: string;
}

export const fetchWithAuth = async (
  url: string,
  getToken: ({ template }: Props) => Promise<string | null>,
) => {
  try {
    const token = await getToken({ template: "backend" });

    console.log(`token: ${token}`);

    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = response.data;

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
};

export const postWithAuth = async (
  url: string,
  data: {},
  getToken: ({ template }: Props) => Promise<string | null>,
) => {
  const token = await getToken({ template: "backend" });

  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = axios.post(url, data, {
      headers: {
        Authorization: `Beare ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.error("Error posting data", error);
    throw new Error("Failed to post data");
  }
};
