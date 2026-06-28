import { useSiteContext } from "@/state/context/useSiteContext";
import { type Site } from "@/interfaces/interface";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, PlusSquare, MoveRight, MoveLeft, Plus } from "lucide-react";
import { selectSites } from "@/state//redux/reducers/site_slice";
import { fetchSitesThunk } from "@/state/redux/thunks/site_thunk";
import { useAuth } from "@clerk/react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux_hooks";
import capitalize from "capitalize";

function Sidebar() {
    const { selectedSite, setSelectedSite } = useSiteContext();
    const [collapsed, setCollapsed] = useState(false);

    const navigate = useNavigate();

    const { getToken } = useAuth();
    const dispatch = useAppDispatch();
    const sites = useAppSelector(selectSites);

    useEffect(() => {

        const fetchSites = async () => {
            try {
                const token = await getToken({ template: "backend" });
                await dispatch(fetchSitesThunk(token)).unwrap();
            } catch (error) {
                console.error("Error fetching sites:", error);
            }
        };
        fetchSites();

    }, [dispatch, getToken])

    const navigateToSite = (site: Site) => {
        setSelectedSite(site);
        navigate(`/sites/${site._id}`, { state: { site } });
    }

    return (
        <aside className={`bg-gray-900 text-white flex flex-col transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
            <div className="flex items-center justify-between px-4 py-6 border-b border-gray-800 shadow-sm">
                {!collapsed && (<h1 className="text-lg font-semibold">UbuntuBlog</h1>)}

                <button className="text-sm text-gray-400 hover:text-white" onClick={() => setCollapsed(prev => !prev)}>
                    {collapsed ? <MoveRight /> : <MoveLeft />}
                </button>
            </div>

            <nav className="flex-1 flex-col gap-1 px-2 py-4">
                <NavLink to="/dashboard" className={({ isActive }) => navClass(isActive)}>
                    <LayoutDashboard size={18} />
                    {!collapsed && (<span>Dashboard</span>)}
                </NavLink>

                <NavLink to="/posts" className={({ isActive }) => navClass(isActive)}>
                    <FileText size={18} />
                    {!collapsed && (<span>Posts</span>)}

                </NavLink>

                <NavLink to="/posts/create" className={({ isActive }) => navClass(isActive)}>
                    <PlusSquare size={18} />
                    {!collapsed && (<span>New Post</span>)}
                </NavLink>
            </nav>

            <div className="px-3 py-4 border-t border-gray-800 flex-1 overflow-y-auto">
                <div className="flex items-center justify-between mb-3">
                    {!collapsed && (
                        <h2 className="text-xs uppercase text-gray-500 mb-2">Clients</h2>
                    )}

                    <button className="text-gray-400 hover:text-white mb-2 cursor-pointer" onClick={() => { navigate("/sites/create") }}>
                        <Plus size={18} />
                    </button>
                </div>

                <div className="flex flex-col gap-1">
                    {

                        sites && sites.map(clientSite => (
                            <div key={clientSite._id} className="relative">
                                <div className="flex">
                                    <button
                                        type="button"
                                        onClick={() => navigateToSite(clientSite)}
                                        className={`text-left px-3 py-2 rounded-md w-full text-sm transition ${selectedSite?._id === clientSite?._id ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
                                    >
                                        {collapsed ? clientSite?.name?.charAt(0).toUpperCase() : capitalize.words(clientSite?.name)}
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="px-4 py-3 border-t border-gray-800 text-xs text-gray-500">
                {!collapsed && (<span>UbuntuBlog v1</span>)}
            </div>
        </aside>
    )
}

function navClass(isActive: boolean) {
    return `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition ${isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`
}

export default Sidebar