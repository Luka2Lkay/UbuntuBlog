import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { type Site } from "../../interfaces/interface";
import SiteForm from "../../components/siteform/SiteForm";
import { useAppDispatch } from "../../hooks/redux_hooks";

function EditSite() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {

    const [site, setSite] = useState<Site | null>(null)
    // const [loading, setLoading] = useState<boolean>(false)

    const fetchSite = async () => {
      // fetch site using redux thunk
    }
    fetchSite();
  })

  const handleEdit = (data: Site) => {

    if (!id) {
      throw new Error("No site id found!")
    }

    try {
    } catch (error) {
      console.error("Failed to update", error)
    }
  }

  return (
    <div className="max-w-4xl">
      {/* <SiteForm initialData={site} onSubmit={ } /> */}
    </div>
  )
}

export default EditSite