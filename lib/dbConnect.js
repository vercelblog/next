import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

let cached = global.mongoose || { conn: null, promise: null };

export async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false }).then((mongoose) => {
      console.log("MongoDB connected"); // ✅ Check connection
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
