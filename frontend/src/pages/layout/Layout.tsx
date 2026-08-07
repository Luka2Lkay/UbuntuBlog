import { useState } from "react"
import Sidebar from "@/components/sidebar/Sidebar"
import Header from "@/components/header/Header"
import { Outlet } from "react-router-dom"

function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="h-screen flex bg-gray-100 overflow-hidden">

            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex flex-1 flex-col overflow-hidden">
                <header className="bg-white border-b shadow-sm">
                    <Header onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
                </header>

                <main className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>

        </div>
    )
}

export default Layout