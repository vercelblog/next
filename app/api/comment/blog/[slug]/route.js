import { NextResponse } from "next/server";
import { dbConnect } from "../../../../../lib/dbConnect";
import Blog from "../../../../../models/Blog";
import Comment from "../../../../../models/Comments";

export async function GET(req, { params }) {
  await dbConnect();
  try {
    const { slug } = params;
    const blog = await Blog.findOne({ slug });
    if (!blog) return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });

    const comments = await Comment.find({ blog: blog._id }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, comments });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}