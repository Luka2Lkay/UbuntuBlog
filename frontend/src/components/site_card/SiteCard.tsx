
type Props = {
    name: string;
    domain: string;
    niche?: string
}

function SiteCard({ name, domain, niche }: Props) {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 w-1/2">
            <h2 className="text-lg font-semibold">{name}</h2>

            {/* use icons */}
            <p className="text-md text-left">Domain (use icon instead): <span className="text-gray-500 font-semibold"><a href={domain} target="_blank">{domain}</a></span></p>
            <p className="text-md text-left">Niche (use icon instead): <span className="text-gray-500 font-semibold">{niche}</span></p>
        </div>
    )
}

export default SiteCard