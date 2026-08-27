import { type PostFormData, type Post } from "@/interfaces/Post";
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPostsThunk,
  fetchPostThunk,
  updatePostThunk,
} from "@/state/redux/thunks/post_thunk";

interface PostState {
  currentPost: Post;
  posts: PostFormData[];
  error: string | null;
  loading: boolean;
}

const initialState: PostState = {
  currentPost: {
    _id: "",
    title: "",
    excerpt: "",
    content: "",
    featured: false,
    featuredImage: null,
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
    clearPosts(state) {
      state.posts = [];
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
        state.error = null;
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPostsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.posts = [];
      })
      .addCase(fetchPostsThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
        state.posts = [];
      })
      .addCase(fetchPostThunk.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.currentPost = action.payload;
      })
      .addCase(fetchPostThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(updatePostThunk.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        const updatedPost = action.payload;
        const index = state.posts.findIndex(
          (post) => post._id === updatedPost._id,
        );

        if (index !== 1) {
          state.posts[index] = updatedPost;
        } else {
          state.posts.unshift(updatedPost);
        }
      })
      .addCase(updatePostThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(updatePostThunk.pending, (state) => {
        state.error = null;
        state.loading = true;
      });
  },
});

export const selectPosts = (state: { post: PostState }) =>
  state.post.posts ?? [];
export const selectCurrentPost = (state: { post: PostState }) =>
  state.post.currentPost;
export const selectLoading = (state: { post: PostState }) => state.post.loading;
export const selectError = (state: { post: PostState }) => state.post.error;

export const {
  setCurrentPost,
  addPost,
  deletePost,
  setError,
  setLoading,
  clearPosts,
} = postSlice.actions;

export default postSlice.reducer;
