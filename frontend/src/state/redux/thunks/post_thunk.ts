import { type Post } from "@/interfaces/Post";
import { fetchWithAuth, postWithAuth } from "@/services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { errorMessages } from "@/helpers/messages_helper";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_LIVE_BASE_URL;

type NewPost = Omit<Post, "_id">;

export const fetchPostThunks = createAsyncThunk<
  Post[],
  string | null,
  { rejectValue: string }
>("posts/fetchPosts", async (token, { rejectWithValue }) => {
  try {
    const response = await fetchWithAuth(`${BASE_URL}/api/posts`, token);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      rejectWithValue(
        error.response?.data?.message ??
          errorMessages.apiError("fetch", "posts"),
      );
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
    const response = await postWithAuth(`${BASE_URL}/api/posts`, data, token);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      rejectWithValue(
        error.response?.data?.message ??
          errorMessages.apiError("create", "post"),
      );
    }
  }
});
