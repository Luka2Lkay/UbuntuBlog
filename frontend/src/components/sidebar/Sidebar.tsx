import { useSiteContext } from "@/state/context/site/useSiteContext";
import { type Site } from "@/interfaces/Site";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, PlusSquare, MoveRight, MoveLeft, Plus } from "lucide-react";
import { selectSites } from "@/state/redux/reducers/site_slice";
import { fetchSitesThunk } from "@/state/redux/thunks/site_thunk";
import { useAuth } from "@clerk/react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux_hooks";
import capitalize from "capitalize";

const navigation = [
    { 'label': "Dashboard", "to": "/dashboard", "icon": LayoutDashboard, end: true },
    { "label": "Posts", "to": "/posts", "icon": FileText, end: true },
    { "label": "New Post", "to": "/posts/create", "icon": PlusSquare }
]

type SidebarProps = {
    isOpen: boolean,
    onClose: () => void
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
    const { selectedSite, setSelectedSite } = useSiteContext();
    const [collapsed, setCollapsed] = useState(false);

    const navigate = useNavigate();

    const { getToken, isLoaded, isSignedIn, userId } = useAuth();
    const dispatch = useAppDispatch();
    const sites = useAppSelector(selectSites);

    useEffect(() => {
      
        if (!isLoaded || !isSignedIn || !userId || sites.length > 0) return;

        const fetchSites = async () => {
            try {
                const token = await getToken({ template: "backend" });

                if (!token) return;
                await dispatch(fetchSitesThunk(token)).unwrap();
            } catch (error) {
                console.error("Error fetching sites:", error);
            }
        };
        fetchSites();

    }, [dispatch, getToken, sites.length, isLoaded, isSignedIn, userId])

    const navigateToSite = (site: Site) => {
        setSelectedSite(site);
        navigate(`/sites/${site._id}`, { state: { site } });
        if (isOpen) onClose();
    }

    return (
        <>
            {isOpen && <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={onClose} />}

            <aside className={`bg-gray-900 text-white flex flex-col flex-none h-screen transition-all duration-300 fixed inset-y-0 left-0 z-40 ${collapsed ? 'w-20' : 'w-64'} ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:translate-x-0`}>
                <div className="flex items-center justify-between px-4 py-6 border-b border-gray-800 shadow-sm">
                    {!collapsed && (<h1 className="text-lg font-semibold">UbuntuBlog</h1>)}

                    <button className="text-sm text-gray-400 hover:text-white" onClick={() => setCollapsed(prev => !prev)}>
                        {collapsed ? <MoveRight /> : <MoveLeft />}
                    </button>
                </div>

                <nav className="flex-1 px-2 py-4">
                    <ul className="flex flex-col gap-1">
                        {navigation.map((item) => {
                            const Icon = item.icon;

                            return (
                                <li key={item.to}>
                                    <NavLink
                                        to={
                                            item.to === "/posts"
                                                ? `${item.to}?site=${selectedSite?.slug}`
                                                : item.to === "/posts/create"
                                                    ? `${item.to}/${selectedSite?.slug}`
                                                    : item.to
                                        } end={item.end} className={({ isActive }) => navClass(isActive)} onClick={onClose}>
                                        <Icon size={18} />
                                        {!collapsed && (<span>{item.label}</span>)}
                                    </NavLink>
                                </li>
                            )
                        })}
                    </ul>
                </nav>

                <div className="px-3 py-4 border-t border-gray-800 flex-1 overflow-y-auto">
                    <div className="flex items-center justify-between mb-3">
                        {!collapsed && (
                            <h2 className="text-xs uppercase text-gray-500 mb-2">Clients</h2>
                        )}

                        <button aria-label="Create new site" className="text-gray-400 hover:text-white mb-2 cursor-pointer" onClick={() => { navigate("/sites/create") }}>
                            <Plus size={18} />
                        </button>
                    </div>

                    <div className="flex flex-col gap-1">
                        {
                            sites.map(clientSite => (
                                <div key={clientSite._id} className="relative">
                                    <div className="flex">
                                        <button
                                            aria-label={`Select ${clientSite.name}`}
                                            type="button"
                                            onClick={() => navigateToSite(clientSite)}
                                            className={`text-left px-3 py-2 rounded-md w-full text-sm transition ${selectedSite?._id === clientSite._id ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
                                        >
                                            {collapsed ? clientSite?.name?.charAt(0).toUpperCase() : capitalize.words(clientSite.name ?? "")}
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
        </>
    )
}

function navClass(isActive: boolean) {
    return `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition ${isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`
}

export default Sidebar