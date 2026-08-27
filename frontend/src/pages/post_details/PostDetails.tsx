import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/hooks/redux_hooks";
import { useAuth } from "@clerk/react";
import { fetchPostThunk, deletePostThunk } from "@/state/redux/thunks/post_thunk";
import { selectCurrentPost } from "@/state/redux/reducers/post_slice";
import { FileText, Search } from "lucide-react";
import capitalize from "capitalize";
import ConfirmationModal from "@/components/confirmation_modal/ConfirmationModal";

function PostDetails() {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false)

    const { postId } = useParams();

    const currentPost = useAppSelector(selectCurrentPost);

    const { getToken, isLoaded, isSignedIn } = useAuth()
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isLoaded) return;

        if (!isSignedIn) {
            navigate("/sign-in")
            return
        };

        if (!postId) return

        (async () => {
            try {
                const token = await getToken({ template: "backend" })
                if (!token) return

                await dispatch(fetchPostThunk({ postId, token })).unwrap()
            } catch (error) {
                console.error("Error loading post details: ", error)
            }
        })()
    }, [dispatch, getToken, isLoaded, isSignedIn, navigate, postId])

    const handleDelete = async () => {

        try {
            const token = await getToken({ template: "backend" })
            await dispatch(deletePostThunk({ postId, token })).unwrap()

            navigate("/posts")
        } catch (error) {
            console.error("Error deleting the post: ", error)
        }
    }

    return (
        <div className='space-y-6'>
            <section>
                <div className="flex flex-col gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">{currentPost.title}</h1>
                    </div>

                    <div className="flex gap-2 justify-around">
                        <Link to={`/posts/${currentPost._id}/edit`} className="rounded-lg w-full bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
                            Edit
                        </Link>

                        <button type="button" onClick={() => setOpen(true)} className="rounded-lg w-full border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
                            Delete
                        </button>
                    </div>
                </div>
            </section>

            <section>

                <h3 className="mb-3 flex items-center gap-2 font-semibold text-gray-900">
                    <FileText size={18} />
                    Post Information</h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <DetailItem label="Title" value={currentPost.title} />
                    <DetailItem label="slug" value={currentPost.slug} />
                    <DetailItem label="Category" value={capitalize.words(currentPost.category)} />
                    <DetailItem label="status" value={currentPost.published ? "Published" : "Draft"} />
                </div>
            </section>

            <section>
                <h3 className="mb-3 font-semibold text-gray-900">
                    Content
                </h3>

                <div className="prose max-w-none rounded-lg border border-gray-200 p-4" dangerouslySetInnerHTML={{ __html: currentPost.content }} />
            </section>

            <section>
                <h3 className="mb-3 flex items-center gap-2 font-semibold text-gray-900">
                    <Search size={18} />
                    SEO
                </h3>

                <div className="space-y-4 rounded-lg bg-gray-50 p-">
                    <DetailItem label="Meta Title" value={currentPost.seo.metaTitle} />
                    <DetailItem label="Meta Description" value={currentPost.seo.metaDescription} />
                </div>

                <div>
                    <p className="mb-2 text-xs font-medium uppercase text-gray-500">Keywords</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                        {currentPost.seo.keywords.map((keyword) => (
                            <span key={keyword} className="rounded-md bg-white px-2 py-1 text-xs text-gray-600 ring-1 ring-gray-200">{keyword}</span>
                        ))}
                    </div>
                </div>
            </section>

            <ConfirmationModal isOpen={open} title={`Delete This Post`} message="This action cannot be undone" confirmText="Delete" onConfirm={handleDelete} onCancel={() => setOpen(false)} cancelText="Cancel" danger={true} />
        </div>
    )
}

function DetailItem({ label, value }: { label: string, value: string | undefined }) {
    return (
        <div>
            <p className="text-xs font-medium uppercase text-gray-500">{label}</p>
            <p className="mt-1 break-words text-sm text-gray-900">{value || "-"}</p>
        </div>
    )
}

export default PostDetails