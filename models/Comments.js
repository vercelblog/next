import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
  blog: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);
export default Comment;