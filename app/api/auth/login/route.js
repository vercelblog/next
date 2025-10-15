import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: "Fields must not be empty" },
        { status: 400 }
      );
    }

    // Compare with environment variables
    if (
      username === process.env.USERNAME &&
      password === process.env.PASSWORD
    ) {
      // Create JWT
      const token = jwt.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      // Create NextResponse and attach cookie
      const res = NextResponse.json({ message: "Login Success" });
      res.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 24 * 60 * 60, // 1 day
      });

      return res;
    }

    return NextResponse.json({ message: "Invalid Credentials" }, { status: 401 });
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
