import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image"
import Placeholder from "@tiptap/extension-placeholder"
import { useRef } from "react";
import axios from "axios";

type Props = {
    content: string;
    onChange: (value: string) => void;
}

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

function Tiptap({ content, onChange }: Props) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const editor = useEditor({
        extensions: [StarterKit, Image, Placeholder.configure({ placeholder: "Write your blog content..." })],
        content,
        editorProps: {
            attributes: {
                class: "min-h-[300px] focus:outline-none prose max-w-none p-4"
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

            const response = await axios.post(`${BASE_URL}/api/upload`, formData);

            const imageUrl = response.data.url;

            editor?.chain().focus().setImage({ src: imageUrl }).run();

        } catch (error) {
            console.error("Image upload failed", error);
        }
    }




    return (
        <div>Tiptap</div>
    )
}

export default Tiptap
