import { useAuth } from "@clerk/react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Dashboard() {
    const navigate = useNavigate();

    const { isLoaded, isSignedIn, userId, sessionId, getToken, signOut } = useAuth();

    const fetchWithAuth = async (url: string) => {

        try {

            if (!isLoaded || !isSignedIn) {
                throw new Error("Auth not ready");
            }
            // Ensure you have a template named "backend" in your Clerk dashboard for this to work
            const token = await getToken({ template: "backend" });

            if (!token) {
                throw new Error("No token found");
            }

            const response = await fetch(url, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(`Error ${response.status}: ${text}`);

            }

            const data = await response.json();

            console.log("Fetched user data:", data);
            return data;
        } catch (error) {
            console.error("Error fetching user data:", error);
            throw new Error("Failed to fetch user data");
        }
    }

    useEffect(() => {

        if (!isLoaded) return;

        if (!isSignedIn) {
            navigate("/sign-in");
            return;
        }

        const loadUserData = async () => {

            try {

                const data = await fetchWithAuth("http://localhost:3000/api/user");

                return data;
            } catch (error) {
                console.error("Error loading user data:", error);
            }
        }

        loadUserData();

    }, [isLoaded, isSignedIn, navigate]);

    const logout = () => {
        signOut();
        navigate("/sign-in");
    }

    return (
        <>
            {
                isLoaded && isSignedIn ? (
                    <div>
                        <h1> Hello, {userId}! Your current active session is {sessionId}.</h1>

                        <div className="flex flex-col gap-4 mt-4">
                            <button className="text-green-500" onClick={() => fetchWithAuth("http://localhost:3000/api/user")}>Fetch User Data</button>
                            <button onClick={logout}>Sign Out</button>
                        </div>

                    </div>
                ) : (!isLoaded && !isSignedIn) ? (
                    <div>
                        <h1>Loading...</h1>
                    </div>
                ) : (<h1>You must be signed in to view this page.</h1>)
            }
        </>
    )
}

export default Dashboard