import Sidebar from "@/components/sidebar/Sidebar"
import Header from "@/components/header/Header"
import { Outlet } from "react-router-dom"

function Layout() {
    return (
        <div className="min-h-screen flex bg-gray-100">

            <Sidebar />

            <div className="flex flex-1 flex-col">
                <header className="bg-white border-b shadow-sm">
                    <Header />
                </header>

                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>

        </div>
    )
}

export default Layout