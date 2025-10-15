"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Finance = ({ blogs }) => {
  const router = useRouter();

  // ✅ Filter finance-related blogs
  const financeBlogs = blogs?.filter(
    (blog) => blog.category?.toLowerCase() === "loan"
  ) || [];

  return (
    <div>
      <div className="text-center border-b border-gray-200 p-2 mb-3 text-gray-800 font-semibold">
        Verified Loans
      </div>

      {financeBlogs.length > 0 ? (
        financeBlogs.map((fina) => (
          <div
            key={fina._id}
            onClick={() => router.push(`/${fina.slug}`)}
            className="bg-white rounded p-4 mb-4 hover:shadow-lg transition cursor-pointer"
          >
            {fina.blocks.find((b) => b.type === "coverImage") && (
              <img
                src={fina.blocks.find((item) => item.type === "coverImage").content}
                alt={fina.title || "Finance blog image"}
                className="rounded-md w-full object-contain mb-2"
              />
            )}

            <p className="text-gray-600">
              {fina.blocks.find((b) => b.type === "title")?.content || "No title"}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No Finance blogs found.</p>
      )}
    </div>
  );
};

export default Finance;
