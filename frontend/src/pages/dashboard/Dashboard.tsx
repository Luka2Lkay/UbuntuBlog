import { useAuth, useUser } from "@clerk/react"
import { useEffect, } from "react"
import { useNavigate, Outlet } from "react-router-dom"
import { fetchWithAuth } from "../../services/api"
import Header from "../../components/header/Header"

const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

function Dashboard() {
    const navigate = useNavigate();


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
        <div className="h-screen flex bg-gray-100">
            <aside className="w-64 bg-gray-900 text-white hidden md:block">

            </aside>

            <div className="flex flex-1 flex-col">
                <header className="bg-white border-b shadow-sm">
                    <Header />
                </header>

                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>

        </div>
    )
}

export default Dashboard