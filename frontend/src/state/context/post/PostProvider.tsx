import { useState } from "react";
import { PostContext } from "@/state/context/post/PostContext";
import { type Post } from "@/interfaces/Post";

type ReactNode = React.ReactNode;

interface PostProviderProps {
    children: ReactNode
}

export function PostProvider({ children }: PostProviderProps) {
    const [selectedPost, setSelectedPost] = useState<Post | null>(null)

    return (
        <PostContext.Provider value={{ selectedPost, setSelectedPost }}>
            {children}
        </PostContext.Provider>
    )

}