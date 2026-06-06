import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { type Site } from "../../interfaces/interface";
import SiteForm from "../../components/siteform/SiteForm";
import { useAppDispatch, useAppSelector } from "../../hooks/redux_hooks";
import { useAuth } from "@clerk/react";
import { fetchSiteThunk } from "../../redux/thunks/site_thunk";
import { selectCurrentSite, selectLoading } from "../../redux/reducers/site_slice";

type SiteData = Omit<Site, "_id">;

function EditSite() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { siteId } = useParams();

  const { getToken } = useAuth()

  const currentSite = useAppSelector(selectCurrentSite);
  const loading = useAppSelector(selectLoading)

  useEffect(() => {

    const fetchSite = async () => {

      try {
        const token = await getToken({ template: "backend" });
        await dispatch(fetchSiteThunk({ siteId, token })).unwrap()

      } catch (error) {
        console.error("Error fetching site ", error)
      }
    }
    fetchSite();
  }, [getToken, dispatch])

  const handleEdit = async (data: Site) => {

    if (!siteId) {
      throw new Error("No site id found!")
    }

    try {

      const token = await getToken({ template: "backend" });

      await dispatch(fetchSiteThunk({ siteId: data._id, token }))

    } catch (error) {
      console.error("Failed to update", error)
    }
  }

  return (
    <div className="max-w-4xl">
      <p>Edit</p>
      <SiteForm initialData={currentSite} onSubmit={handleEdit} loading={loading} />
    </div>
  )
}

export default EditSite