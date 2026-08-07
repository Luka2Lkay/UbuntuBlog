import React, { useMemo, useState } from "react"
import slugify from "slugify"
import { selectError, setError } from "@/state/redux/reducers/site_slice"
import { useAppSelector, useAppDispatch } from "@/hooks/redux_hooks"
import { type Site } from "@/interfaces/Site"
import { useAuth } from "@clerk/react"

interface Props {
    initialData?: Site | null
    onSubmit: (data: Site) => void;
    loading: boolean;

}

type NewSite = Omit<Site, "_id">

function SiteForm({ initialData, onSubmit, loading = false }: Props) {

    const dispatch = useAppDispatch();
    const error = useAppSelector(selectError);

    const { userId } = useAuth();

    const [formData, setFormData] = useState<NewSite>({ name: initialData?.name || "", slug: initialData?.slug || "", niche: initialData?.niche || "", domain: initialData?.domain || "", userId: initialData?.userId || userId });

    const slug = useMemo(() => {

        if (!formData.name) return;

        return slugify(formData.name, {
            lower: true,
            strict: true,
            trim: true
        })

    }, [formData.name])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;

        if (name === "domain") {
            if (value && !/^w{3}?\.+/i.test(value)) {
                dispatch(setError("Domain must start with www."))
            } else {
                dispatch(setError(null));
            }
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border bg-white rounded-xl space-y-5 p-6">
                <div>
                    <h2 className="text-xl font-semibold">Client Site</h2>
                </div>

                <div>
                    <label className="block text-left text-sm font-medium mb-2">Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border rounded-lg px-4 py-3" placeholder="name of the site" required />
                </div>

                <div>
                    <label className="block text-left text-sm font-medium mb-2">Slug</label>
                    <input type="text" name="slug" value={slug || ""} onChange={handleChange} className="w-full border rounded-lg px-4 py-3 bg-gray-300" readOnly />
                </div>

                <div>
                    <label className="block text-left text-sm font-medium mb-2">Domain</label>
                    <input type="text" name="domain" value={formData.domain} onChange={handleChange} className="w-full border rounded-lg px-4 py-3" placeholder="www.sitename.co.za" required />
                    {error && error.includes("Domain") && <p className="text-red-500 text-sm">{error}</p>}
                </div>

                <div>
                    <label className="block text-left text-sm font-medium mb-2">Niche</label>
                    <input type="text" name="niche" value={formData.niche} onChange={handleChange} className="w-full border rounded-lg px-4 py-3" placeholder="Technology" />
                </div>

                <div>
                    <button disabled={loading || !!error || !formData.name || !formData.domain} type="submit" className="mt-4 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-black disabled:bg-gray-400 transition cursor-pointer">{initialData ? "EDIT" : "ADD"}</button>
                </div>
            </div>
        </form>
    )
}

export default SiteForm