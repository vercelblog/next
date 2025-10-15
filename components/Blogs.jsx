"use client";
import { useRouter } from "next/navigation";

const Blogs = ({ blogs }) => {
  const router = useRouter();

  if (!blogs || blogs.length === 0) {
    return (
      <div className="p-6 text-center text-gray-200">
        <p>No blogs found.</p>
      </div>
    );
  }

  return (
    <div>
      {/* First 2 blogs */}
      <div className="grid sm:grid-cols-2 gap-2 mb-6">
        {blogs.slice(0, 2).map((blog) => (
          <div
            key={blog._id}
            onClick={() => router.push(`/${blog.slug}`)}
            className="bg-white rounded p-4 transition w-full cursor-pointer"
          >
            {blog.blocks.find((b) => b.type === "coverImage") && (
              <img
                src={blog.blocks.find((item) => item.type === "coverImage").content}
                alt={blog.blocks[0]?.content || "Blog cover"}
                className="rounded-md w-full object-contain mb-2"
              />
            )}
            <div className="font-semibold">{blog.blocks[0]?.content}</div>
            <span className="px-2 border-l-2 border-violet-500 text-sm text-gray-600">
              {blog.category}
            </span>
          </div>
        ))}
      </div>

      {/* Remaining blogs */}
      <div className="grid gap-2">
        {blogs.slice(2).map((blog) => (
          <div
            key={blog._id}
            onClick={() => router.push(`/${blog.slug}`)}
            className="flex gap-4 bg-white rounded p-4 transition w-full cursor-pointer"
          >
            {blog.blocks.find((b) => b.type === "coverImage") && (
              <div className="w-32 flex-shrink-0">
                <img
                  src={blog.blocks.find((item) => item.type === "coverImage").content}
                  alt={blog.blocks[0]?.content || "Blog thumbnail"}
                  className="rounded-md w-full object-cover h-20"
                />
              </div>
            )}
            <div>
              <div className="font-semibold">{blog.blocks[0]?.content}</div>
              <p className="px-2 border-l-2 border-violet-500 text-sm text-gray-600">
                {blog.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
