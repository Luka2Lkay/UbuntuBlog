import { useEffect } from "react"
import { useAuth } from "@clerk/react"
import { useAppDispatch, useAppSelector } from "@/hooks/redux_hooks";
import { selectPosts } from "@/state/redux/reducers/post_slice";
import PostCard from "@/components/post_card/PostCard"
import { fetchPostsThunk } from "@/state/redux/thunks/post_thunk";

function Posts() {
  const dispatch = useAppDispatch();

  const { getToken } = useAuth();

  const posts = useAppSelector(selectPosts)

  useEffect(() => {

    if (posts.length > 0) return;

    (async () => {
      try {
        const token = await getToken({ template: "backend" })

        if (!token) return
        await dispatch(fetchPostsThunk(token)).unwrap()


      } catch (error) {
        console.error("error", error)
      }

    })()
  }, [posts.length, dispatch, getToken])
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {posts.length > 0 ? (posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))) : (
        <p className="text-2xl w-full font-semibold text-gray-800">You have no posts yet.</p>
      )}
    </div>
  )
}

export default Posts