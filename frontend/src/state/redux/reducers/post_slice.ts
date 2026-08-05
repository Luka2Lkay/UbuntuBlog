import { type Post } from "@/interfaces/Post";

interface PostState {
  currentPost: Post | null;
  posts: Post[];
  error: string | null;
  loading: boolean;
}

const initialState: PostState = {
  currentPost: {
    _id: "",
    site: null,
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    category: "",
    tags: [""],
    published: false,
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: [""],
    },
  },
  posts: [],
  error: null,
  loading: false,
};
