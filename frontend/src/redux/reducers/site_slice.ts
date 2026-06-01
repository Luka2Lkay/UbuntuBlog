import { createSlice } from "@reduxjs/toolkit";
import { fetchSitesThunk } from "../thunks/site_thunk";

interface Site {
  _id: string;
  name: string;
  slug: string;
  domain: string;
  niche: string;
}

interface SiteState {
  currentSite: Site | null;
  sites: Site[];
  loading: boolean;
  error: string | null;
}

const initialState: SiteState = {
  currentSite: null,
  sites: [],
  loading: false,
  error: null,
};

const siteSlice = createSlice({
  name: "site",
  initialState,
  reducers: {
    setCurrentSite(state, action) {
      state.currentSite = action.payload;
    },
    addSite(state, action) {
      const newSite = action.payload ?? null;

      const index = state.sites.findIndex((site) => site._id === newSite._id);

      if (index === -1) {
        state.sites.unshift(newSite);
      } else {
        state.sites[index] = newSite;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSitesThunk.fulfilled, (state, action) => {
      state.sites = action.payload;
      state.loading = false;
    }).addCase(fetchSitesThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    }).addCase(fetchSitesThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  }
});

export const selectSites = (state: { site: SiteState }) => state.site.sites ?? [];

export const { setCurrentSite, addSite } = siteSlice.actions;
export default siteSlice.reducer;