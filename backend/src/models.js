import mongoose from 'mongoose';

// COLLECTION OF SCHEMAS
const userSchema = new mongoose.Schema({
    fname: String,
    mname: String,
    lname: String,
    type: String,
    email: String,
    pword: String
}, { collection: "users" , versionKey: false });
export const User = mongoose.model('User', userSchema);

const productSchema = mongoose.Schema({
    name : String,
    img: String,
    desc: String,
    type: String,
    stock: Number,
    price: Number,
}, { collection: "products" , versionKey: false});

export const Product = mongoose.model('products', productSchema);

const orderSchema = mongoose.Schema({
    uid: String,
    pid: String,
    email: String,
    name: String,
    type: String,
    quantity: Number,
    total_price: Number,
    status: String,
    date_requested: Date,
    date_confirmed: Date,
    date_cancelled: Date,
    img: String,
    mot: String,
    address: String,
    contactno: String,
    
}, { collection: "orders" , versionKey: false});
export const Order = mongoose.model('orders', orderSchema);

const cartSchema = mongoose.Schema({
    uid: String,
    pid: String,
    quantity: Number,
    total_price: Number,
}, { collection: "carts" , versionKey: false});
export const Cart = mongoose.model('carts', cartSchema);
