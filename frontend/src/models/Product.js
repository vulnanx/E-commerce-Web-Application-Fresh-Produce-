import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const productSchema = new Schema (
    {
        name: String,
        img: String,
        desc: String,
        type: String, 
        stock: Number,
        price: Number
    }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;