import type { PostFormData } from "@/interfaces/Post"
import { Eye, Tag } from "lucide-react"
import capitalize from "capitalize"
import { Link } from "react-router-dom"

interface Props {
  post: PostFormData
}

function PostCard({ post }: Props) {
  return (
    <article className="group w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
        {post.featuredImage ? (


          <img src={post.featuredImage?.url} alt={post.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">No Featured Image</div>
        )}

        <div className="absolute right-3 top-3">
          <span className={`flex justify-between rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur-sm ${post.published ? "bg-green-100/90 text-green-700" : "bg-gray-100/90 text-gray-700"}`}>
            {post.published ? "Published" : "Draft"}
          </span>

          {post.published && post.featured &&

            <span className="rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur-sm bg-gray-900 text-white">
              {"Featured"}
            </span>}
        </div>
      </div>

      <div className="p-5">
        {post.category && (
          <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
            {capitalize.words(post.category)}
          </span>
        )}

        <h2 className="mt-1 line-clamp-2 text-lg font-semibold leading-snug text-gray-900 sm:text-xl">{post.title}</h2>

        {post.excerpt && (
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-500">
            {post.excerpt}
          </p>
        )}

        {post.tags?.length > 0 && (
          <div className="mt-4 flex items-center gap-2">
            <Tag size={15} className="shrink-0 text-gray-400" />

            <div className="flex min-w-0 flex-wrap gap-1.5">
              {post.tags?.slice(0, 3).map((tag) => (
                <span key={tag} className="rounded-md bg-gray-100 px-2 py-1 text-sm text-gray-600 ">#{tag}</span>
              ))}

              {post.tags?.length > 3 && (
                <span className="px-1 py-1 text-xs text-gray-600">+{post.tags.length - 3}</span>
              )}
            </div>
          </div>
        )}

        <div className="mt-4">
          <span className="text-sm text-gray-600 tracking-widest">{post.readTime}</span>
        </div>

        <div className="mt-5 border-t border-gray-100 pt-4">
          <Link to={`/posts/${post._id}`} className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800">
            <Eye size={24} className="text-blue-500" />

            <span className="hidden sm:inline ">
              View
            </span>
          </Link>
        </div>
      </div>
    </article>
  )
}

export default PostCard


