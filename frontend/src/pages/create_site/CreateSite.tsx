import SiteForm from "../../components/siteform/SiteForm"
import { useState } from "react"
import { useAuth } from "@clerk/react";
import { useNavigate } from "react-router-dom";
import { postSitesThunk } from "../../redux/thunks/site_thunk";
import { useAppDispatch } from "../../hooks/redux_hooks";
import { useSiteContext } from "../../context/SiteContext";

interface SitePayload {
    name: string;
    slug: string;
    domain: string;
    niche: string;
    userId: string | null | undefined;
}

interface Site {
    _id: string;
    name: string;
    slug: string;
    domain: string;
    niche: string;
}

function CreateSite() {

    const [loading, setLoading] = useState(false);
    const { userId, getToken } = useAuth();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {setSelectedSite} = useSiteContext();

    const handleCreateSite = async (data: Omit<SitePayload, "userId">) => {

        try {
            setLoading(true);

            const token = await getToken({ template: "backend" });
            const payload: SitePayload = {
                ...data,
                userId
            }


           const dispatchResult = await dispatch(postSitesThunk({ siteData: payload, token }));

            console.log("Site created successfully:", dispatchResult);
            // setSelectedSite(payload.name ? {
            //     _id: ,
            //     name: payload.name,
            //     slug: payload.slug,
            //     domain: payload.domain,
            //     niche: payload.niche
            // } : null);
            navigate("/dashboard")

        } catch (error) {
            console.error("Error creating the site", error);
            throw new Error("Failed to create the site");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <SiteForm onSubmit={handleCreateSite} loading={loading} />
        </div>
    )
}

export default CreateSite