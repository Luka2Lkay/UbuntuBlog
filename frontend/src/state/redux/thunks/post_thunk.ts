import { type PostFormData, type Post } from "@/interfaces/Post";
import {
  fetchWithAuth,
  createWithAuth,
  fetchOneWithAuth,
  deleteWithAuth,
} from "@/services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setCurrentPost,
  deletePost,
  addPost,
} from "@/state/redux/reducers/post_slice";
import { errorMessages } from "@/helpers/messages_helper";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_LIVE_URL;

export const fetchPostsThunk = createAsyncThunk<
  PostFormData[],
  { slug: string | undefined; token: string | null },
  { rejectValue: string }
>("posts/fetchPosts", async ({ slug, token }, { rejectWithValue }) => {
  try {
    const response = await fetchWithAuth(`${BASE_URL}/api/posts`, token, slug);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { data } = error.response ?? {};
      const message =
        data?.message ??
        data.errors[0].msg ??
        errorMessages.apiError("fetch", "posts");

      console.error(message);
      rejectWithValue(message);
    } else {
      console.error(`${errorMessages.apiError("fetch", "posts")}: `, error);
    }

    return rejectWithValue(errorMessages.apiError("fetch", "posts"));
  }
});

export const fetchPostThunk = createAsyncThunk<
  Post,
  { postId: string | undefined; token: string | null },
  { rejectValue: string }
>(
  "posts/fetchSite",
  async ({ postId, token }, { dispatch, rejectWithValue }) => {
    if (!token) {
      throw new Error(errorMessages.noToken);
    }

    try {
      const response = await fetchOneWithAuth(
        `${BASE_URL}/api/posts/${postId}`,
        token,
      );

      await dispatch(setCurrentPost(response.data));

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { data } = error.response ?? {};
        const message =
          data?.message ??
          data.errors[0].msg ??
          errorMessages.apiError("fetch", "post");

        console.error(message);
        rejectWithValue(message);
      } else {
        console.error(`${errorMessages.apiError("fetch", "post")}: `, error);
      }

      return rejectWithValue(errorMessages.apiError("fetch", "post"));
    }
  },
);

export const createPostThunk = createAsyncThunk<
  PostFormData,
  { data: FormData; token: string | null; slug: string },
  { rejectValue: string }
>(
  "posts/postSite",
  async ({ data, token, slug }, { dispatch, rejectWithValue }) => {
    try {
      const response = await createWithAuth(
        `${BASE_URL}/api/posts`,
        data,
        token,
        slug,
      );

      dispatch(addPost(response.data));
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { data } = error.response ?? {};
        const message =
          data?.message ??
          data.errors[0].msg ??
          errorMessages.apiError("create", "post");

        console.error("axios error", message);
        rejectWithValue(message);
      } else {
        console.error(`${errorMessages.apiError("create", "post")}: `, error);
      }

      return rejectWithValue(errorMessages.apiError("create", "post"));
    }
  },
);

export const deletePostThunk = createAsyncThunk<
  string,
  { postId: string | undefined; token: string | null },
  { rejectValue: string }
>(
  "posts/deletePost",
  async ({ postId, token }, { dispatch, rejectWithValue }) => {
    try {
      const response = await deleteWithAuth(
        `${BASE_URL}/api/posts/${postId}`,
        token,
      );
      dispatch(deletePost(postId));
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { data } = error.response ?? {};
        const message =
          data?.message ??
          data?.errors[0].msg ??
          errorMessages.apiError("delete", "post");

        console.error(message);
        rejectWithValue(message);
      } else {
        console.error(`${errorMessages.apiError("delete", "post")}: `, error);
      }

      return rejectWithValue(errorMessages.apiError("delete", "post"));
    }
  },
);
