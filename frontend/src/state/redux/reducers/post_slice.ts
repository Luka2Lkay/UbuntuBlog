import { type Post } from "@/interfaces/Post";
import { createSlice } from "@reduxjs/toolkit";

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

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setCurrentPost(state, action) {
      state.currentPost = action.payload;
    },
    addPost(state, action) {
      const newPost = action.payload ?? null;

      const index = state.posts.findIndex((post) => post._id === newPost._id);

      if (index === -1) {
        state.posts.unshift(newPost);
      } else {
        state.posts[index] = newPost;
      }
    },
  },
});
