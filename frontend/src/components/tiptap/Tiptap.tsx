import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image"
import Placeholder from "@tiptap/extension-placeholder"
import TextAlign from "@tiptap/extension-text-align"
import { useRef } from "react";
import { uploadImage } from "@/services/image_upload_service";
import { useAuth } from "@clerk/react";

type Props = {
    content: string;
    onChange: (value: string) => void;
}

function Tiptap({ content, onChange }: Props) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const { getToken } = useAuth();

    const editor = useEditor({
        extensions: [StarterKit, Image, Placeholder.configure({ placeholder: "Write your blog content..." }), TextAlign.configure({ types: ["paragraph", "heading"] })],
        content,
        editorProps: {
            attributes: {
                class: "min-h-[300px] focus:outline-none prose max-w-none p-4 text-left"
            }
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        }
    })

    if (!editor) return null

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files?.[0];

        if (!file) throw new Error("No file selected!");

        try {

            const formData = new FormData();
            formData.append("image", file);

            const token = await getToken({ template: "backend" })

            if (!token) return

            const response = await uploadImage(formData, token)

            const imageUrl = response.data.url;

            editor?.chain().focus().setImage({ src: imageUrl }).run();

        } catch (error) {
            console.error("Image upload failed", error);
        }
    }

    return (
        <div className="border border-gray-300 rounded-xl overflow-hidden bg-white">
            <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 p-3 bg-gray-50">
                <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`px-3 py-1 rounded-md text-sm cursor-pointer ${editor.isActive("bold") ? "bg-gray-900 text-white" : "bg-white border"}`}>Bold</button>
                <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`px-3 py-1 rounded-md text-sm cursor-pointer ${editor.isActive("italic") ? "bg-gray-900 text-white" : "bg-white border"}`}>Italic</button>
                <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`px-3 py-1 rounded-md text-sm cursor-pointer ${editor.isActive("heading", { level: 1 }) ? "bg-gray-900 text-white" : "bg-white border"}`}>H1</button>
                <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`px-3 py-1 rounded-md text-sm cursor-pointer ${editor.isActive("heading", { level: 2 }) ? "bg-gray-900 text-white" : "bg-white border"}`}>H2</button>
                <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`px-3 py-1 rounded-md text-sm cursor-pointer ${editor.isActive("heading", { level: 3 }) ? "bg-gray-900 text-white" : "bg-white border"}`}>H3</button>
                <button type="button" onClick={() => editor.chain().focus().toggleTextAlign("left").run()} className={`px-3 py-1 rounded-md text-sm cursor-pointer ${editor.isActive({ textAlign: "left" }) ? "bg-gray-900 text-white" : "bg-white border"}`}>Left</button>
                <button type="button" onClick={() => editor.chain().focus().toggleTextAlign("center").run()} className={`px-3 py-1 rounded-md text-sm cursor-pointer ${editor.isActive({ textAlign: "center" }) ? "bg-gray-900 text-white" : "bg-white border"}`}>Center</button>
                <button type="button" onClick={() => editor.chain().focus().toggleTextAlign("right").run()} className={`px-3 py-1 rounded-md text-sm cursor-pointer ${editor.isActive({ textAlign: "right" }) ? "bg-gray-900 text-white" : "bg-white border"}`}>Right</button>
                <button type="button" onClick={() => fileInputRef.current?.click()} className={`px-3 py-1 rounded-md text-sm cursor-pointer bg-white border`}>Insert Image</button>
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
            </div>

            <EditorContent editor={editor} />
        </div>
    )
}

export default Tiptap
