import mongoose from "mongoose";

const blockSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: [
        "title", "paragraph", "image", "coverImage", "table",
        "ad", "link", "meta", "secretBox", "list", "heading"
      ],
    },
    content: mongoose.Schema.Types.Mixed,
  },
  { _id: false }
);

const blogSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    category: { type: String },
    blocks: [blockSchema],
    author: { type: String, required: true },
    isPublished: { type: Boolean, default: true },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
