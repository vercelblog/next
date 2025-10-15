import { NextResponse } from "next/server";
import { dbConnect } from "../../../lib/dbConnect";
import jwt from "jsonwebtoken";
import Blog from "../../../models/Blog";
import Comment from "../../../models/Comments";

// GET all comments (public)
export async function GET() {
  await dbConnect();
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, comments });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// POST comment to a blog (JWT user)
export async function POST(req) {
  await dbConnect();
  try {

    const {slug,username , email , text}  = await req.json();
    if (!slug || !text) return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });

    const blog = await Blog.findOne({ slug });
    if (!blog) return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });

    const comment = new Comment({
      blog: blog._id,
      username: username,
      email: email || "user@example.com",
      text : text,
    });

    await comment.save();
    return NextResponse.json({ success: true, message: "Comment added", comment });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
