import { useSiteContext } from "../../context/SiteContext";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, PlusSquare, MoveRight, MoveLeft, Plus, MoreVertical, Pencil, Trash } from "lucide-react";
import { selectSites, selectCurrentSite } from "../../redux/reducers/site_slice";
import { fetchSitesThunk } from "../../redux/thunks/site_thunk";
import { useAuth } from "@clerk/react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux_hooks";
import { deleteSiteThunk } from "../../redux/thunks/site_thunk";

function Sidebar() {
    const { selectedSite, setSelectedSite } = useSiteContext();
    const [collapsed, setCollapsed] = useState(false);
    const [clientMenuOpen, setClientMenuOpen] = useState<string | null>(null);
    const navigate = useNavigate();

    const { getToken } = useAuth();
    const dispatch = useAppDispatch();
    const sites = useAppSelector(selectSites);
    const currentSite = useAppSelector(selectCurrentSite);

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

    const handleDeleteSite = async (siteId: string) => {
        try {

            const token = await getToken({ template: "backend" });
            await dispatch(deleteSiteThunk({ siteId, token })).unwrap();
            setClientMenuOpen(null);

            if (selectedSite?._id === siteId) {
                setSelectedSite(null);
            }

        } catch (error) {
            console.error("Error deleting site:", error);
        }
    };

    const navigateToEdit = (siteId: string) => {
        console.log("site yangoku", currentSite)
        setClientMenuOpen(null);
        navigate(`/sites/${siteId}/edit`);
    }

    return (
        <aside className={`min-h-screen bg-gray-900 text-white flex flex-col transition-all duration-300 hidden md:block ${collapsed ? 'w-20' : 'w-64'}`}>
            <div className="flex items-center justify-between px-4 py-6 border-b border-gray-800 shadow-sm">
                {!collapsed && (<h1 className="text-lg font-semibold">UbuntuBlog</h1>)}

                <button className="text-sm text-gray-400 hover:text-white" onClick={() => setCollapsed(!collapsed)}>
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
                        sites.map(clientSite => (
                            <div key={clientSite._id}>
                                <div className="flex">
                                    <button type="button" onClick={() => setSelectedSite(clientSite)}
                                        className={`text-left px-3 py-2 rounded-md w-full text-sm transition ${selectedSite?._id === clientSite?._id ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
                                    >
                                        {collapsed ? clientSite?.name.charAt(0).toUpperCase() : clientSite?.name}
                                    </button>
                                    <div className="flex items-center justify-between">
                                        <MoreVertical size={16} className="text-gray-400 hover:text-white cursor-pointer" onClick={(e) => {
                                            e.stopPropagation();
                                            setClientMenuOpen(clientMenuOpen === clientSite?._id ? null : clientSite?._id);
                                        }} />
                                    </div>
                                </div>

                                {clientMenuOpen === clientSite?._id && (

                                    <div className="absolute right-120 top-50 z-50 gap-10 w-50 rounded-lg bg-gray-900 border border-gray-800 overflow-hidden shadow-xl">
                                        <div className="border-b border-gray-500 flex justify-end">
                                            <button type="button" className="cursor-pointer p-4 font-semibold hover:text-red-500" onClick={() => setClientMenuOpen(null)}>X</button>
                                        </div>
                                        <button type="button" className="w-full gap-2 flex items-center px-4 py-3 text-sm hover:bg-gray-800" onClick={() => navigateToEdit(clientSite._id)}>
                                            <Pencil size={16} />
                                            Edit Client
                                        </button>
                                        <button type="button" className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-gray-800" onClick={() => handleDeleteSite(clientSite._id)}>
                                            <Trash size={16} />
                                            Remove Client
                                        </button>
                                    </div>
                                )}
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