import { type Post } from "@/interfaces/Post";
import { fetchWithAuth, createWithAuth } from "@/services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { errorMessages } from "@/helpers/messages_helper";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_LOCAL_BASE_URL; // change to live

type NewPost = Omit<Post, "_id">;

export const fetchPostThunk = createAsyncThunk<
  Post[],
  string | null,
  { rejectValue: string }
>("posts/fetchPosts", async (token, { rejectWithValue }) => {
  try {
    const response = await fetchWithAuth(`${BASE_URL}/api/posts`, token);

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

export const createPostThunk = createAsyncThunk<
  Post,
  { data: NewPost; token: string | null },
  { rejectValue: string }
>("posts/postSite", async ({ data, token }, { rejectWithValue }) => {
  try {
    const response = await createWithAuth(`${BASE_URL}/api/posts`, data, token);

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
});
