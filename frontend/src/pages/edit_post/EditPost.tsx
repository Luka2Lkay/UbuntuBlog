import { useEffect } from "react"
import { useParams, Navigate, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/hooks/redux_hooks"
import { fetchPostThunk, updatePostThunk } from "@/state/redux/thunks/post_thunk"
import { selectCurrentPost, selectLoading } from "@/state/redux/reducers/post_slice"
import PostForm from "@/components/postform/PostForm"
import { useAuth } from "@clerk/react"

function EditPost() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { postId } = useParams()
  const { getToken } = useAuth()

  const currentPost = useAppSelector(selectCurrentPost)
  const loading = useAppSelector(selectLoading)

  useEffect(() => {

    if (!postId) return;

    (async () => {
      const token = await getToken({ template: "backend" })

      try {
        await dispatch(fetchPostThunk({ postId, token })).unwrap()
      } catch (error) {
        console.error("Error fetching post: ", error)
      }
    })()

  }, [getToken, dispatch, postId])

  const handleEdit = async (postData: FormData) => {

    if (!postId) {
      throw new Error("No post id found!")
    }


    try {
      const token = await getToken({ template: "backend" })
      await dispatch(updatePostThunk({ postData, token, postId }))
      navigate(`/posts/${postId}`)
    } catch (error) {
      console.error("Failed to update", error)
    }
  }


  if (!currentPost._id) {
    <Navigate to="/posts/post-details" replace />
  }

  return (
    <div className="max-w-4xl">
      <PostForm initialData={currentPost} loading={loading} onSubmit={handleEdit} />
    </div>
  )
}

export default EditPost