import SiteForm from "@/components/siteform/SiteForm"
import { useAuth } from "@clerk/react";
import { useNavigate } from "react-router-dom";
import { postSiteThunk } from "@/state/redux/thunks/site_thunk";
import { useAppDispatch, useAppSelector } from "@/hooks/redux_hooks";
import { type Site } from "@/interfaces/Site";
import { useSiteContext } from "@/state/context/useSiteContext";
import { selectLoading } from "@/state/redux/reducers/site_slice";
import { selectError } from "@/state/redux/reducers/site_slice";

type NewSite = Omit<Site, "_d">

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
            const dispatchResult = await dispatch(postSiteThunk({ siteData: data, token })).unwrap();
            const createdSite = dispatchResult as Site;

            setSelectedSite(createdSite);
            navigate(`/sites/${data._id}`);

        } catch (error) {
            console.error("Error creating the site", error);
            throw new Error("Failed to create the site");
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