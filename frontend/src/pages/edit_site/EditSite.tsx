import { useEffect } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { type Site } from "@/interfaces/Site";
import SiteForm from "@/components/siteform/SiteForm";
import { useAppDispatch, useAppSelector } from "../../hooks/redux_hooks";
import { useAuth } from "@clerk/react";
import { fetchSiteThunk, updateSiteThunk } from "@/state/redux/thunks/site_thunk";
import { selectCurrentSite, selectLoading } from "@/state/redux/reducers/site_slice";

function EditSite() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { siteId } = useParams();

  const { getToken } = useAuth()

  const currentSite = useAppSelector(selectCurrentSite);
  const loading = useAppSelector(selectLoading)

  useEffect(() => {
    if (!siteId) return;

    (async () => {

      try {
        const token = await getToken({ template: "backend" });
        await dispatch(fetchSiteThunk({ siteId, token })).unwrap()

      } catch (error) {
        console.error("Error fetching site ", error)
      }
    })();

  }, [getToken, dispatch, siteId])

  const handleEdit = async (siteData: Site) => {

    if (!siteId) {
      throw new Error("No site id found!")
    }

    try {

      const token = await getToken({ template: "backend" });

      await dispatch(updateSiteThunk({ siteData, siteId, token })).unwrap();

      navigate(`/sites/${siteData._id}`);
    } catch (error) {
      console.error("Failed to update", error)
    }
  }


  if (!currentSite._id) {
    return <Navigate to="/sites/site-details" replace />;
  }

  return (
    <div className="max-w-4xl">
      <SiteForm initialData={currentSite} onSubmit={handleEdit} loading={loading} />
    </div>
  )
}

export default EditSite