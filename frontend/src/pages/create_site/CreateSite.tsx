import SiteForm from "../../components/siteform/SiteForm"
import { useState } from "react"
import { useAuth } from "@clerk/react";
import { useNavigate } from "react-router-dom";
import { postSitesThunk } from "../../redux/thunks/site_thunk";
import { useAppDispatch } from "../../hooks/redux_hooks";

type SitePayload = {
    name: string;
    slug: string;
    domain: string;
    niche: string;
    userId: string | null | undefined;
}

function CreateSite() {

    const [loading, setLoading] = useState(false);
    const { userId, getToken } = useAuth();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleCreateSite = async (data: Omit<SitePayload, "userId">) => {

        try {
            setLoading(true);

            const token = await getToken({ template: "backend" });
            const payload: SitePayload = {
                ...data,
                userId
            }

            dispatch(postSitesThunk({ siteData: payload, token }));

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