import mongoose, { Schema } from "mongoose";
import { reviewSchema } from "./review.model.js";
const ProductSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User",
    },
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true },
    numReviews: { type: Number, default: 0 },
    reviews: [reviewSchema],
}, { timestamps: true });
const Product = mongoose.model("Product", ProductSchema);
export default Product;
//# sourceMappingURL=product.model.js.map