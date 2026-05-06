import { useAuth } from "@clerk/react"
import { useEffect, } from "react"
import { useNavigate, Outlet } from "react-router-dom"
import { fetchWithAuth } from "../../services/api"
import { useSiteContext } from "../../context/SiteContext"

const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

function Dashboard() {
    const navigate = useNavigate();
    const { site } = useSiteContext();
    const { isLoaded, isSignedIn, getToken } = useAuth();

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

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
                <p className="text-sm text-gray-500">Managing content for <span className="font-medium">{site}</span></p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            </div>
        </div>
    )
}

export default Dashboard