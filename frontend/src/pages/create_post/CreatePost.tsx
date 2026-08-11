import { useNavigate } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "@/hooks/redux_hooks";
import PostForm from "@/components/postform/PostForm"
import { type Post } from "@/interfaces/Post";
import { selectLoading } from "@/state/redux/reducers/post_slice";
import { selectError, setError } from "@/state/redux/reducers/site_slice";
import { createPostThunk } from "@/state/redux/thunks/post_thunk";
import { useAuth } from "@clerk/react";

type PostPayload = Omit<Post, "_id">;

function CreatePost() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const loading = useAppSelector(selectLoading);
    const error = useAppSelector(selectError);

    const { getToken } = useAuth();

    const handleCreatePost = async (data: PostPayload) => {
        try {

            const token = await getToken({ template: "backend" })

            const createdPost = await dispatch(createPostThunk({ data, token })).unwrap()

            navigate(`/posts/${createdPost._id}`);

        } catch (error: unknown) {
            console.error("Error creating post:", error);

            if (error && typeof error === 'object' && 'message' in error && typeof error.message === "string") {
                dispatch(setError("Failed to create post"))
            }
        }
    }
    return (
        <div className="min-h-screen max-w-5xl mx-auto">
            <p className="text-red-500 font-semibold">{error}</p>
            <PostForm onSubmit={handleCreatePost} loading={loading} />
        </div>
    )
}

export default CreatePost