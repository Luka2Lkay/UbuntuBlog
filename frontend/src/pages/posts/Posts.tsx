import { useEffect } from "react"
import { useAuth } from "@clerk/react"
import { useAppDispatch, useAppSelector } from "@/hooks/redux_hooks";
import { selectPosts, selectLoading } from "@/state/redux/reducers/post_slice";
import PostCard from "@/components/post_card/PostCard"
import { fetchPostsThunk } from "@/state/redux/thunks/post_thunk";
import { useSiteContext } from "@/state/context/site/useSiteContext";
import capitalize from "capitalize";

function Posts() {
  const dispatch = useAppDispatch();

  const { getToken, isLoaded, isSignedIn, userId } = useAuth();

  const { selectedSite } = useSiteContext()
  const loading = useAppSelector(selectLoading)
  const posts = useAppSelector(selectPosts)

  useEffect(() => {

    if (!isLoaded || !isSignedIn || !userId || !selectedSite) return;
    if (!selectedSite?._id) return

    (async () => {
      try {
        const token = await getToken({ template: "backend" })

        if (!token) return

        await dispatch(fetchPostsThunk({ slug: selectedSite.slug, token })).unwrap()

      } catch (error) {
        console.error("error", error)
      }

    })()
  }, [dispatch, getToken, selectedSite, isLoaded, isSignedIn, userId])

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="h-92 bg-gray-200 animate-pulse rounded-lg" />
        ))}
      </div>
    )
  }

  if (posts.length === 0) {
    return selectedSite?.name ? (
      <p className="text-2xl font-semibold text-gray-800">You have no posts for {capitalize.words(selectedSite.name)} yet.</p>
    ) : null
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {posts.length > 0 && posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}

      </div>

    </>
  )
}

export default Posts