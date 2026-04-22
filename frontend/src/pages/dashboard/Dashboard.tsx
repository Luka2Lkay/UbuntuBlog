import { useAuth } from "@clerk/react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Dashboard() {
    const navigate = useNavigate();

    const { isLoaded, isSignedIn, userId, sessionId, getToken, signOut } = useAuth();



    useEffect(() => {
        
        const verifyToken = async () => {
            const token = await getToken();

            if (!token) {
                console.error("No token found, user is not authenticated.");
                navigate("/sign-in");
                return;
            }
        }

        verifyToken();
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