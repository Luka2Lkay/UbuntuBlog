import { useNavigate } from "react-router-dom"
// import { useSiteContext } from "../../state/context/useSiteContext"
import { useAppSelector } from "@/hooks/redux_hooks";
import PostForm from "@/components/postform/PostForm"
import { type Post } from "@/interfaces/Post";
import { selectLoading } from "@/state/redux/reducers/post_slice";
import { selectError } from "@/state/redux/reducers/site_slice";

type PostPayload = Omit<Post, "_id">;

function CreatePost() {
    // const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const loading = useAppSelector(selectLoading);
    const error = useAppSelector(selectError);

    const handleCreatePost = async (data: PostPayload) => {
        try {

            // setLoading(true);
            console.log(data)
            // Make API call to create post using axios

            navigate("/posts");

        } catch (error) {
            console.error("Error creating post:", error);
        } finally {
            // setLoading(false);
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