import { useSiteContext } from "../../context/SiteContext"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "@clerk/react"
import { useNavigate } from "react-router-dom"
import {LogOut} from "lucide-react"

function Header() {

    const { site } = useSiteContext();
    const location = useLocation();
    const navigate = useNavigate();
    const { signOut } = useAuth();

    const getTitle = () => {

        switch (location.pathname) {
            case "/create-post":
                return "Create Post";
            case "/posts":
                return "Posts";
            default:
                return "Dashboard";
        }
    }

    const logout = () => {
        signOut();
        navigate("/sign-in");
    }

    return (
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
            <div>
                <h1 className="text-xl font-semibold text-gray-800">{getTitle()}</h1>
                <p className="text-sm text-gray-500">Active site: <span className="font-medium text-gray-700">{site}</span></p>
            </div>

            <div className="flex items-center gap-4">

                <Link to="/posts" className="text-gray-600 hover:text-black transition">
                    Posts
                </Link>

                <Link to="/create-post" className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition">
                    + Create Post
                </Link>

                <button className="text-gray-600 hover:text-red-500 transition cursor-pointer" onClick={logout}>
                    <LogOut/>
                </button>
            </div>
        </div>
    )
}

export default Header