import { useAuth } from "@clerk/react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { fetchWithAuth } from "../../services/api"
import Header from "../../components/header/Header"

const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

function Dashboard() {
    const navigate = useNavigate();

    const { isLoaded, isSignedIn, userId, sessionId, getToken, signOut } = useAuth();



    useEffect(() => {

        if (!isLoaded) return;

        if (!isSignedIn) {
            navigate("/sign-in");
            return;
        }

        const loadUserData = async () => {

            try {
                const data = await fetchWithAuth(`${base_url}/api/user`, getToken);
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
            <Header />
            {
                isLoaded && isSignedIn ? (
                    <div>
                        <h1> Hello, {userId}! Your current active session is {sessionId}.</h1>

                        <div className="flex flex-col gap-4 mt-4">
                            <button className="text-green-500" onClick={() => fetchWithAuth(`${base_url}/api/user`, getToken)}>Fetch User Data</button>
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