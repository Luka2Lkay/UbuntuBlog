import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { type Site } from "../../interfaces/interface";
import SiteForm from "../../components/siteform/SiteForm";
import { useAppDispatch } from "../../hooks/redux_hooks";
import { useAuth } from "@clerk/react";
import { fetchSiteThunk } from "../../redux/thunks/site_thunk";

function EditSite() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { siteId } = useParams();

  const { getToken } = useAuth()

  useEffect(() => {

    // const [site, setSite] = useState<Site | null>(null)
    // const [loading, setLoading] = useState<boolean>(false)


    const fetchSite = async () => {
      // fetch site using redux thunk

      try {
        const token = await getToken({ template: "backend" });
        // const response = await dispatch(fetchSiteThunk({ siteId, token })).unwrap()

        console.log("id value", siteId);

      } catch (error) {
        console.error("Error fetching site ", error)
      }
    }
    fetchSite();
  })

  const handleEdit = (data: Site) => {

    if (!siteId) {
      throw new Error("No site id found!")
    }

    try {
    } catch (error) {
      console.error("Failed to update", error)
    }
  }

  return (
    <div className="max-w-4xl">
<p>Edit</p>
      {/* <SiteForm initialData={site} onSubmit={ } /> */}
    </div>
  )
}

export default EditSite