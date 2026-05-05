import axios from "axios";

   export const fetchWithAuth = async (url: string, getToken: ({ template }: { template: string }) => Promise<string | null>) => {

        try {
            const token = await getToken({ template: "backend" });

            if (!token) {
                throw new Error("No token found");
            }

            const response = await axios.get(url, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });

            const data = response.data;

            console.log("Fetched user data:", data);
            return data;
        } catch (error) {
            console.error("Error fetching user data:", error);
            throw new Error("Failed to fetch user data");
        }
    }
