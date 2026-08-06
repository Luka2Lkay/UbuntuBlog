import { useSiteContext } from "@/state/context/site/useSiteContext"
import { Link } from "react-router-dom"
import { useAuth } from "@clerk/react"
import { useNavigate } from "react-router-dom"
import { LogOut } from "lucide-react"
import { useAppSelector } from "@/hooks/redux_hooks"
import { selectSites } from "@/state/redux/reducers/site_slice"
import { useEffect, useState } from "react"
import { fetchWithAuth } from "@/services/api"
import capitalize from "capitalize"

const BASE_URL = import.meta.env.VITE_BASE_LOCAL_URL //use LIVE URL

function Header() {
    const { selectedSite, setSelectedSite } = useSiteContext();
    const navigate = useNavigate();
    const { signOut } = useAuth();
    const { getToken } = useAuth();
    const sites = useAppSelector(selectSites);

    const [username, setUsername] = useState("")

    useEffect(() => {
        if (sites.length > 0 && !selectedSite) {
            setSelectedSite(sites[0]);
            const loadUserData = async () => {
                try {
                    const token = await getToken({ template: "backend" });
                    console.log("token: ", token
                    )
                    const response = await fetchWithAuth(`${BASE_URL}/api/user`, token);
                    console.log("userId: ", response.data.user)
                    setUsername(response.data.user.username);
                } catch (error) {
                    console.error("Error loading user response:", error);
                }
            }
            loadUserData();
        }

    }, [sites, selectedSite, setSelectedSite, getToken])

    const logout = () => {
        signOut();
        navigate("/sign-in");
    }

    return (
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
            <div>
                <h1 className="text-xl text-left font-semibold text-gray-800">{capitalize.words(username)}</h1>
                <p className="text-sm text-gray-500">Active site: <span className="font-medium text-gray-700">{capitalize.words(selectedSite?.name ?? "")}</span></p>
            </div>

            <div className="flex items-center gap-4">

                <Link to="/posts" className="text-gray-600 hover:text-black transition">
                    Posts
                </Link>

                <Link to="/create-post" className="bg-black text-white px-2 py-1 md:px-4 md:py-2 rounded-md text-xs md:text-sm hover:bg-gray-800 transition">
                    <span className="text-lg">+</span> Post
                </Link>

                <button className="text-gray-600 w-[2px] hover:text-red-500 transition cursor-pointer" onClick={logout}>
                    <LogOut />
                </button>
            </div>
        </div>
    )
}

export default Header