import { useNavigate } from "react-router-dom"
import { useSiteContext } from "../../context/SiteContext"
import PostForm from "../../components/postform/PostForm"
import { useState } from "react"

type PostPayload = {
    site: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featuredImage: string;
    category: string;
    tags: string[];
    published: boolean;
    seo: {
        metaTitle: string;
        metaDescription: string;
        keywords: string[]
    },
}

function CreatePost() {
    const navigate = useNavigate();
    const { site } = useSiteContext();
    const [loading, setLoading] = useState(false);

    const handleCreatePost = async (data: Omit<PostPayload, "site">) => {
        try {
            setLoading(true);

            const payload: PostPayload = {
                ...data,
                site,
            }

            // Make API call to create post using axios

            navigate("/posts");

        } catch (error) {
            console.error("Error creating post:", error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="min-h-screen max-w-5xl mx-auto">
            <PostForm onSubmit={handleCreatePost} loading={loading} />
        </div>
    )
}

export default CreatePost