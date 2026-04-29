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

            const token = await getToken({ template: "backend" });

            if (!token) {
                throw new Error("No token found");
            }

            const user = await fetch(url, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!user.ok) {
                throw new Error("Failed to fetch user data");
            }

            const data = await user.json();

            return data;
        } catch (error) {
            console.error("Error fetching user data:", error);
            // throw new Error("Failed to fetch user data");
        }
    }

    useEffect(() => {

        if (!isLoaded) return;

        if (!isSignedIn) {
            navigate("/sign-in");
            return;
        }

        let isMounted = true;

        const loadUserData = async () => {

            try {

                const data = await fetchWithAuth("http://localhost:3000/api/user");

                if (!isMounted) return;

                console.log("User data..:", data);
                return data;
            } catch (error) {
                console.error("Error loading user data:", error);
                navigate("/sign-in");
            }
        }

        loadUserData();
    }, [isLoaded, isSignedIn, getToken, navigate]);

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
                        <button onClick={logout}>Sign Out</button>
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