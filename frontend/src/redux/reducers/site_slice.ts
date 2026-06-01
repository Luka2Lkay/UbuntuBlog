import { createSlice } from "@reduxjs/toolkit";

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
});

export const { setCurrentSite, addSite } = siteSlice.actions;
export default siteSlice.reducer;
