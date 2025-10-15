"use client" // Home.jsx
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Blogs from "../components/Blogs.jsx";
import Finance from "../components/Finance.jsx";
import Products from "../components/Products.jsx";
import axios from "axios";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    getAllBlogs();
  }, []);

  const getAllBlogs = async () => {
    try {
      const data = await axios.get("/api/blog");
      setBlogs(data.data);
      const uniqueCategories = [
        "All",
        ...new Set(data.data.map((blog) => blog.category)),
      ];
      setCategories(uniqueCategories);
    } catch (err) {
      console.error("Error fetching blogs:", err.message);
    }
  };

  // filter blogs
  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((b) => b.category === selectedCategory);

  return (
    <div className="h-screen ">
      <Header
        categories={categories}
        blogs={blogs}
        onCategorySelect={setSelectedCategory} // pass handler
        selectedCategory={selectedCategory}
      />
      <div className="grid lg:grid-cols-12 w-full h-screen">
        <div className="hidden lg:grid lg:col-span-3 bg-gray-50 border-r-1  border-gray-200 p-4">
          <Finance blogs = {blogs}/>
        </div>
        <div className=" lg:grid lg:col-span-6  p-4 bg-gray-50">
           <Blogs blogs={filteredBlogs} />
        </div>
        <div className="hidden lg:grid lg:col-span-3 bg-gray-50  p-4 border-l-1 border-gray-200">
          <Products/>
        </div>
      </div>
    </div>
  );
};

export default Home;
