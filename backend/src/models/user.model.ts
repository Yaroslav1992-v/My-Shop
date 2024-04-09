import mongoose, { Schema } from "mongoose";
export const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: {
      type: String,
      require: true,
    },
    isAdmin: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);

export default User;
