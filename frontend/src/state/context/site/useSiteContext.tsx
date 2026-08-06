import { SiteContext } from "@/state/context/site/SiteContext";
import { useContext } from "react";

export function useSiteContext() {
    const context = useContext(SiteContext);

    if (!context) {
        throw new Error("useSiteContext must be used within a SiteProvider");
    }

    return context;
}