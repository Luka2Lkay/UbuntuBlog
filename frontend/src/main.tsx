import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '@/App'
import { ClerkProvider } from "@clerk/react";
import { SiteProvider } from '@/state/context/SiteProvider.tsx';
import store from "@/state/redux/store";
import { Provider } from "react-redux";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <SiteProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </SiteProvider>
    </ClerkProvider>
  </StrictMode>,
)
