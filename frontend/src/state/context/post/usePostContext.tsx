import { PostContext } from "@/state/context/post/PostContext";
import { useContext } from "react";

export function usePostContext() {
    const context = useContext(PostContext)

    if (!context) {
        throw new Error("usePostContext must be used within a PostProvider")
    }

    return context;
}