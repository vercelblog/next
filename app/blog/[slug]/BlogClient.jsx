
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Back from "../../../components/Back";
import axios from "axios";

export default function BlogPage() {
  const { slug } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ username: "", email: "", text: "",slug:slug });
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [comments, setComments] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [ready, setReady] = useState(false);

  // Random color generator for avatar
  const getRandomColor = () => {
    const colors = [
      "bg-red-700", "bg-blue-700", "bg-green-700",
      "bg-yellow-700", "bg-purple-700", "bg-pink-700",
      "bg-indigo-700", "bg-orange-700", "bg-teal-700"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Fetch Blog + Comments
  useEffect(() => {
    if (!slug) return;
    fetchBlog();
    fetchComments();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`/api/blog/${slug}`);
      setBlog(res.data || {});
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/api/comment/blog/${slug}`);
      setComments(res.data?.comments || []);
    } catch (err) {
      console.error(err);
    }
  };

  // Secret box countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      setReady(true);
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Handle comment submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.text ) {
      alert("All fields are required!");
      return;
    }
    await axios.post(`/api/comment`,form)
    setForm({ username: "", email: "", text: "" });
    setShowCommentForm(false);
    fetchComments();
  };

  // Title helper
  const getTitle = (blog) => {
    const titleBlock = blog?.blocks?.find((b) => b.type === "title");
    return titleBlock ? titleBlock.content : "Untitled";
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!blog) return <div className="p-10 text-center">Blog not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Back />
      <Breadcrumbs category={blog.category} title={getTitle(blog)} />

      {/* Title */}
      <h1 className="text-3xl font-semibold mb-3">{getTitle(blog)}</h1>
      <p className="text-sm text-gray-600 mb-6">
        {blog.author} • {blog.category} •{" "}
        {new Date(blog.createdAt).toDateString()}
      </p>

      {/* Content Blocks */}
      <div className="space-y-6">
        {blog.blocks?.map((block, idx) => {
          switch (block.type) {
            case "coverImage":
            case "image":
              return (
                <img
                  key={idx}
                  src={block.content}
                  alt="Blog"
                  className="w-full rounded-lg"
                />
              );

            case "paragraph":
              return (
                <p key={idx} className="text-lg leading-relaxed">
                  {block.content}
                </p>
              );

            case "heading":
              return (
                <p key={idx} className="text-xl font-semibold capitalize">
                  {block.content}
                </p>
              );

            case "list":
              return (
                <ul key={idx} className="list-disc list-inside">
                  {block.content.map((item, i) => (
                    <li key={i} className="p-2">
                      {item}
                    </li>
                  ))}
                </ul>
              );

            case "secretBox":
              return (
                <div
                  key={idx}
                  className="border-2 border-dotted border-yellow-400 p-2"
                >
                  {ready ? (
                    <div className="text-gray-500">{block.content}</div>
                  ) : (
                    <div className="text-center">Secret Box Loading...</div>
                  )}
                </div>
              );

            case "link":
              return (
                <div key={idx} className="text-center">
                  {ready ? (
                    <a href={block.content} target="_blank">
                      <button className="bg-emerald-600 text-white p-2 px-8 rounded border border-dashed">
                        Link Ready
                      </button>
                    </a>
                  ) : (
                    <button
                      className="bg-red-600 text-white p-2 px-8 rounded border border-dashed"
                    >
                      Link will be ready in {timeLeft}s
                    </button>
                  )}
                </div>
              );

            case "table":
              return (
                <table
                  key={idx}
                  className="table-auto border-collapse border border-gray-300 w-full"
                >
                  <tbody>
                    {block.content.map((row, i) => (
                      <tr key={i}>
                        {Object.values(row).map((cell, j) => (
                          <td
                            key={j}
                            className="border border-gray-500 p-2 text-sm"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              );

            case "ad":
              return (
                <div
                  key={idx}
                  className="w-full bg-yellow-100 text-center py-4 rounded"
                  dangerouslySetInnerHTML={{ __html: block.content }}
                />
              );

            default:
              return null;
          }
        })}
      </div>

      {/* Comments Section */}
      <div className="mt-6">
        <div>{comments.length} Comments</div>

        {/* Add comment input */}
        <div className="mt-2 flex gap-2 items-center">
          <input
            className="border-b-2 w-full focus:border-gray-500 border-gray-200 outline-none"
            type="text"
            placeholder="Add a comment"
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
          />
          <div className="flex flex-row-reverse gap-1">
            <button
              onClick={() => setShowCommentForm(!showCommentForm)}
              className="p-2.5 rounded-full bg-gray-50 border border-gray-200"
            >
              💬
            </button>
            <button
              onClick={() => setForm({ username: "", email: "", text: "" })}
              className="p-2.5 rounded-full bg-gray-50 border border-gray-200"
            >
              ❌
            </button>
          </div>
        </div>

        {/* Existing comments */}
        <div className="mt-6">
          {comments.map((item, idx) => (
            <div key={idx} className="flex flex-col pb-2">
              <div className="flex gap-2 items-center">
                <div
                  className={`${getRandomColor()} text-white text-xl p-2 px-4 rounded-full uppercase`}
                >
                  {item.username.slice(0, 1)}
                </div>
                <div>
                  <p className="text-gray-600">
                    @{item.username} - {item.createdAt.split("T")[0]}
                  </p>
                  <p className="text-sm text-gray-800">{item.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comment Form Modal */}
      {showCommentForm && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4">
          <div className="bg-white border-t border-gray-300 p-4 shadow-lg">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-3"
            >
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={(e) =>
                  setForm({ ...form, username: e.target.value })
                }
                placeholder="Your name"
                className="border w-full p-2 rounded-lg focus:ring-2 focus:ring-violet-500"
              />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Your email"
                className="border w-full p-2 rounded-lg focus:ring-2 focus:ring-violet-500"
              />

              <div className="flex w-full gap-4 justify-between">
                <button
                  type="button"
                  onClick={() => setShowCommentForm(false)}
                  className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300 w-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 w-full"
                >
                  Comment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
