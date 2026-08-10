import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

function PostDetails() {

    const { postId } = useParams();

    useEffect(() => (
        console.log("post", postId)
    ))
    return (
        <div className='space-y-6'>
            <div className="flex flex-col gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">{ }</h1>
                </div>
            </div>
        </div>
    )
}

export default PostDetails