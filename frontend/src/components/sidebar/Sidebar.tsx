import { useSiteContext } from "../../context/SiteContext"
import { useState } from "react"
import { NavLink } from "react-router-dom";
import { LayoutDashboard, FileText, PlusSquare, MoveRight, MoveLeft } from "lucide-react";

type Site = {
    _id: string;
    name: string;
    slug: string;
    domain: string;
    niche: string;
}

// const sites: Site[] = [
//     "Home of Commerce",
//     "KasiVolt"
// ];




function Sidebar() {
    const { site, sites, setSite } = useSiteContext();
    const [collapsed, setCollapsed] = useState(false);

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
                    <span className={`${collapsed ? 'hidden' : ''}`}>Dashboard</span>
                </NavLink>

                <NavLink to="/posts" className={({ isActive }) => navClass(isActive)}>
                    <FileText size={18} />
                    <span className={`${collapsed ? 'hidden' : ''}`}>Posts</span>

                </NavLink>

                <NavLink to="/create-post" className={({ isActive }) => navClass(isActive)}>
                    <PlusSquare size={18} />
                    <span className={`${collapsed ? 'hidden' : ''}`}>New Post</span>
                </NavLink>
            </nav>

            <div className="px-3 py-4 border-t border-gray-800 flex-1 overflow-y-auto">
                {!collapsed && (
                    <h2 className="text-xs uppercase text-gray-500 mb-2">Clients</h2>
                )}

                <div className="flex flex-col gap-1">
                    {
                        sites.map(clientSite => (
                            <button key={clientSite?.name} onClick={() => setSite(clientSite)}
                                className={`text-left px-3 py-2 rounded-md text-sm transition ${site?.name === clientSite?.name ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
                            >
                                {collapsed ? clientSite?.name.charAt(0).toUpperCase() : clientSite?.name}
                            </button>
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