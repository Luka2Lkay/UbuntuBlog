import { createContext, useState, useContext} from "react";
import { type Site } from "../interfaces/interface";

type ReactNode = React.ReactNode;

interface SiteContextType {
    selectedSite: Site | null;
    setSelectedSite: React.Dispatch<React.SetStateAction<Site | null>>;
}

interface SiteProviderProps {
    children: ReactNode;
}

export const SiteContext = createContext<SiteContextType | undefined>(undefined);

export function SiteProvider({ children }: SiteProviderProps) {
    const [selectedSite, setSelectedSite] = useState<Site | null>(null);

    return (
        <SiteContext.Provider value={{ selectedSite, setSelectedSite }}>
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