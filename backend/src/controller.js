
import { User, Product, Order, Cart } from './models.js';

// REQUEST TO TEST FRONT-END AND BACK-END CONNECTION
export const getMessage = (req,res) => {
    res.json({message: "Hello from the backend!"});
}
// TEST
export const homepage = (req,res) => {
    res.send("Welcome to the Homepage!");
}
// GETTING ALL THE USERS
export const getAllUsers = async (req,res) => {
    try {
        const { uid } = req.query;
        if (!uid) {
            return res.json({message: "UID is missing"});
        }
        const user = await User.findById(uid);
        if (!user) {
            return res.json({message: "User does not exist"});
        }
        if (user.type !== "admin") {
            return res.json({message: "You do not have authority to access data"});
        }
        const allUsers = await User.find()
        res.json(allUsers)
    } catch (err) {
        res.status(500).json({error: "cannot load user data"})
    }
}
// GET USER BY ID
export const getUserById = async (req, res) => {
    const {id} = req.query;
    try{
        const user = await User.findById(id);
        if(!user) {
            return res.status(404).json({error: "User not found"});
        }
        return res.json(user);
    }catch(err){
        res.status(500).json({error: "cannot load the information"});
    }
}
// GETTING THE PRODUCTS INFORMATION VIA PRODUCT ID
export const getProductById = async (req, res) => {
    const { pid } = req.query;
    try{
        const product = await Product.findById(pid);
        if(!product) {
            return res.status(404).json({error: "Product not found"});
        }
        return res.json(product);
    }catch(err){
        res.status(500).json({error: "cannot load the information"});
    }
}
// GETTING ALL THE INFORMATION OF THE PRODUCTS
export const getProducts = async (req,res) => {
    try{
        const products = await Product.find()
        return res.json(products)
    }catch(err){
        res.status(500).json({error: "cannot load product data"})
    }
}
// GETTING ALL THE INFORMATION OF THE PRODUCT IN ASCENDING ORDER
export const getProductAscendingName = async (req, res) => {
    try {
        const { type } = req.query;
        if (!type) {
            return res.status(400).json({ error: "Missing 'type' query parameter" });
        }
        const productSorted = await Product.find({ type: type }).sort({ name: 1 });
        return res.json(productSorted);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Cannot load user product" });
    }
};

// GETTING ALL THE INFORMATION OF THE PRODUCT IN DESCENDING ORDER
export const getProductDescendingName = async (req,res) => {
    try{
        const {type} = req.query;
        if (!type) {
            return res.status(400).json({ error: "Missing 'type' query parameter" });
        }
        const productSorted = await Product.find({type: type}).sort({name:-1})
        return res.json(productSorted)
    }catch(err){
        res.status(500).json({error: "cannot load product data"})
    }
}
// GETTING THE TYPE OF USER (ADMIN FIRST)
export const getTypeAscending = async (req, res) => {
    try{
        const {type} = req.query;
        const typeSorted = await User.find({type: type}).sort({type:1})
        return res.json(typeSorted)
    }catch(err){
        res.status(500).json({error: "cannot load types of user"})
    }
}
// GETTING THE TYPE OF USER (USER FIRST)
export const getTypeDescending = async (req, res) => {
    try{
        const {type} = req.query;
        const typeSorted = await User.find({type: type}).sort({type:-1})
        return res.json(typeSorted)
    }catch(err){
        res.status(500).json({error: "cannot load types of user"})
    }
}
// GETTING THE PRICE OF THE PRODUCT IN ASCENDING ORDER
export const getPriceAscending = async (req, res) => {
    try{
        const {type} = req.query;
        const priceProduct = await Product.find({type: type}).sort({price:1})
        return res.json(priceProduct)
    }catch(err){
        res.status(500).json({error: "cannot load the price of the product"})
    }
}
// GETTING THE PRICE OF THE PRODUCT IN DESCENDING ORDER
export const getPriceDescending = async (req, res) => {
    try{
        const {type} = req.query;
        const priceProduct = await Product.find({type: type}).sort({price:-1})
        return res.json(priceProduct)
    }catch(err){
        res.status(500).json({error: "cannot load the price of the product"})
    }
}
// GETTING THE QUANTITY AVAILABLE FROM THE PRODUCTS IN ASCENDING ORDER
export const getQuantityAscendingProduct = async (req, res) => {
    try{
        const {type} = req.query;
        const quantityAscending = await Product.find({type: type}).sort({stock:1})
        return res.json(quantityAscending)
    }catch(err){
        res.status(500).json({error: "cannot load the number of items"})
    }
}
// GETTING THE QUANTITY AVAILABLE FROM THE PRODUCTS IN DESCENDING ORDER
export const getQuantityDescendingProduct = async (req, res) => {
    try{
        const {type} = req.query;
        const quantityAscending = await Product.find({type: type}).sort({stock:-1})
        return res.json(quantityAscending)
    }catch(err){
        res.status(500).json({error: "cannot load the number of items"})
    }
}

