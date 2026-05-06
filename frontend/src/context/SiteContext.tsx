import React, { createContext, useState, useContext } from "react";

type ReactNode = React.ReactNode;
type SiteContextType = {
    site: string;
    setSite: React.Dispatch<React.SetStateAction<string>>;
}
type SiteProviderProps = {
    children: ReactNode;
}

export const SiteContext = createContext<SiteContextType | undefined>(undefined);

export function SiteProvider({ children }: SiteProviderProps) {
    const [site, setSite] = useState("Home of Commerce");

    return (
        <SiteContext.Provider value={{ site, setSite }}>
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
