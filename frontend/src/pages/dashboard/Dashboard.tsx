import { useAuth } from "@clerk/react"
import { useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { useSiteContext } from "@/state/context/site/useSiteContext"
import { fetchSitesThunk } from "@/state/redux/thunks/site_thunk"
import { fetchPostsThunk } from "@/state/redux/thunks/post_thunk"
import { selectSites, selectLoading } from "@/state/redux/reducers/site_slice"
import { useAppDispatch, useAppSelector } from "@/hooks/redux_hooks"
import StatisticsCard from "@/components/statistics_card/StatisticsCard"
import { selectPosts } from "@/state/redux/reducers/post_slice"
import SiteCard from "@/components/site_card/SiteCard"
import { Link } from "react-router-dom"

function Dashboard() {
    const navigate = useNavigate();
    const { selectedSite } = useSiteContext();
    const { isLoaded, isSignedIn, getToken, userId } = useAuth();

    const dispatch = useAppDispatch();
    const sites = useAppSelector(selectSites);
    const loading = useAppSelector(selectLoading);
    const posts = useAppSelector(selectPosts);

    useEffect(() => {
        if (!isLoaded || !userId || !isSignedIn || !selectedSite) return;
        if (!selectedSite?._id) return

        const loadSites = async () => {


            console.log("site", selectedSite)
            try {
                const token = await getToken({ template: "backend" });

                if (!token) return;
                const response = await dispatch(fetchSitesThunk(token)).unwrap();
                await dispatch(fetchPostsThunk({ slug: selectedSite?.slug, token })).unwrap()
                return response;
            } catch (error) {
                console.error("Error loading user data:", error);
            }
        }

        loadSites();

    }, [isLoaded, isSignedIn, navigate, userId, getToken, dispatch, sites.length, selectedSite?._id, selectedSite]);



    useEffect(() => {
        if (loading) return;


        if (sites.length === 0) {
            navigate("/sites/create")
        }

    }, [sites.length, loading, navigate])

    const publishedCount = useMemo(() => {
        return posts.filter(post => post.published === true).length;
    }, [posts])
    const draftsCount = useMemo(() => {
        return posts.filter(post => post.published === false).length
    }, [posts])

    if (loading) {

        return (
            <div className="grid gap-4">
                {[...Array(5)].map((_, index) => (
                    <div
                        key={index}
                        className="h-32 rounded-lg bg-gray-200 animate-pulse"
                    />
                ))}
            </div>
        );
    }

    return (
        <>
            <div className="space-y-6 px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
                    <p className="text-sm text-gray-500">Managing content for <span className="font-medium">{selectedSite?.name}</span></p>
                </div>

                <div>
                    <SiteCard name={selectedSite?.name} domain={selectedSite?.domain} niche={selectedSite?.niche} showDeleteButton={false} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    <StatisticsCard title="Total Posts" value={posts?.length} />
                    <StatisticsCard title="Published" value={publishedCount} />
                    <StatisticsCard title="Drafts" value={draftsCount} />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <Link to={`/posts/create/${selectedSite?.slug}`} className="w-full sm:w-auto px-4 py-2 bg-gray-900 text-white rounded-md text-sm text-center hover:bg-black">
                        + New Post
                    </Link>

                    <Link to="/posts" className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md text-sm text-center hover:bg-gray-200">
                        View All Posts
                    </Link>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-200">
                        <h2 className="text-sm font-medium text-gray-700">Recent Posts</h2>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard