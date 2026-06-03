import SiteForm from "../../components/siteform/SiteForm"
import { useState } from "react"
import { useAuth } from "@clerk/react";
import { useNavigate } from "react-router-dom";
import { postSitesThunk } from "../../redux/thunks/site_thunk";
import { useAppDispatch } from "../../hooks/redux_hooks";
import { type SitePayload, type Site } from "../../interfaces/interface";
import { useSiteContext } from "../../context/SiteContext";

function CreateSite() {

    const [loading, setLoading] = useState(false);
    const { userId, getToken } = useAuth();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { setSelectedSite } = useSiteContext();

    const handleCreateSite = async (data: SitePayload) => {

        try {
            setLoading(true);

            const token = await getToken({ template: "backend" });
            const payload: SitePayload = {
                ...data,
                userId
            }


            const dispatchResult= await dispatch(postSitesThunk({ siteData: payload, token }));

            const createdSite= dispatchResult.payload as Site;

            console.log("Site created successfully:", createdSite.name);
            // setSelectedSite(createdSite);

            setSelectedSite(createdSite.name ? {
                _id: createdSite._id,
                name: createdSite.name,
                slug: payload.slug,
                domain: payload.domain,
                niche: payload.niche,
                userId: payload.userId
            } : null);
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