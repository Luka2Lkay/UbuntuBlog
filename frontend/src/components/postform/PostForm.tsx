import { useMemo, useState, useEffect } from "react";
import slugify from "slugify";
import { useSiteContext } from "@/state/context/site/useSiteContext";
import axios from "axios"
import Tiptap from "@/components/tiptap/Tiptap";
import { type Post } from "@/interfaces/Post";
import { userInfoService } from "@/services/user_info_service";
import { useAuth } from "@clerk/react";
// import { useAppDispatch, useAppSelector } from "@/hooks/redux_hooks";
// import { selectCurrentSite } from "@/state/redux/reducers/site_slice";
// import { useParams } from "react-router-dom";
// import { usePostContext } from "@/state/context/post/usePostContext";

export type NewPost = Omit<Post, "_id" | "slug" | "site" | "author">;

interface Props {
    initialData?: Post | null;
    onSubmit: (data: Post) => void;
    loading: boolean;
}

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000"

function PostForm({ initialData, onSubmit, loading = false }: Props) {
    const { selectedSite } = useSiteContext();

    const [tagInput, setTagInput] = useState("");
    const [keywordInput, setKeywordInput] = useState("");
    const [userId, setUserId] = useState("")

    const { getToken } = useAuth();

    const [formData, setFormData] = useState<NewPost>({
        title: initialData?.title || "",
        excerpt: initialData?.excerpt || "",
        content: initialData?.content || "",
        featuredImage: initialData?.featuredImage || "",
        category: initialData?.category || "",
        tags: initialData?.tags || [],
        published: initialData?.published || false,
        seo: {
            metaTitle: initialData?.seo?.metaTitle || "",
            metaDescription: initialData?.seo?.metaDescription || "",
            keywords: initialData?.seo?.keywords || []
        },
        publishedAt: initialData?.publishedAt || ""
    })


    useEffect(() => {
        (async () => {
            try {
                const token = await getToken({ template: "backend" })
                const response = await userInfoService(token);
                setUserId(response.id)
            } catch (error) {
                console.error("Error loading user response: ", error)
            }

        })()
    }, [getToken])

    const slug = useMemo(() => {

        if (!formData.title) return "";

        return slugify(formData.title, {
            lower: true,
            strict: true,
            trim: true
        })

    }, [formData.title])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {

        const { name, value, type } = e.target;

        setFormData((prev) => (
            {
                ...prev,
                [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
            }
        ))
    }

    const handleSeoChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => (
            {
                ...prev,
                seo: {
                    ...prev.seo,
                    [name]: value
                }
            }
        ))
    }

    const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files?.[0];

        if (!file) return;

        try {
            const formData = new FormData();

            formData.append("image", file);

            const response = await axios.post(`${BASE_URL}`, formData);

            const imageUrl = response.data.url;

            setFormData(prev => ({
                ...prev,
                featuredImage: imageUrl
            }))

        } catch (error) {
            console.error("Failed to upload featured image", error)
        }
    }

    const addTag = () => {
        const tag = tagInput.trim();

        if (!tag) return;

        setFormData((prev) => {
            const tagExists = prev.tags.some(
                (existingTag) => existingTag.toLowerCase() === tag.toLowerCase()
            );

            if (tagExists) return prev;

            return {
                ...prev,
                tags: [...prev.tags, tag],
            };
        });

        setTagInput("");
    };

    const removeTag = (name: string) => {

        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== name)
        }))
    }

    const addKeyword = () => {

        const keyword = keywordInput.trim();

        if (!keyword) return;

        setFormData(prev => {

            const keywordExists = prev.seo.keywords.some((existingKeyword) => existingKeyword.toLocaleLowerCase() === keywordInput.toLocaleLowerCase())

            if (keywordExists) return prev;

            return {
                ...prev,
                seo: {
                    ...prev.seo,
                    keywords: [...prev.seo.keywords, keywordInput.toLowerCase().trim()]
                }
            }
        })

        setKeywordInput("");
    }

    const removeKeyword = (name: string) => {

        setFormData(prev => (
            {
                ...prev,
                seo: {
                    ...prev.seo,
                    keywords: prev.seo.keywords.filter(keyword => keyword !== name)
                }
            }
        ))
    }

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const site = selectedSite?._id as string;
        const author = userId
        const payload = { ...formData, slug, site, author }

        if (payload.published) {
            payload.publishedAt = new Date().toISOString()
        }

        onSubmit(payload);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl mx-auto px-4 sm:px-0">

            <div className="bg-white border rounded-xl p-6 space-y-5">
                <div>
                    <h2 className="text-xl font-semibold">Blog Post</h2>
                    <p className="text-sm text-gray-500">Publishing for {" "} <span className="font-medium">{selectedSite?.name}</span></p>
                </div>

                <div>
                    <label className="block text-left text-sm font-medium mb-2">Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter title..." className="w-full border rounded-lg px-4 py-3" required />
                </div>

                <div>
                    <label className="block text-left text-sm font-medium mb-2">Slug</label>
                    <input type="text" name="slug" value={slug || ""} onChange={handleChange} className="w-full border rounded-lg px-4 py-3 bg-gray-300" readOnly />
                </div>

                <div>
                    <label className="block text-left text-sm font-medium mb-2">Excerpt</label>
                    <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} placeholder="Short blog summary..." className="w-full border rounded-lg px-4 py-3" rows={4} maxLength={500} required />
                </div>

                <div>
                    <label className="block text-left text-sm font-medium mb-2">Category</label>
                    <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="e.g., Plumbing" className="w-full border rounded-lg px-4 py-3" />
                </div>

                <div>
                    <label className="block text-left text-sm font-medium mb-2">Tags</label>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="e.g., leaking pipes" className="flex-1 border rounded-lg px-4 py-3" />
                        <button type="button" onClick={addTag} className="w-full sm:w-auto px-4 bg-gray-900 text-white rounded-lg cursor-pointer">Add Tag</button>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                        {formData.tags.length > 0 && (formData.tags.map((tag, index) => (
                            <button key={index} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm mt-1" onClick={() => removeTag(tag)}>
                                {tag.toLowerCase()} <span className="ml-1 text-gray-500 cursor-pointer" onClick={(e) => {
                                    e.stopPropagation();
                                    removeTag(tag);
                                }}>&times;</span>
                            </button>
                        )))}
                    </div>
                </div>

                <div>
                    <label className="block text-left text-sm font-medium mb-2">Featured Image</label>
                    <input type="file" accept="image/*" onChange={handleFeaturedImageUpload} className="w-full cursor-pointer" />
                    {formData.featuredImage && (<img src={formData.featuredImage} alt="Featured" className="mt-4 w-full max-h-60 object-cover rounded-lg" />)}
                </div>

                <div>
                    <label className="block text-left text-sm font-medium mb-2">Content</label>
                    <Tiptap content={formData.content} onChange={(content) => setFormData(prev => ({ ...prev, content }))} />
                </div>

                <div className="bg-white border rounded-xl p-6 space-y-5">
                    <h2 className="text-lg font-semibold">SEO Settings</h2>

                    <div>
                        <label className="block text-left text-sm font-medium mb-2">Meta Title</label>
                        <input type="text" name="metaTitle" value={formData.seo.metaTitle} onChange={handleSeoChange} placeholder="SEO meta title..." className="w-full border rounded-lg px-4 py-3" />
                    </div>

                    <div>
                        <label className="block text-left text-sm font-medium mb-2">Meta Description</label>
                        <textarea name="metaDescription" value={formData.seo.metaDescription} onChange={handleSeoChange} placeholder="SEO meta description..." className="w-full border rounded-lg px-4 py-3" rows={3} maxLength={160} />
                    </div>

                    <div>
                        <label className="block text-left text-sm font-medium mb-2">SEO Keywords</label>
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <input type="text" value={keywordInput} onChange={(e) => setKeywordInput(e.target.value)} placeholder="e.g., home improvement" className="flex-1 border rounded-lg px-4 py-3" />
                            <button type="button" onClick={addKeyword} className="w-full sm:w-auto px-4 bg-gray-900 text-white rounded-lg cursor-pointer">Add Keyword</button>
                        </div>

                        {
                            formData.seo.keywords.length > 0 && (formData.seo.keywords.map((keyword, index) => (
                                <button type="button" key={index} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm mt-1" onClick={() => removeKeyword(keyword)}>
                                    {keyword.toLowerCase()} <span className="ml-1 text-gray-500 cursor-pointer hover:text-red-500" onClick={(e) => {
                                        e.stopPropagation();
                                        removeKeyword(keyword);
                                    }}>&times;</span>
                                </button>
                            )))
                        }
                    </div>
                </div>
            </div>

            <div className="bg-white border rounded-xl p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <input type="checkbox" name="published" checked={formData.published} onChange={handleChange} />
                        <label className="text-sm">Publish immediately</label>
                    </div>

                    <button type="submit" disabled={loading} className="w-full sm:w-auto mt-0 sm:mt-0 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-black disabled:bg-gray-400 transition cursor-pointer">
                        {
                            loading
                                ? "Saving..."
                                : formData.published
                                    ? initialData
                                        ? "Update Post"
                                        : "Publish Post"
                                    : initialData
                                        ? "Update Draft"
                                        : "Save Draft"
                        }
                    </button>
                </div>
            </div>
        </form>
    )
}

export default PostForm