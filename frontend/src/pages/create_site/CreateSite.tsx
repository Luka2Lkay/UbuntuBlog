import SiteForm from "../../components/siteform/SiteForm"
import { useState } from "react"
import { useAuth } from "@clerk/react";
import { useNavigate } from "react-router-dom";

type SitePayload = {
    name: string;
    slug: string;
    domain: string;
    niche: string;
    userId: string | null | undefined;
}

function CreateSite() {

    const [loading, setLoading] = useState(false);
    const { userId } = useAuth();
    const navigate = useNavigate();

    const handleCreateSite = (data: Omit<SitePayload, "userId">) => {

        try {
            setLoading(true);

            const payload: SitePayload = {
                ...data,
                userId
            }

            // Post data using axios

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