// GETS ALL SHOPPING CARTS OF USER VIA UID
export const getShoppingCartItems = async (req, res) => {
    try {
        const { uid } = req.query;
        if (!uid) {
            return res.status(400).json({ error: "Missing UID in query parameters." });
        }
        const carts = await Cart.find({ uid : uid});
        return res.status(200).json(carts);
        
    } catch (error) {
        console.error("Error fetching shopping cart items:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
//GET SPECIFIC SHOPPING CART VIA CID
export const getCartByCID = async (req, res) => {
    try{
        const { cid } = req.query;

        const cart = await Cart.findById(cid);
        if(!cart) {
            return res.status(404).json({message: "Cart not found"});
        }
        const product = await Product.findById(cart.pid);
        if (!product) {
            return res.status(404).json({message: "Product not found"});
        }
        res.json({cart , product});
    }catch(err){
        res.status(500).json({message: "cannot load the information"});
    }
}

// GETS CID VIA PID AND UID
export const getCartByPidUid = async (req, res) => {
    try{
        const { pid, uid } = req.query;
        if (!pid || !uid) {
            return res.status(400).json({success: false, message: "product id or user id is required."});
        }
        const cart = await Cart.findOne({uid, pid});
        if(!cart) {
            return res.status(404).json({error: "Cart not found"});
        }
        const product = await Product.findById(cart.pid);
        if (!product) {
            return res.status(404).json({error: "Product not found"});
        }
        res.json({cart , product});
    }catch(err){
        res.status(500).json({error: "cannot load the information"});
    }
}
// ADD USER TO DATABASE FOR SIGN UP
export const signUp = async (req,res) => {
    try {        
        const { fname, mname, lname, type, email, pword } = req.body;
        const user = await User.findOne({email})
        
        const newUser = new User({ fname, mname, lname, type, email, pword });
        await newUser.save(); // add new user to the database
        return res.status(201).json({ 
            success: true, 
            userId: newUser._id.toString(),
            fname: fname,
            mname: mname,
            lname: lname,
            type: type,
            email: email,
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
// GET USER ID FOR LOG IN 
export const signIn = async (req, res) => {
    try {
        const { email, password } = req.query;
        const user = await User.findOne({email})

        if (password != user.pword) {
            return res.status(401).json({error: 'Incorrect password'});
        }
        return res.json({
            success: true, 
            userId: user._id.toString(),
        });

    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: error.message
        });
    }
};
// CHECK IF EMAIL EXISTS
export const checkEmailExists = async (req, res) => {
    try {
        const { email } = req.query;
        const user = await User.findOne({email})

        if (!user) {
            return res.json({exists: false});
        }
        return res.json({exists: true});

    } catch (error) {
        res.status(500).json({ success: false, error: error.message});
    }
};

// ADD PRODUCT TO INVENTORY
export const addProductToInventory = async (req,res) => {
    try {
        const { uid, name, img, desc, type, stock, price } = req.body;
        if (!uid || !name || !img || !desc || !type || !stock || !price) {
            return res.json({message: "missing input parameters"});
        }
        const user = await User.findById(uid);
        if (!user) {
            return res.json({message: "User does not exist"});
        }
        if (user.type !== "admin") {
            return res.json({message: "You do not have authority to add to inventory"});
        }
        const newProduct = new Product({ name, img, desc, type, stock, price });
        await newProduct.save(); // Save to database
        res.status(201).json({ success: true, product: newProduct });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}

export const addToCart = async (req, res) => {
    try {
        const { pid, uid } = req.body;

        if (!pid || !uid) {
            return res.status(400).json({ success: false, message: "Product ID and User ID are required." });
        }
        
        // get product
        const product = await Product.findById(pid);
        if (!product) {
            return res.status(404).json({ success: false, message: "No product found"})
        }

        // get cart
        const cartItem = await Cart.findOne({ pid, uid }); 

        // creating a new cart if it does not exist yet
        if (!cartItem) { 
            const newCart = new Cart({ uid: uid, pid: pid, quantity: 1, total_price: product.price });
            await newCart.save();
            return res.status(200).json({ success: true, cart: newCart });
        }

        // check if product stock can accomodate the adding to cart
        if (cartItem.quantity + 1 > product.stock) {
            return res.status(200).json({ success: false, message: 'max available quantity of item added to cart reached!' });
        }

        // adding quantity to existing cart
        cartItem.quantity += 1;
        cartItem.total_price = cartItem.quantity * product.price; 
        await cartItem.save();

        return res.json({success: true, cart: cartItem});
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    } 
}

// // INCREMENTS & DECREMENTS AND UPDATES TOTAL PRICE OF SHOPPING CART
export const updateCartQuantity = async (req, res) => {
    try {
        const { cid, quantity, price } = req.body;
        const cartItem = await Cart.findById(cid);
        if (!cartItem) {
            return res.status(404).json({ success: false, message: "Cart item not found." });
        }
        cartItem.quantity = quantity;
        cartItem.total_price = quantity * price;
        await cartItem.save();
        res.status(200).json({ success: true, cartItem , message: "Successfully updated quantity"});
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

export const incrementQuantity = async (req, res) => {
    try {
        const { uid, pid } = req.body;
        const cartItem = await Cart.findOne({ uid, pid });
        if (!cartItem) {
            return res.status(404).json({ success: false, message: "Cart item not found." });
        }
        const product = await Product.findById(pid);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found." });
        }
        cartItem.quantity += 1;
        cartItem.total_price = cartItem.quantity * product.price;
        await cartItem.save();
        res.status(200).json({ success: true, cartItem });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
export const decrementQuantity = async (req, res) => {
    try {
        const { uid, pid } = req.body;
        const cartItem = await Cart.findOne({ uid, pid });
        if (!cartItem) {
            return res.status(404).json({ success: false, message: "Cart item not found." });
        }
        const product = await Product.findById(pid);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found." });
        }
        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
            cartItem.total_price = Math.max(cartItem.quantity * product.price, 0);
            await cartItem.save();
            return res.status(200).json({ success: true, cartItem });
        } else {
            return res.status(400).json({ success: false, message: "Quantity cannot be less than 1." });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
// EMAIL VALIDATOR FOR USER SIGNING UP
export const checkExistingEmail = async (req, res) => {
    const {email} = req.query;
    try{
        const user = await User.findOne({ email });
        if(user) {
            return res.json({exists: true});
        }
        return res.json({exists: false});
    }catch(err){
        res.status(500).json({error: err});
    }
}
// FOR DELETING CARD OPTION FOR USER
export const deleteCart = async (req, res) => {
    try {
        const { uid, pid } = req.body;

        if (!uid || !pid) {
            return res.status(400).json({ success: false, message: "User ID and Product ID are required." });
        }
        const deletedItem = await Cart.findOneAndDelete({ uid, pid });
        if (!deletedItem) {
            return res.status(404).json({ success: false, message: "Cart item not found." });
        }
        return res.status(200).json({ success: true, message: "Cart item deleted successfully." });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}
// CHECKING OUT THE CART / CREATING AN ORDER REQUEST (PENDING)
export const createOrderCheckOut = async (req, res) => {
    try {
        const { uid, pid , email, quantity, total_price, status, date_requested, date_confirmed, date_cancelled, img, mot, address, contactno} = req.body; 

        // validate input
        if (!uid || !pid) {
            return res.status(400).json({ success: false, message: "User ID and Product ID are required." });
        }

         // fetch product details 
         const product = await Product.findById(pid); //  to get the name and type of the product
         if (!product) {
            return console.error(`Product not found: ${pid}`); 
         }

         // ensure there is enough stock
        if (product.quantity_available < quantity) {
            return res.status(400).json({
                success: false,
                message: `Not enough stock. Available: ${product.quantity_available}`
            });
        }
        
         // create a new order
        const newOrder = new Order({
            uid: uid,
            pid: pid,
            email: email,
            name: product.name,
            type: product.type,
            quantity: quantity,
            total_price: total_price,
            status: status,
            date_requested: date_requested,
            date_confirmed: date_confirmed,
            date_cancelled: date_cancelled,
            img: img,
            mot: mot,
            address: address,
            contactno: contactno,
        });

        await newOrder.save();

        // decrement the product stock based on the checkout quantity
        product.quantity_available -= quantity;
        await product.save();

        return res.status(201).json({ success: true, order: newOrder });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

export const getUserPendingOrders = async (req, res) => {
    try{
        const { uid } = req.query;
        if (!uid) {
            return res.status(400).json({ error: "Missing user ID" });
        }
        const pendingOrders = await Order.find({uid: uid, status: "0"});
        if (pendingOrders.length === 0) {
            return res.json([]);
        }
        return res.json(pendingOrders);
    }catch(err){
        res.status(500).json({error: "cannot load the information"});
    }
}

export const getUserCompletedOrders = async (req, res) => {
    try{
        const { uid } = req.query;

        if (!uid) {
            return res.status(400).json({ error: "Missing user ID" });
        }
        const completedOrders = await Order.find({uid: uid, status: "1"});
        if (completedOrders.length === 0) {
            return res.json([]);
        }
        return res.json(completedOrders);
    } catch (err) {
        res.status(500).json({error: "cannot load the information"});
    }
}
export const getUserCancelledOrders = async (req, res) => {
    try{
        const { uid } = req.query;
        if (!uid) {
            return res.status(400).json({ error: "Missing user ID" });
        }
        const cancelledOrders = await Order.find({uid: uid, status: "2"});
        if (cancelledOrders.length === 0) {
            return res.json([]);
        }
        return res.json(cancelledOrders);
    }catch(err){
        res.status(500).json({error: "cannot load the information"});
    }
}
// UPDATE AND EDIT PROFILE DETAILS
export const updateProfileDetails = async (req, res) => {
    try {
        const { uid, fname, mname, lname } = req.body;
        if (!uid) {
            return res.status(400).json({ error: "Missing user ID" });
        }
        const user = await User.findById(uid); // Assumes you're using Mongoose and `uid` is the _id
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        // Update only if values are provided
        if (fname) user.fname = fname;
        if (mname) user.mname = mname;
        if (lname) user.lname = lname;
        await user.save();
        return res.status(200).json({ success: true, message: "Profile updated" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
// UPDATE THE ITEMS IN ADMIN VIEW
export const updateItem = async (req,res) => {
    try {
        const { uid, pid, name, img, desc, type, quantity_available, price} = req.body;
        if (!uid || !pid || !name || !img || !desc || !type || !quantity_available || !price) {
            return res.status(400).json({ error: "Missing input parameters" });
        }
        const user = await User.findById(uid);
        if (!user) {
            return res.json({message: "User does not exist"});
        }
        if (user.type !== "admin") {
            return res.json({message: "You do not have authority to access data"});
        }
        const product = await Product.findById(pid);
        if (!product) {
            return res.status(400).json({ error: "Product does not exist" });
        }
        if (name) product.name = name;
        if (img) product.img = img;
        if (desc) product.desc = desc;
        if (type) product.type = type;
        if (quantity_available) product.quantity_available = quantity_available;
        if (price) product.price = price;
        await product.save();
        return res.status(200).json({ success: true, message: "Product updated" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
}
// GET ALL PENDING, COMPLETED, CANCELLED ORDERS FOR ADMIN VIEW
export const getAllPendingOrders = async (req, res) => {
    try {
        const { uid } = req.query;
        if (!uid) {
            return res.json({message: "UID is missing"});
        }
        const user = await User.findById(uid);
        if (!user) {
            return res.json({message: "User does not exist"});
        }
        if (user.type !== "admin") {
            return res.json({message: "You do not have authority to access data"});
        }
        const allPendingOrders = await Order.find({ status: 0 });
        if (allPendingOrders.length === 0) {
            return res.json({ message: "No pending orders" });
        }
        res.json(allPendingOrders);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}
export const getAllCompletedOrders = async (req, res) => {
    try {
        const { uid } = req.query;
        if (!uid) {
            return res.json({message: "UID is missing"});
        }
        const user = await User.findById(uid);
        if (!user) {
            return res.json({message: "User does not exist"});
        }
        if (user.type !== "admin") {
            return res.json({message: "You do not have authority to access data"});
        }
        const allCompletedOrders = await Order.find({ status: 1 });
        if (allCompletedOrders.length === 0) {
            return res.json({ message: "No completed orders" });
        }
        res.json(allCompletedOrders);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}
export const getAllCancelledOrders = async (req, res) => {
    try {
        const { uid } = req.query;
        if (!uid) {
            return res.json({message: "UID is missing"});
        }
        const user = await User.findById(uid);
        if (!user) {
            return res.json({message: "User does not exist"});
        }
        if (user.type !== "admin") {
            return res.json({message: "You do not have authority to access data"});
        }
        const allCancelledOrders = await Order.find({ status: 2 });
        if (allCancelledOrders.length === 0) {
            return res.json({ message: "No cencelled orders" });
        }
        res.json(allCancelledOrders);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}
// CANCEL AND ACCEPT ORDER
export const cancelOrder = async (req, res) => {
    try{
        const { tid } = req.body;
        if (!tid) {
            return res.status(400).json({ success: false , message: "Missing order ID" });
        }
        const orderToCancel = await Order.findById(tid);
        if (!orderToCancel) {
            return res.status(404).json({ success: false , message: "Order not found" });
        }
        orderToCancel.status = '2';
        orderToCancel.date_cancelled = new Date();
        await orderToCancel.save();

        // update the status of the available stocks of the product 
        const product = await Product.findById(orderToCancel.pid);
        if(!product) {
            return res.status(404).json({error: "Product not found"});
        }
        product.stock += orderToCancel.quantity 
        await product.save();

        return res.status(200).json({ success: true, message: "Successfully cancelled" });

    }catch(err){
        res.status(500).json({error: err});
    }
}
export const confirmOrder = async (req,res) => {
    try{
        const { tid, uid } = req.body;
        if (!tid || !uid) {
            return res.status(400).json({ success: false, message: "Missing input parameters" });
        }
        const user = await User.findById(uid);
        if (!user) {
            return res.json({ success: false, message: "User does not exist"});
        }
        if (user.type !== "admin") {
            return res.json({ success: false, message: "You do not have authority to access data"});
        }
        const orderToConfirm = await Order.findById(tid);
        if (!orderToConfirm) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        orderToConfirm.status = '1';
        orderToConfirm.date_confirmed = new Date();
        await orderToConfirm.save();

        // // update the product inventory
        // const userCart = await Cart.findById(orderToConfirm.cid);
        // if (!userCart) {
        //     return res.status(404).json({ success: false, message: "Cart not found" });
        // }
        // const productToUpdate = await Product.findById(userCart.pid);
        // if (!productToUpdate) {
        //     return res.status(404).json({ success: false, message: "Product not found" });
        // }
        // // modify count
        // productToUpdate.quantity_available -= userCart.quantity;
        // await productToUpdate.save();

        return res.status(200).json({ success: true, order: orderToConfirm });
    } catch(err){
        res.status(500).json({success: false, message: err});
    }
}
// GETTING TOTAL SALES REPORT EVERY WEEK, MONTH, YEAR
// function to compute nth week of an input date in a year (reference: https://stackoverflow.com/questions/9045868/javascript-date-getweek)
// Date.prototype.getWeek = function () {
//     const oneJan = new Date(this.getFullYear(), 0, 1);
//     const dayOfYear = Math.floor((this - oneJan) / 86400000);
//     return Math.floor((dayOfYear + oneJan.getDay()) / 7);
// };

// export const getWeeklyTotalSales = async (req, res) => {
//     try { // ?week=2 yung query
//         const week = parseInt(req.query.week); 
//         if (isNaN(week) || week < 0 || week > 51) { 
//             return res.status(400).json({ message: "Invalid week number. Must be between 0-51" });
//         }
//         const completedOrders = await Order.find({ status: "1" });
//         const completedWeekOrder = completedOrders.filter(order => {
//             const orderDate = new Date(order.date_confirmed)
//             return orderDate.getWeek() === week;
//         });
        
//         const orderTotals = completedWeekOrder.map(order => order.total_price);
//         const totalWeeklySales = orderTotals.reduce((sum, price) => sum + price, 0); //array.reduce((accumulator, currentValue) => {}, initialValue);
//         return res.json(totalWeeklySales);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

Date.prototype.getWeek = function () {
    const oneJan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - oneJan) / 86400000) + oneJan.getDay() + 1) / 7);
};

export const getWeeklyTotalSales = async (req, res) => {
    try {
        const week = parseInt(req.query.week); // 0–51
        const year = 2025;

        if (isNaN(week) || week < 0 || week > 51) {
            return res.status(400).json({ message: "Invalid week number. Must be between 0-51." });
        }

        if (isNaN(year)) {
            return res.status(400).json({ message: "Invalid year." });
        }

        const completedOrders = await Order.find({ status: "1" });
        const completedWeekOrder = completedOrders.filter(order => {
            const orderDate = new Date(order.date_confirmed);
            return orderDate.getWeek() === week && orderDate.getFullYear() === year;
        });

        const orderTotals = completedWeekOrder.map(order => order.total_price);
        const totalWeeklySales = orderTotals.reduce((sum, price) => sum + price, 0);

        return res.json({ totalWeeklySales });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const getMonthlyTotalSales = async (req, res) => {
    try { // ?month=1 yung query
        const monthNum = parseInt(req.query.month); // Jan=0, Feb=1, March=2, Apr=3, ...
        const year = 2025;
        if (isNaN(monthNum) || monthNum < 0 || monthNum > 11) {
            return res.status(400).json({ message: "Invalid month number. Must be 0-11." });
        }
        const completedOrders = await Order.find({ status: "1" });
        const completedMonthOrder = completedOrders.filter(order => {
            const orderDate = new Date(order.date_confirmed); 
            return (
                orderDate.getMonth() === monthNum &&
                orderDate.getFullYear() === year
            );
        });
        const orderTotals = completedMonthOrder.map(order => order.total_price);
        const totalMonthlySales = orderTotals.reduce((sum, price) => sum + price, 0); //array.reduce((accumulator, currentValue) => {}, initialValue);
        
        return res.json(totalMonthlySales);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const getYearlyTotalSales = async (req, res) => {
    try { // ?year=2025 yung query
        const year = parseInt(req.query.year); 
        if (isNaN(year) || year < 2020 || year > 2025) { // initialize na lang na from 2020-2025 yung data
            return res.status(400).json({ message: "Invalid year number. Must be between 2020-2025" });
        }
        const completedOrders = await Order.find({ status: "1" });
        const completedYearOrder = completedOrders.filter(order => {
            const orderDate = new Date(order.date_confirmed); 
            return orderDate.getFullYear() === year;
        });
        const orderTotals = completedYearOrder.map(order => order.total_price);
        const totalYearlySales = orderTotals.reduce((sum, price) => sum + price, 0); //array.reduce((accumulator, currentValue) => {}, initialValue);
        return res.json(totalYearlySales);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// GETTING TOTAL SALES REPORT EVERY WEEK, MONTH, YEAR OF SPECIFIC PRODUCT
export const getWeeklyTotalSalesProduct = async (req, res) => {
    try { // ?week=2 yung query
        const pid = req.query.pid;
        if (!pid) {
            return res.status(400).json({ message: "Missing product id" });
        }
        const week = parseInt(req.query.week); 
        if (isNaN(week) || week < 0 || week > 51) { 
            return res.status(400).json({ message: "Invalid week number. Must be between 0-51" });
        }
        const completedOrders = await Order.find({ status: 1 });
        const completedWeekOrder = completedOrders.filter(order => {
            const orderDate = new Date(order.date_confirmed)
            return orderDate.getWeek() === week;
        });
        const cartTotals = await Promise.all( // Promise.all() allows you to run multiple asynchronous operations in parallel and wait for all of them to finish before continuing.
            completedWeekOrder.map(async (order) => {
                if (!order.cid) return 0;
                const cart = await Cart.findOne({ _id: order.cid, pid });
                if (!cart) return 0;
                return cart.total_price;
            })
        );
        const totalWeeklySalesProduct = cartTotals.reduce((sum, price) => sum + price, 0); //array.reduce((accumulator, currentValue) => {}, initialValue);
        return res.json(totalWeeklySalesProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const getMonthlyTotalSalesProduct = async (req, res) => {
    try { // ?month=1 yung query
        const pid = req.query.pid;
        if (!pid) {
            return res.status(400).json({ message: "Missing product id" });
        }
        const monthNum = parseInt(req.query.month); // Jan=0, Feb=1, March=2, Apr=3, ...
        if (isNaN(monthNum) || monthNum < 0 || monthNum > 11) {
            return res.status(400).json({ message: "Invalid month number. Must be 0-11." });
        }
        const completedOrders = await Order.find({ status: 1 });
        const completedMonthOrder = completedOrders.filter(order => {
            const orderDate = new Date(order.date_confirmed); 
            return orderDate.getMonth() === monthNum;
        });
        const cartTotals = await Promise.all( // Promise.all() allows you to run multiple asynchronous operations in parallel and wait for all of them to finish before continuing.
            completedMonthOrder.map(async (order) => {
                if (!order.cid) return 0;
                const cart = await Cart.findOne({ _id: order.cid, pid });
                if (!cart) return 0;
                return (cart && cart.total_price);
            })
        );
        const totalMonthlySalesProduct = cartTotals.reduce((sum, price) => sum + price, 0); //array.reduce((accumulator, currentValue) => {}, initialValue);
        return res.json(totalMonthlySalesProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const getYearlyTotalSalesProduct = async (req, res) => {
    try { // ?year=2025 yung query
        const pid = req.query.pid;
        if (!pid) {
            return res.status(400).json({ message: "Missing product id" });
        }
        const year = parseInt(req.query.year); 
        if (isNaN(year) || year < 2020 || year > 2025) { // initialize na lang na from 2020-2025 yung data
            return res.status(400).json({ message: "Invalid year number. Must be between 2020-2025" });
        }
        const completedOrders = await Order.find({ status: 1 });
        const completedYearOrder = completedOrders.filter(order => {
            const orderDate = new Date(order.date_confirmed); 
            return orderDate.getFullYear() === year;
        });
        const cartTotals = await Promise.all( // Promise.all() allows you to run multiple asynchronous operations in parallel and wait for all of them to finish before continuing.
            completedYearOrder.map(async (order) => {
                if (!order.cid) return 0;
                const cart = await Cart.findOne({ _id: order.cid, pid });
                if (!cart) return 0;
                return (cart && cart.total_price);
            })
        );
        const totalYearlySalesProduct = cartTotals.reduce((sum, price) => sum + price, 0); //array.reduce((accumulator, currentValue) => {}, initialValue);
        return res.json(totalYearlySalesProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteInventoryItem = async (req, res) => {
    try {
        const { itemId } = req.body; // The ID passed in the request body

        if (!itemId) {
            return res.status(400).json({ message: "Item ID is required" });
        }

        // Find the product by the '_id' field (MongoDB's default unique identifier)
        const item = await Product.findById(itemId); 
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        // Delete the item from the database
        await Product.findByIdAndDelete(itemId);

        res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

