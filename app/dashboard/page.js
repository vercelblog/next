"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    try {
      const res = await axios.get("/api/blog");
      setBlogs(res.data ); // depending on backend
      console.log(res)
    } catch (error) {
      console.error(error);
    }
  };

  const blogDelete = async (slug) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`/api/blog/${slug}`, { withCredentials: true });
      setBlogs(blogs.filter((b) => b._id !== id)); // remove from UI
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">All Blogs</div>
        <div
          onClick={() => router.push("/dashboard/addblog")}
          className="text-green-500 cursor-pointer"
        >
          Create Blog
        </div>
      </div>

      {blogs.map((item) => (
        <div
          key={item._id}
          className="flex border p-2 items-center gap-2 justify-between mt-4"
        >
          <div>
            <img
              className="h-10 w-10 object-cover"
              src={item.blocks[1]?.content || "/placeholder.png"}
              alt=""
            />
          </div>
          <div>
            <p className="font-medium">{item.blocks[0]?.content}</p>
            <p>Total Views: {item.views}</p>
          </div>
          <div className="flex flex-col">
            <button
              onClick={() => blogDelete(item.slug)}
              className="text-red-500 hover:underline"
            >
              Delete Blog
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
