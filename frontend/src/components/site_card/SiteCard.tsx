import { Globe } from "lucide-react"
import { SmilePlus } from "lucide-react"

interface Props {
    name: string;
    domain: string;
    niche?: string
}

function SiteCard({ name, domain, niche }: Props) {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 w-1/2">
            <h2 className="text-lg font-semibold">{name}</h2>
            
            <p className="text-md text-left"> <Globe size={18} className="inline-block mr-2 text-black" />: <span className="text-gray-500 font-semibold hover:text-blue-500"><a href={domain} target="_blank">{domain}</a></span></p>
            <p className="text-md text-left"><SmilePlus size={18} className="inline-block mr-2 text-black" />: <span className="text-gray-500 font-semibold">{niche}</span></p>
        </div>
    )
}

export default SiteCard