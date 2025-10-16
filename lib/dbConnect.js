import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in environment variables");
}

let cached = globalThis.mongoose || { conn: null, promise: null };

export async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI)
    .then((mongoose) => {
      console.log("MongoDB connected");
      return mongoose;
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
      throw err;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
