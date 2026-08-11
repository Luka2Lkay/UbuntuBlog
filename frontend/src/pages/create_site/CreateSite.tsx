import SiteForm from "@/components/siteform/SiteForm"
import { useAuth } from "@clerk/react";
import { useNavigate } from "react-router-dom";
import { createSiteThunk } from "@/state/redux/thunks/site_thunk";
import { useAppDispatch, useAppSelector } from "@/hooks/redux_hooks";
import { type Site } from "@/interfaces/Site";
import { useSiteContext } from "@/state/context/site/useSiteContext";
import { selectLoading, setError, selectError } from "@/state/redux/reducers/site_slice";

type NewSite = Omit<Site, "_id">

function CreateSite() {

    const { getToken } = useAuth();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { setSelectedSite } = useSiteContext();

    const loading = useAppSelector(selectLoading);
    const error = useAppSelector(selectError);

    const handleCreateSite = async (data: NewSite) => {

        try {
            const token = await getToken({ template: "backend" });
            const dispatchResult = await dispatch(createSiteThunk({ siteData: data, token })).unwrap();
            const createdSite = dispatchResult as Site;

            console.log("created site: ", createdSite)
            setSelectedSite(createdSite);
            navigate(`/sites/${createdSite._id}`);

        } catch (error: unknown) {
            console.error("Error creating the site", error);

            if (error && typeof error === 'object' && "message" in error && typeof error.message === "string") {
                dispatch(setError("Failed to create site"))
            }
        }
    }

    return (
        <div>
            <p className="text-red-500 font-semibold">{error}</p>
            <SiteForm onSubmit={handleCreateSite} loading={loading} />
        </div>
    )
}

export default CreateSite