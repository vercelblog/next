import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { dbConnect } from "../../../../lib/dbConnect";
import Product from "../../../../models/Product";

export async function DELETE(req, context) {
  await dbConnect();

  const { id } = await context.params; // ✅ must await params

  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }

    return Response.json({ message: "Product deleted successfully ✅" });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Error deleting product", error }, { status: 500 });
  }
}
