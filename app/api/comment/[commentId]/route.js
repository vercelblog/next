import { NextResponse } from "next/server";
import { dbConnect } from "../../../../lib/dbConnect";
import jwt from "jsonwebtoken";
import Comment from "../../../../models/Comments";

// DELETE comment (admin only)
export async function DELETE(req, { params }) {
  await dbConnect();
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const user = jwt.verify(token, process.env.JWT_SECRET);
    console.log(user)

    if (!user) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    const { commentId } = params;
    const comment = await Comment.findById(commentId);
    console.log(comment)
    if (!comment) return NextResponse.json({ success: false, message: "Comment not found" }, { status: 404 });

    await Comment.findByIdAndDelete(commentId);
    return NextResponse.json({ success: true, message: "Comment deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
