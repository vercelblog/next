import axios from "axios";

export async function generateMetadata({ params }) {
  const slug = params.slug;

  try {
    const res = await axios.get(`/api/blog/${slug}`);
    const blog = res.data;
    console.log(blog)

    if (!blog) return {};

    const titleBlock = blog.blocks.find((b) => b.type === "title");
    const metaBlock = blog.blocks.find((b) => b.type === "meta");

    return {
      title: titleBlock ? titleBlock.content : "Blog",
      description: metaBlock ? metaBlock.content : `Read about ${blog.category}`,
      openGraph: {
        title: titleBlock ? titleBlock.content : "Blog",
        description: metaBlock ? metaBlock.content : `Read about ${blog.category}`,
        images: blog.blocks.find((b) => b.type === "coverImage")
          ? [blog.blocks.find((b) => b.type === "coverImage").content]
          : [],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: titleBlock ? titleBlock.content : "Blog",
        description: metaBlock ? metaBlock.content : `Read about ${blog.category}`,
        images: blog.blocks.find((b) => b.type === "coverImage")
          ? [blog.blocks.find((b) => b.type === "coverImage").content]
          : [],
      },
    };
  } catch (err) {
    console.error(err);
    return {};
  }
}
