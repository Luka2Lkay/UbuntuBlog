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
    return (
        <div>Tiptap</div>
    )
}

export default Tiptap
