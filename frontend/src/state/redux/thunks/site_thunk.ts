import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchWithAuth,
  createWithAuth,
  deleteWithAuth,
  fetchOneWithAuth,
  updateWithAuth,
} from "@/services/api";
import { type Site } from "@/interfaces/Site";
import { deleteSite, setCurrentSite } from "@/state/redux/reducers/site_slice";
import { errorMessages } from "@/helpers/messages_helper";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_LOCAL_URL;

type NewSite = Omit<Site, "_id">;

export const fetchSitesThunk = createAsyncThunk<
  Site[],
  string | null,
  { rejectValue: string }
>("sites/fetchSites", async (token, { rejectWithValue }) => {
  try {
    const response = await fetchWithAuth(`${BASE_URL}/api/sites`, token);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { data } = error.response ?? {};
      const message =
        data?.message ??
        data?.errors[0]?.msg ??
        errorMessages.apiError("fetch", "sites");

      console.error(message);
      rejectWithValue(message);
    } else {
      console.error(`${errorMessages.apiError("fetch", "sites")}: `, error);
    }

    return rejectWithValue(errorMessages.apiError("fetch", "sites"));
  }
});

export const fetchSiteThunk = createAsyncThunk<
  Site,
  { siteId: string | undefined; token: string | null },
  { rejectValue: string }
>(
  "sites/fetchSite",
  async ({ siteId, token }, { dispatch, rejectWithValue }) => {
    if (!token) {
      throw new Error(errorMessages.noToken);
    }

    try {
      const response = await fetchOneWithAuth(
        `${BASE_URL}/api/sites/${siteId}`,
        token,
      );

      dispatch(setCurrentSite(response.data.site));

      return response.data.site;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { data } = error.response ?? {};
        const message =
          data?.message ??
          data?.errors[0]?.msg ??
          errorMessages.apiError("fetch", "site");

        console.error("axios error: ", message);
        rejectWithValue(message);
      } else {
        console.error(`${errorMessages.apiError("fetch", "site")}: `, error);
      }
      return rejectWithValue(errorMessages.apiError("fetch", "site"));
    }
  },
);

export const createSiteThunk = createAsyncThunk<
  Site,
  { siteData: NewSite; token: string | null },
  { rejectValue: string }
>("sites/postSite", async ({ siteData, token }, { rejectWithValue }) => {
  try {
    const response = await createWithAuth(
      `${BASE_URL}/api/sites`,
      siteData,
      token,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { data } = error.response ?? {};
      const message =
        data?.message ??
        data?.errors[0]?.msg ??
        errorMessages.apiError("create", "site");

      console.error("axios error: ", message);

      return rejectWithValue(message);
    } else {
      console.error(`${errorMessages.apiError("create", "site")}: `, error);
    }
    return rejectWithValue(errorMessages.apiError("create", "site"));
  }
});

export const updateSiteThunk = createAsyncThunk<
  Site,
  { siteData: Site; siteId: string; token: string | null },
  { rejectValue: string }
>(
  "sites/updateSite",
  async ({ siteData, siteId, token }, { dispatch, rejectWithValue }) => {
    if (!token) {
      throw new Error(errorMessages.noToken);
    }

    try {
      const response = await updateWithAuth(
        `${BASE_URL}/api/sites/${siteId}`,
        siteData,
        token,
      );

      dispatch(setCurrentSite(response.data));
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { data } = error.response ?? {};
        const message =
          data?.message ??
          data?.errors[0]?.msg ??
          errorMessages.apiError("update", "site");

        console.error("axios error: ", message);
        return rejectWithValue(message);
      } else {
        console.error(`${errorMessages.apiError("update", "site")}: `, error);
      }
      return rejectWithValue(errorMessages.apiError("update", "site"));
    }
  },
);

export const deleteSiteThunk = createAsyncThunk<
  string,
  { siteId: string | undefined; token: string | null },
  { rejectValue: string }
>(
  "sites/deleteSites",
  async ({ siteId, token }, { dispatch, rejectWithValue }) => {
    try {
      const response = await deleteWithAuth(
        `${BASE_URL}/api/sites/${siteId}`,
        token,
      );

      dispatch(deleteSite(siteId));

      return response.data.message;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { data } = error.response ?? {};
        const message =
          data?.message ??
          data?.errors[0]?.msg ??
          errorMessages.apiError("delete", "sites");

        console.error("axios error: ", message);
        rejectWithValue(message);
      } else {
        console.error(`${errorMessages.apiError("delete", "site")}: `, error);
      }

      return rejectWithValue(errorMessages.apiError("delete", "site"));
    }
  },
);
