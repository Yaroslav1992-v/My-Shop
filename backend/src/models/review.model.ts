import mongoose, { Schema } from "mongoose";
export const reviewSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
const Review = mongoose.model("Review", reviewSchema);

export default Review;
