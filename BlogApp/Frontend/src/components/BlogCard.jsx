import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ post }) => {
  if (!post) return null; // safety check

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-border-dark bg-card-dark transition-all hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1 hover:border-primary/30">
      
      <div className="relative h-48 w-full overflow-hidden bg-surface-dark">
        <div className="absolute inset-0 bg-gradient-to-tr from-background-dark to-transparent opacity-40 group-hover:opacity-20 transition-opacity"></div>

        <img
          src={post?.coverImage || "/placeholder.jpg"}
          alt={post?.title || "post image"}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center rounded-full bg-primary/20 backdrop-blur-sm px-2.5 py-0.5 text-xs font-medium text-primary border border-primary/30">
            {post?.category || "General"}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4">
          <h3 className="mb-2 text-xl font-bold leading-tight text-white group-hover:text-primary transition-colors">
            <Link to={`/blog/${post?._id}`}>
              {post?.title}
            </Link>
          </h3>

          <p className="text-sm text-gray-400 line-clamp-3">
            {post?.excerpt}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-border-dark">
          
          <div className="flex items-center gap-2">
            <img
              src={post?.author?.profilePicture || "/user1.jpg"}
              alt="author"
              className="h-8 w-8 rounded-full object-cover border border-border-dark"
            />
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-white">
                {post?.author?.fullname}
              </span>
              <span className="text-[10px] text-gray-500">
                {new Date(post?.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-400 z-10 relative">
            <div className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[16px]">
                favorite
              </span>
              <span>{post?.likes?.length || 0}</span>
            </div>

            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">
                schedule
              </span>
              <span>
                {new Date(post?.createdAt).toLocaleTimeString()}
              </span>
            </div>
          </div>

        </div>
      </div>
    </article>
  );
};

export default BlogCard;
