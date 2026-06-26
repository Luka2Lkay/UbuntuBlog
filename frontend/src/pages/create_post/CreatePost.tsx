// import { useNavigate } from "react-router-dom"
// import { useSiteContext } from "../../state/context/useSiteContext"
// import PostForm from "../../components/postform/PostForm"
// import { useState } from "react"
// import { type Post } from "../../interfaces/interface";

// type PostPayload = Omit<Post, "_id">;

function CreatePost() {
    // const navigate = useNavigate();
    // const [loading, setLoading] = useState(false);

    // const handleCreatePost = async (data: PostPayload) => {
    //     try {
    //         setLoading(true);

    //         // Make API call to create post using axios

    //         navigate("/posts");

    //     } catch (error) {
    //         console.error("Error creating post:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // }
    return (
        <div className="min-h-screen max-w-5xl mx-auto">
            <p>create</p>
            {/* <PostForm onSubmit={handleCreatePost} loading={loading} /> */}
        </div>
    )
}

export default CreatePost