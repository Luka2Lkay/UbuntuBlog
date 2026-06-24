import { useSiteContext } from "../../context/SiteContext"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "@clerk/react"
import { useNavigate } from "react-router-dom"
import { LogOut } from "lucide-react"
import { useAppSelector } from "../../hooks/redux_hooks"
import { selectSites } from "../../redux/reducers/site_slice"
import { useEffect, useState } from "react"
import { fetchWithAuth } from "../../services/api"

const BASE_URL = import.meta.env.VITE_BASE_LOCAL_URL

function Header() {
    const { selectedSite, setSelectedSite } = useSiteContext();
    // const location = useLocation();
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
                    const response = await fetchWithAuth(`${BASE_URL}/api/user`, token);

                    console.log(`Token: ${token}`);
                    console.log("response: ", response.data.user.username)
                    setUsername(response.data.user.username);
                    return username
                } catch (error) {
                    console.error("Error loading user response:", error);
                }
            }
            console.log("username: ", username)
            loadUserData();
        }


    }, [sites, selectedSite, setSelectedSite])






    const logout = () => {
        signOut();
        navigate("/sign-in");
    }

    return (
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
            <div>
                <h1 className="text-xl font-semibold text-gray-800">{username}</h1>
                <p className="text-sm text-gray-500">Active site: <span className="font-medium text-gray-700">{selectedSite?.name}</span></p>
            </div>

            <div className="flex items-center gap-4">

                <Link to="/posts" className="text-gray-600 hover:text-black transition">
                    Posts
                </Link>

                <Link to="/create-post" className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition">
                    + Create Post
                </Link>

                <button className="text-gray-600 hover:text-red-500 transition cursor-pointer" onClick={logout}>
                    <LogOut />
                </button>
            </div>
        </div>
    )
}

export default Header