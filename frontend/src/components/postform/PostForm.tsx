import { useContext, useMemo, useState } from "react";
import slugify from "slugify";
import { useSiteContext } from "../../context/SiteContext";
import Tiptap from "../tiptap/Tiptap";

type PostFormData = {
    title: string;
    slug: string;
    exerpt: string;
    content: string;
    featuredImage: string;
    category: string;
    tags: string[];
    published: boolean;
    seo: {
        metaTitle: string;
        metaDescription: string;
        keywords: string[]
    }
}

type Props = {
    initialData: Partial<PostFormData>;
    onSubmit: (data: PostFormData) => void;
    loading: boolean;
}

function PostForm() {
    return (
        <div>PostForm</div>
    )
}

export default PostForm