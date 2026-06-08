import { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAuth } from "@clerk/react";
import { fetchSiteThunk, deleteSiteThunk } from "../../redux/thunks/site_thunk";
import { useAppDispatch, useAppSelector } from "../../hooks/redux_hooks";
import { selectCurrentSite, selectLoading } from "../../redux/reducers/site_slice";
import { useSiteContext } from "../../context/SiteContext";
import SiteCard from "../../components/site_card/SiteCard";

function SiteDetails() {
  const { siteId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const currentSite = useAppSelector(selectCurrentSite);
  const loading = useAppSelector(selectLoading);
  const { setSelectedSite, selectedSite } = useSiteContext();

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      navigate("/sign-in");
      return;
    }

    console.log(siteId)

    if (!siteId) return;

    const loadSite = async () => {
      try {
        const token = await getToken({ template: "backend" });
        await dispatch(fetchSiteThunk({ siteId, token })).unwrap();
      } catch (error) {
        console.error("Error loading site details:", error);
      }
    };

    loadSite();
  }, [dispatch, getToken, isLoaded, isSignedIn, navigate, siteId]);

  useEffect(() => {
    if (currentSite) {
      setSelectedSite(currentSite);
    }
  }, [currentSite, setSelectedSite]);

  if (loading) {
    return <div>Loading site details...</div>;
  }

  if (!currentSite) {
    return <div className="text-gray-600">Site not found.</div>;
  }

  const handleDeleteSite = async (siteId: string) => {
    try {

      const token = await getToken({ template: "backend" });
      await dispatch(deleteSiteThunk({ siteId, token })).unwrap();

      if (selectedSite?._id === siteId) {
        setSelectedSite(null);
      }

    } catch (error) {
      console.error("Error deleting site:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">{currentSite.name}</h1>
          <p className="text-sm text-gray-500">Manage this site and see its details.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            to={`/sites/${currentSite._id}/edit`}
            className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm hover:bg-black"
          >
            Edit Site
          </Link>
          <Link
            to="/dashboard"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <SiteCard
          name={currentSite.name}
          domain={currentSite.domain}
          niche={currentSite.niche}
        />
      </div>
    </div>
  );
}

export default SiteDetails;
