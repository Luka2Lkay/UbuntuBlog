import { Globe } from "lucide-react"
import { SmilePlus } from "lucide-react"
import { Trash } from "lucide-react";

interface Props {
    name: string | undefined;
    domain: string | undefined;
    niche?: string | undefined;
    deleteCurrentSite?: () => void;
}

function SiteCard({ name, domain, niche, deleteCurrentSite }: Props) {

    const handleDeleteClick = async () => {

        if (deleteCurrentSite) {
            await deleteCurrentSite()
        }
    }

    return (
        <div className="flex justify-between bg-white border border-gray-200 rounded-lg p-4 w-1/2">
            <div>
                <h2 className="text-lg font-semibold">{name}</h2>

                <p className="text-md text-left"> <Globe size={18} className="inline-block mr-2 text-black" />: <span className="text-gray-500 font-semibold hover:text-blue-500"><a href={`https://${domain}`} target="_blank" rel="noopener noreferrer">{domain}</a></span></p>

                {niche && <p className="text-md text-left"><SmilePlus size={18} className="inline-block mr-2 text-black" />: <span className="text-gray-500 font-semibold">{niche}</span></p>}
            </div>

            <Trash onClick={handleDeleteClick} className="text-red-500 hover:text-red-900 cursor-pointer" />
        </div>

    )
}

export default SiteCard