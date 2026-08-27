export const BASE_URL = import.meta.env.VITE_BASE_LIVE_URL;
export const redirectUrl =
  import.meta.env.VITE_CLERK_SIGN_IN_FORCE_REDIRECT_URL || "/dashboard";
