import { createContext} from "react";
import { type Site } from "../../interfaces/interface";

interface SiteContextType {
    selectedSite: Site | null;
    setSelectedSite: React.Dispatch<React.SetStateAction<Site | null>>;
}

export const SiteContext = createContext<SiteContextType | undefined>(undefined);

