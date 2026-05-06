import { useSiteContext } from "../../context/SiteContext"
import { useState } from "react"
import { NavLink } from "react-router-dom";

type Site = string;

const sites: Site[] = [
    "Home of Commerce",
    "KasiVolt"
];

function Sidebar() {
    const { site, setSite } = useSiteContext();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside className={`h-screen bg-gray-900 text-white flex flex-col transition-all duration-300 hidden md:block ${collapsed ? 'w-20' : 'w-64'}`}>
            <div className="flex items-center justify-between px-4 py-6 border-b border-gray-800 shadow-sm">
                {!collapsed && (<h1 className="text-lg font-semibold">UbuntuBlog</h1>)}

                <button className="text-sm text-gray-400 hover:text-white" onClick={() => setCollapsed(!collapsed)}>
                    {collapsed ? "Expand" : "Collapse"}
                </button>
            </div>

            <nav className="flex-1 flex-col gap-1 px-2 py-4">
                <NavLink to="/dashboard" className={({ isActive }) => `block px-3 py-2 rounded-md text-sm ${isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
                    Dashboard
                </NavLink>

                <NavLink to="/posts" className={({ isActive }) => `block px-3 py-2 rounded-md text-sm ${isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
                    Posts
                </NavLink>

                <NavLink to="/create-post" className={({ isActive }) => `block px-3 py-2 rounded-md text-sm ${isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
                    Create Post
                </NavLink>
            </nav>

            <div className="px-3 py-4 border-t border-gray-800 flex-1 overflow-y-auto">
                {!collapsed && (
                    <h2 className="text-xs uppercase text-gray-500 mb-2">Clients</h2>
                )}

                <div className="flex flex-col gap-1">
                    {
                        sites.map(clientSite => (
                            <button key={clientSite} onClick={() => setSite(clientSite)}
                                className={`text-left px-3 py-2 rounded-md text-sm transition ${site === clientSite ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
                            >
                                {collapsed ? clientSite.charAt(0).toUpperCase() : clientSite}
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

export default Sidebar