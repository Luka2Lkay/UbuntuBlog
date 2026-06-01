import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWithAuth } from "../../services/api";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

interface Site {
  _id: string;
  name: string;
  slug: string;
  domain: string;
  niche: string;
}

export const fetchSitesThunk = createAsyncThunk<
  Site[], string | null, { rejectValue: string }
>("site/fetchSites", async (token, { rejectWithValue }) => {
  try {
    const response = await fetchWithAuth(`${BASE_URL}/api/sites`, token);
    return response;
  } catch (error) {
    console.error("Error fetching sites:", error);
    return rejectWithValue("Failed to fetch sites");
  }
});
