import BlogClient from "./BlogClient";
import axios from "axios";

export async function generateMetadata({ params }) {
  const { slug} = await params

  try {
    const res = await axios.get(`http://localhost:3000/api/blog/${slug}`);
    const blog = res.data;
    if (!blog) return {};

    const metaBlock = blog.blocks.find(b => b.type === "meta");

    return {
      title: metaBlock?.content.title || "Blog",
      description: metaBlock?.content.description || `Read about ${blog.category}`,
      openGraph: {
        title: metaBlock?.content.title || "Blog",
        description: metaBlock?.content.description || `Read about ${blog.category}`,
        images: blog.blocks.find(b => b.type === "coverImage")
          ? [blog.blocks.find(b => b.type === "coverImage").content]
          : [],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: metaBlock?.content.title || "Blog",
        description: metaBlock?.content.description || `Read about ${blog.category}`,
        images: blog.blocks.find(b => b.type === "coverImage")
          ? [blog.blocks.find(b => b.type === "coverImage").content]
          : [],
      },
    };
  } catch (err) {
    console.error(err);
    return {};
  }
}

export default async function BlogPage({ params }) {
  const { slug} = await params

  const res = await fetch(`http://localhost:3000/api/blog/${slug}`);
  const blog = await res.json();

  return <BlogClient blog={blog} slug={slug} />;
}
