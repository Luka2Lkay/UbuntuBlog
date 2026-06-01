import { createAsyncThunk } from "@reduxjs/toolkit";
import {fetchWithAuth} from "../../services/api";
import { useAuth } from "@clerk/react";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

export const fetchSitesThunk = createAsyncThunk("site/fetchSites", async (_, { rejectWithValue }) => {

    const { getToken } = useAuth();

    try {
        const response = await fetchWithAuth(`${BASE_URL}/api/sites`, getToken);
        return response.data;
    } catch (error) {
        console.error("Error fetching sites:", error);
        return rejectWithValue("Failed to fetch sites");
    }
});

