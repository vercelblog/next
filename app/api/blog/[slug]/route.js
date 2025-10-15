import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { dbConnect } from "../../../../lib/dbConnect";
import Blog from "../../../../models/Blog";

// 🌐 GET ONE BLOG (Public)
export async function GET(req, { params }) {
  await dbConnect();
  const { slug } = params;

  try {
    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    // Increment views
    blog.views += 1;
    await blog.save();

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Get blog error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// ❌ DELETE BLOG (Auth required)
export async function DELETE(req, { params }) {
  await dbConnect();
  const { slug } = params;

  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const blog = await Blog.findOne({ slug });
    if (!blog) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    if (blog.author !== decoded.username) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await blog.deleteOne();
    return NextResponse.json({ success: true, message: "Blog deleted" });
  } catch (error) {
    console.error("Delete blog error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
