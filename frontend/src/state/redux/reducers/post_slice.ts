import { type Post } from "@/interfaces/Post";
import { createSlice } from "@reduxjs/toolkit";
import { fetchPostsThunk } from "@/state/redux/thunks/post_thunk";

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
    deletePost(state, action) {
      const postId = action.payload;
      state.posts = state.posts.filter((post) => post._id !== postId);
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsThunk.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.error = null;
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPostsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostsThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const selectPosts = (state: { post: PostState }) =>
  state.post.posts ?? [];
export const selectCurrentPost = (state: { post: PostState }) =>
  state.post.currentPost;
export const selectLoading = (state: { post: PostState }) => state.post.loading;
export const selectError = (state: { post: PostState }) => state.post.error;

export default postSlice.reducer;
