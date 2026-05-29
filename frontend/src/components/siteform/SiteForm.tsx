import { useMemo, useState } from "react"
import slugify from "slugify"
import { useSiteContext } from "../../context/SiteContext"
import axios from "axios"

type SiteFormData = {
    name: string;
    slug: string;
    niche: string;
    domain: string;
}

type Props = {
    initialData: Partial<SiteFormData>;
    onSubmit: (data: SiteFormData) => void;
    loading: boolean;
}

function SiteForm({ initialData, onSubmit, loading = false }: Props) {

    const [formData, setFormData] = useState<SiteFormData>({ name: initialData?.name || "", slug: initialData?.slug || "", niche: initialData?.niche || "", domain: initialData?.domain || "" })

    return (
        <div>SiteForm</div>
    )
}

export default SiteForm