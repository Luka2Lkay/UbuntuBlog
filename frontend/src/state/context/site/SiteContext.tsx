import { createContext, type Dispatch, type SetStateAction } from "react";
import { type Site } from "@/interfaces/Site";

interface SiteContextType {
    selectedSite: Site | null;
    setSelectedSite: Dispatch<SetStateAction<Site | null>>;
}

export const SiteContext = createContext<SiteContextType | undefined>(undefined);

