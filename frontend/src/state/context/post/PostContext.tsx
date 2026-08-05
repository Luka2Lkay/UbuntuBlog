import { createContext, type SetStateAction, type Dispatch } from "react";
import { type Post } from "@/interfaces/Post";

interface PostContextType {
    selectedPost: Post | null;
    setSelectedPost: Dispatch<SetStateAction<Post | null>>
}

export const PostContext = createContext<PostContextType | undefined>(undefined)
