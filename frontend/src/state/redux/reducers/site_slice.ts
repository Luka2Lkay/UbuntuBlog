import { createSlice } from "@reduxjs/toolkit";
import {
  fetchSitesThunk,
  postSitesThunk,
  deleteSiteThunk,
  fetchSiteThunk,
  updateSiteThunk,
} from "../thunks/site_thunk";
import { type Site } from "@/interfaces/interface";

interface SiteState {
  currentSite: Site | null;
  sites: Site[];
  loading: boolean;
  error: string | null;
}

const initialState: SiteState = {
  currentSite: null,
  sites: [],
  loading: true,
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
    deleteSite(state, action) {
      const siteId = action.payload;
      state.sites = state.sites.filter((site) => site._id !== siteId);
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
      .addCase(fetchSitesThunk.fulfilled, (state, action) => {
        state.sites = action.payload;
        state.loading = false;
      })
      .addCase(fetchSitesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSitesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(postSitesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.sites.unshift(action.payload);
      })
      .addCase(postSitesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postSitesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteSiteThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.sites = state.sites.filter((site) => site._id !== action.payload);
      })
      .addCase(deleteSiteThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSiteThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateSiteThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const updatedSite = action.payload;
        const index = state.sites.findIndex(
          (site) => site._id === updatedSite._id,
        );

        if (index !== -1) {
          state.sites[index] = updatedSite;
        } else {
          state.sites.unshift(updatedSite);
        }
      })
      .addCase(updateSiteThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSiteThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSiteThunk.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchSiteThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSiteThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectSites = (state: { site: SiteState }) =>
  state.site.sites ?? [];
export const selectError = (state: { site: SiteState }) => state.site.error;
export const selectLoading = (state: { site: SiteState }) => state.site.loading;
export const selectCurrentSite = (state: { site: SiteState }) =>
  state.site.currentSite;

export const { setCurrentSite, addSite, deleteSite, setError, setLoading } =
  siteSlice.actions;
export default siteSlice.reducer;
