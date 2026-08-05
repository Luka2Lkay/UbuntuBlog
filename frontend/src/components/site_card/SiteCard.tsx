import { Globe, SmilePlus, Trash, ExternalLink, ShieldCheck } from "lucide-react"

import capitalize from "capitalize"

interface Props {
    name: string | undefined;
    domain: string | undefined;
    niche?: string | undefined;
    deleteCurrentSite?: () => void;
    showDeleteButton: boolean;
}

function SiteCard({ name, domain, niche, deleteCurrentSite, showDeleteButton }: Props) {

    const handleDeleteClick = async () => {

        if (deleteCurrentSite) {
            await deleteCurrentSite()
        }
    }

    return (
        <div className="w-full max-w-3xl rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">

            <div className="flex items-start justify-between p-6">
                <div className="flex gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100">
                        <Globe className="h-7 w-7 text-blue-600" />
                    </div>

                    <div className="space-y-3">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900">{capitalize.words(name ?? "")}</h2>
                            <p className="text-sm text-gray-500">Website Details</p>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                            <Globe className="h-4 w-4 text-gray-500" />
                            <a target="_blank" href={`https://${domain}`} rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">
                                {domain}
                            </a>
                            <ExternalLink className="h-4 w-4 text-gray-400" />
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                            <ShieldCheck className="h-4 w-4 text-green-600" />
                            <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                HTTPS
                            </span>
                        </div>

                        {niche && (
                            <div className="flex items-center gap-2 text-sm">
                                <SmilePlus className="h-4 w-4 text-purple-600" />
                                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                                    {capitalize.words(niche)}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <a target="_blank" href={`https://${domain}`} rel="noopener noreferrer" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-100">
                        Visit Website
                    </a>
                    {showDeleteButton && (
                        <button onClick={handleDeleteClick} className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100">
                            <Trash size={18} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SiteCard