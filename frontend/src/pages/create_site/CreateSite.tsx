import SiteForm from "../../components/siteform/SiteForm"
import { useAuth } from "@clerk/react";
import { useNavigate } from "react-router-dom";
import { postSitesThunk } from "@/state/redux/thunks/site_thunk";
import { useAppDispatch, useAppSelector } from "../../hooks/redux_hooks";
import { type Site } from "@/interfaces/interface";
import { useSiteContext } from "@/state/context/SiteContext";
import { selectLoading } from "@/state/redux/reducers/site_slice";

function CreateSite() {

    const {getToken } = useAuth();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { setSelectedSite } = useSiteContext();

    const loading = useAppSelector(selectLoading);

    const handleCreateSite = async (data: Site) => {

        try {
            const token = await getToken({ template: "backend" });

            console.log("post data: ", data)
            const dispatchResult = await dispatch(postSitesThunk({ siteData: data, token }));
            const createdSite = dispatchResult.payload as Site;

            setSelectedSite(createdSite);

            navigate("/dashboard")

        } catch (error) {
            console.error("Error creating the site", error);
            throw new Error("Failed to create the site");
        }
    }

    return (
        <div>
            <SiteForm onSubmit={handleCreateSite} loading={loading} />
        </div>
    )
}

export default CreateSite