import { useState } from "react";
import { SiteContext } from "./SiteContext";
import { type Site } from "../../interfaces/interface";

type ReactNode = React.ReactNode;

interface SiteProviderProps {
    children: ReactNode;
}

export function SiteProvider({ children }: SiteProviderProps) {
    const [selectedSite, setSelectedSite] = useState<Site | null>(null);

    return (
        <SiteContext.Provider value={{ selectedSite, setSelectedSite }}>
            {children}
        </SiteContext.Provider>
    )
}