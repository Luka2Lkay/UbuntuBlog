import React, { createContext, useState } from "react";

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
