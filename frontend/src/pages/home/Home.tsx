import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@clerk/react"

export default function Home() {
    const navigate = useNavigate();

    const { signOut, isSignedIn, isLoaded } = useAuth();

    useEffect(() => {

        if (isLoaded && isSignedIn) {
            signOut();
        }

        navigate("/sign-in");
    }, [])

    return <></>
}
