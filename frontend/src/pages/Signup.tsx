

function Signup() {
    return (
        <div className="flex-1 bg-gray-200 p-8 w-1/2 mx-auto rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center text-blue-500">UbuntuBlog</h1>
            <div>
                <form className="flex flex-col gap-4 w-full max-w-sm mx-auto mt-8">
                    <input type="text" placeholder="Username" className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input type="email" placeholder="Email" className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input type="password" placeholder="Password" className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default Signup