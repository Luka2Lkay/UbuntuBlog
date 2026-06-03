import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchWithAuth,
  postWithAuth,
  deleteWithAuth,
} from "../../services/api";
import { type Site } from "../../interfaces/interface";
import { deleteSite } from "../reducers/site_slice";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

export const fetchSitesThunk = createAsyncThunk<
  Site[],
  string | null,
  { rejectValue: string }
>("site/fetchSites", async (token, { rejectWithValue }) => {
  try {
    const response = await fetchWithAuth(`${BASE_URL}/api/sites`, token);
    return response.data;
  } catch (error) {
    console.error("Error fetching sites:", error);
    return rejectWithValue("Failed to fetch sites");
  }
});

export const postSitesThunk = createAsyncThunk<
  Site,
  { siteData: Omit<Site, "_id">; token: string | null },
  { rejectValue: string }
>("site/postSite", async ({ siteData, token }, { rejectWithValue }) => {
  try {
    const response = await postWithAuth(
      `${BASE_URL}/api/sites`,
      siteData,
      token,
    );

    return response.data;
  } catch (error) {
    console.error("Error posting site data", error);
    return rejectWithValue("Failed to post site data");
  }
});

export const deleteSitesThunk = createAsyncThunk<
  string,
  { siteId: string; token: string | null },
  { rejectValue: string }
>(
  "site/deleteSites",
  async ({ siteId, token }, { dispatch, rejectWithValue }) => {
    try {
      const response = await deleteWithAuth(
        `${BASE_URL}/api/sites/${siteId}`,
        token,
      );

      dispatch(deleteSite(siteId));

      return response.data.message;
    } catch (error) {
      console.error("Error deleting site:", error);
      return rejectWithValue("Failed to delete site");
    }
  },
);
