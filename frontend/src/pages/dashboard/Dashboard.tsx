import { useAuth } from "@clerk/react"
import { useEffect, } from "react"
import { useNavigate } from "react-router-dom"
import { fetchWithAuth } from "../../services/api"
import { useSiteContext } from "../../context/SiteContext"
import StatisticsCard from "../../components/statistics_card/StatisticsCard"
import { Link } from "react-router-dom"

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

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
                const data = await fetchWithAuth(`${BASE_URL}/api/user`, getToken);
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
                <StatisticsCard title="Total Posts" value={5} />
                <StatisticsCard title="Published" value={2} />
                <StatisticsCard title="Drafts" value={3} />
            </div>

            <div className="flex gap-3">
                <Link to="/create-post" className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm hover:bg-black">
                    + New Post
                </Link>

                <Link to="/posts" className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-200">
                    View All Posts
                </Link>
            </div>

            <div className="bg-white rounded-lg border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-200">
                    <h2 className="text-sm font-medium text-gray-700">Recent Posts</h2>
                </div>


            </div>
        </div>
    )
}

export default Dashboard