import mongoose from "mongoose";

const articleModel = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    require: true,
  },
  likes: [{ type: mongoose.Types.ObjectId, ref: "user" }],
  files: {
    type: Array,
    default: [],
  },
  category: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Article", articleModel);