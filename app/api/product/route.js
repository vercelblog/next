import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { dbConnect } from "../../../lib/dbConnect"; // <-- 3 levels up to lib
import Product from "../../../models/Product";       // <-- 3 levels up to models

export async function GET() {
  await dbConnect();
  try {
    const products = await Product.find();
    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error("GET /api/product error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  await dbConnect();

  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const user = jwt.verify(token, process.env.JWT_SECRET);

    const body = await req.json();
    const { logo, productName, productAbout, productLink } = body;

    if (!logo || !productName || !productLink) {
      return NextResponse.json({ success: false, message: "Fields Missing" }, { status: 400 });
    }

    const product = new Product({ logo, productName, productLink, productAbout });
    await product.save();

    return NextResponse.json({ success: true, message: "Product added successfully", product });
  } catch (error) {
    console.error("POST /api/product error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
