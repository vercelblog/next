"use client";

import React, { useState } from "react";
//import Back from "./back";

// ✅ Use NEXT_PUBLIC_ for env vars accessible in client
const imageHelp = process.env.NEXT_PUBLIC_IMG;

const blockTypes = [
  "title",
  "paragraph",
  "image",
  "coverImage",
  "table",
  "ad",
  "link",
  "meta",
  "secretBox",
  "list",
  "heading",
];

const AddBlog = () => {
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [blocks, setBlocks] = useState([]);
  const [currentType, setCurrentType] = useState("");

  // dynamic states
  const [content, setContent] = useState("");
  const [listItems, setListItems] = useState([""]);
  const [meta, setMeta] = useState({ title: "", description: "", canonical: "" });
  const [table, setTable] = useState([[""]]);

  // image state
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file) => {
    if (!file) return null;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "speedblog"); // replace with your preset
    formData.append("folder", "blogs"); // optional

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${imageHelp}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setUploading(false);
      return data.secure_url;
    } catch (error) {
      console.error("Upload failed:", error);
      setUploading(false);
      return null;
    }
  };

  const handleAddBlock = async () => {
    let blockContent = content;

    if (currentType === "list") blockContent = listItems;
    if (currentType === "meta") blockContent = meta;
    if (currentType === "table") blockContent = table;

    if (currentType === "image" || currentType === "coverImage") {
      if (imageFile) {
        const url = await uploadImage(imageFile);
        if (url) {
          blockContent = url;
        } else {
          return alert("Image upload failed!");
        }
      }
    }

    if (!currentType || !blockContent) return alert("Missing type/content");

    setBlocks([...blocks, { type: currentType, content: blockContent }]);

    // reset
    setCurrentType("");
    setContent("");
    setListItems([""]);
    setMeta({ title: "", description: "", canonical: "" });
    setTable([[""]]);
    setImageFile(null);
  };

  const handleDeleteBlock = (index) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug, category, blocks }),
      credentials: "include", // ✅ send cookies with request
    });

    const data = await res.json();

    if (data.success) {
      alert("Blog created!");
      console.log(data.comment || data.blog || data); // check returned object
      // optional: redirect after create
      // router.push("/dashboard");
    } else {
      alert(data.message || "Error creating blog");
    }
    } catch (err) {
      console.error(err);
      alert("Error creating blog");
    }
  };

 return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">Add New Blog</h2>

      {/* Meta Info */}
      <input className="w-full border p-2 rounded" placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
      <input className="w-full border p-2 rounded" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />

      {/* Block Selector */}
      <select
        className="border p-2 rounded w-full"
        value={currentType}
        onChange={(e) => setCurrentType(e.target.value)}
      >
        <option value="">Select Block Type</option>
        {blockTypes.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      {/* Dynamic Inputs */}
      {currentType && (
        <div className="p-3 border rounded bg-gray-50 space-y-2">
          {/* Simple text-like blocks */}
          {["title", "paragraph", "ad", "link", "heading", "secretBox"].includes(currentType) && (
            <input
              className="w-full border p-2 rounded"
              placeholder={`Enter ${currentType} content`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          )}

          {/* List */}
          {currentType === "list" && (
            <div>
              {listItems.map((item, i) => (
                <input
                  key={i}
                  className="w-full border p-2 rounded mb-1"
                  placeholder={`Item ${i + 1}`}
                  value={item}
                  onChange={(e) => {
                    const newList = [...listItems];
                    newList[i] = e.target.value;
                    setListItems(newList);
                  }}
                />
              ))}
              <button
                onClick={() => setListItems([...listItems, ""])}
                className="text-sm text-blue-600"
              >
                + Add Item
              </button>
            </div>
          )}

          {/* Meta */}
          {currentType === "meta" && (
            <div className="space-y-2">
              <input
                className="w-full border p-2 rounded"
                placeholder="Meta Title"
                value={meta.title}
                onChange={(e) => setMeta({ ...meta, title: e.target.value })}
              />
              <input
                className="w-full border p-2 rounded"
                placeholder="Meta Description"
                value={meta.description}
                onChange={(e) => setMeta({ ...meta, description: e.target.value })}
              />
              <input
                className="w-full border p-2 rounded"
                placeholder="Meta Canonical"
                value={meta.canonical}
                onChange={(e) => setMeta({ ...meta, canonical: e.target.value })}
              />
            </div>
          )}

          {/* Table */}
          {currentType === "table" && (
            <div>
              {table.map((row, r) => (
                <div key={r} className="flex gap-2 mb-2">
                  {row.map((cell, c) => (
                    <input
                      key={c}
                      className="border p-2 rounded w-24"
                      placeholder={`R${r + 1}C${c + 1}`}
                      value={cell}
                      onChange={(e) => {
                        const newTable = [...table];
                        newTable[r][c] = e.target.value;
                        setTable(newTable);
                      }}
                    />
                  ))}
                  <button
                    onClick={() => {
                      const newTable = [...table];
                      newTable[r].push("");
                      setTable(newTable);
                    }}
                    className="text-xs text-blue-600"
                  >
                    + Col
                  </button>
                </div>
              ))}
              <button
                onClick={() => setTable([...table, [""]])}
                className="text-sm text-green-600"
              >
                + Add Row
              </button>
            </div>
          )}

          {/* Image / CoverImage with Cloudinary */}
          {(currentType === "image" || currentType === "coverImage") && (
            <div className="space-y-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
              {imageFile && (
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="preview"
                  className="w-40 h-40 object-cover rounded"
                />
              )}
              {uploading && <p className="text-sm text-gray-600">Uploading...</p>}
            </div>
          )}

          <button
            onClick={handleAddBlock}
            className="bg-blue-600 text-white px-4 py-1 rounded"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Add Block"}
          </button>
        </div>
      )}

      {/* Preview */}
      <div className="space-y-2">
        {blocks.map((b, i) => (
          <div key={i} className="flex justify-between items-center border p-2 rounded bg-white">
            <span>
              <strong>{b.type}</strong>: {JSON.stringify(b.content)}
            </span>
            <button onClick={() => handleDeleteBlock(i)} className="text-red-500">❌</button>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 w-full bg-green-600 text-white py-2 rounded"
      >
        Save Blog
      </button>
    </div>
  );
};

export default AddBlog;
