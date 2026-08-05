import { configureStore } from "@reduxjs/toolkit";
import siteReducer from "@/state/redux/reducers/site_slice";

const store = configureStore({
    reducer: {
        site: siteReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;