import { createContext, useState, useContext } from "react";
import { useEffect } from "react";
import { fetchWithAuth } from "../services/api";
import { useAuth } from "@clerk/react"

type ReactNode = React.ReactNode;
interface Site {
    _id: string;
    name: string;
    slug: string;
    domain: string;
    niche: string;
}

interface SiteContextType {
    site: Site | null;
    sites: Site[];
    setSite: React.Dispatch<React.SetStateAction<Site | null>>;
    loadSites: () => Promise<void>;
}
interface SiteProviderProps {
    children: ReactNode;
}

export const SiteContext = createContext<SiteContextType | undefined>(undefined);

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

export function SiteProvider({ children }: SiteProviderProps) {
    const [site, setSite] = useState<Site | null>(null);
    const [sites, setSites] = useState<Site[]>([]);

    const { getToken } = useAuth();

    const loadSites = async () => {

        try {
            const token = await getToken({ template: "backend" });
            const response = await fetchWithAuth(`${BASE_URL}/api/sites`, token);

            setSites(response);

            if (response.length > 0) {
                const defaultSite = response[0];
                setSite(defaultSite);
            }
        } catch (error) {
            console.error("Error loading sites:", error);
        }
    };

    useEffect(() => {
        loadSites();
    }, []);

    return (
        <SiteContext.Provider value={{ sites, site, setSite, loadSites }}>
            {children}
        </SiteContext.Provider>
    )
}

export function useSiteContext() {
    const context = useContext(SiteContext);

    if (!context) {
        throw new Error("useSiteContext must be used within a SiteProvider");
    }

    return context;
}
