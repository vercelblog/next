import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { dbConnect } from "../../../lib/dbConnect";
import Blog from '../../../models/Blog'

// 📝 CREATE BLOG (Auth required)
export async function POST(req) {
  await dbConnect();

  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const body = await req.json();
    const { slug, category, blocks } = body;

    if (!slug || !blocks) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const existing = await Blog.findOne({ slug });
    if (existing) {
      return NextResponse.json({ message: "Slug already exists" }, { status: 400 });
    }

    const newBlog = await Blog.create({
      slug,
      category,
      blocks,
      author: decoded.username,
    });

    return NextResponse.json({ success: true, blog: newBlog });
  } catch (error) {
    console.error("Create blog error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// 🌐 GET ALL BLOGS (Public)
export async function GET() {
  await dbConnect();

  try {
    const blogs = await Blog.find({ isPublished: true })
      .sort({ createdAt: -1 });
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Fetch blogs error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
