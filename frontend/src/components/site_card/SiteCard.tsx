import { Globe } from "lucide-react"
import { SmilePlus } from "lucide-react"
import { Trash } from "lucide-react";
import { deleteSite } from "../../redux/reducers/site_slice";

interface Props {
    name: string | undefined;
    domain: string | undefined;
    niche?: string | undefined;
    deleteSite?: (siteId: string) => void;
}

function SiteCard({ name, domain, niche }: Props) {
    return (
        <div className="flex justify-between bg-white border border-gray-200 rounded-lg p-4 w-1/2">
            <div>
                <h2 className="text-lg font-semibold">{name}</h2>

                <p className="text-md text-left"> <Globe size={18} className="inline-block mr-2 text-black" />: <span className="text-gray-500 font-semibold hover:text-blue-500"><a href={`https://${domain}`} target="_blank" rel="noopener noreferrer">{domain}</a></span></p>

                {niche && <p className="text-md text-left"><SmilePlus size={18} className="inline-block mr-2 text-black" />: <span className="text-gray-500 font-semibold">{niche}</span></p>}
            </div>

            <Trash onClick={() => deleteSite} className="text-red-500 hover:text-red-900 cursor-pointer" />
        </div>

    )
}

export default SiteCard