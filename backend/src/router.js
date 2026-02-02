import * as controller from './controller.js';

const router = (app) => {
    
    // USERS
    app.get('/getUserById', controller.getUserById); // input: uid, output: user object
    app.get('/getAllUsers', controller.getAllUsers); // input: uid , output: array of user object
    app.post('/updateProfileDetails', controller.updateProfileDetails); // input: uid, fname, mname, lname 
    app.get('/checkEmailExists', controller.checkEmailExists); // input: email, output: boolean (exists)
    app.post('/signUp', controller.signUp); // input: [fname, mname, lname, type, email, pword]
    app.get('/signIn', controller.signIn); // input: [email ,password] , output: uid

    // PRODUCTS
    app.get('/getProductById', controller.getProductById) // input: pid, output: product object
    app.get('/getProducts', controller.getProducts); // input: - , output: array of product object
    app.get('/getProductAscendingName', controller.getProductAscendingName); // input: product type , output: array of product object
    app.get('/getProductDescendingName', controller.getProductDescendingName); // input: product type , output: array of product object
    // app.get('/getTypeAscending', controller.getTypeAscending); // input: product type , output: array of product object
    // app.get('/getTypeDescending', controller.getTypeDescending); // input: product type  , output: array of product object
    app.get('/getPriceAscending', controller.getPriceAscending); // input: product type , output: array of product object
    app.get('/getPriceDescending', controller.getPriceDescending); // input: product type , output: array of product object
    app.get('/getQuantityAscendingProduct', controller.getQuantityAscendingProduct); // input: product type , output: array of product object
    app.get('/getQuantityDescendingProduct', controller.getQuantityDescendingProduct); // input: product type , output: array of product object
    app.post('/addProductToInventory', controller.addProductToInventory); // input:  [uid , name, img, desc, type, quantity_available, price]
    app.post('/updateItem', controller.updateItem); // input: [uid, pid,name,img,desc,type,quantity_available,price]
    app.delete('/deleteInventoryItem', controller.deleteInventoryItem); // input: [pid, uid]

    // SHOPPING CART
    app.get('/getShoppingCartItems', controller.getShoppingCartItems); // input: uid, output: array of cart objects
    app.get('/getCartByCID', controller.getCartByCID); // input: cid, output: cart object
    app.get('/getCartByPidUid', controller.getCartByPidUid); // input: [pid, uid] , output: cart object
    // app.post('/incrementQuantity', controller.incrementQuantity); // input: [pid, uid] 
    // app.post('/decrementQuantity', controller.decrementQuantity); // input: [pid, uid]
    app.post('/updateCartQuantity', controller.updateCartQuantity); // input: [cid,quantity,price]
    app.post('/addToCart', controller.addToCart); // input: [pid, uid] 
    app.post('/deleteCart', controller.deleteCart); // input: [pid, uid] 
    
    // ORDERS (make sure to update product inventory!)
    app.get('/getUserPendingOrders', controller.getUserPendingOrders); // input: uid, output: array of order objects
    app.get('/getUserCompletedOrders', controller.getUserCompletedOrders); // input: uid, output: array of order objects
    app.get('/getUserCancelledOrders', controller.getUserCancelledOrders); // input: uid, output: array of order objects
    app.get('/getAllPendingOrders', controller.getAllPendingOrders); // input: uid , output: array of order objects
    app.get('/getAllCompletedOrders', controller.getAllCompletedOrders); // input: uid , output: array of order objects
    app.get('/getAllCancelledOrders', controller.getAllCancelledOrders); // input: uid , output: array of order objects
    
    app.post('/createOrderCheckOut', controller.createOrderCheckOut); // input: [cid, uid] 
    app.post('/confirmOrder', controller.confirmOrder); // input: [tid, uid]
    app.post('/cancelOrder', controller.cancelOrder); // input: order object

    // SALES REPORT
    app.get('/getWeeklyTotalSales', controller.getWeeklyTotalSales); // input: ?week=0 (index ng week of the year, 0-indexing), output: sum total sales of completed orders of week input
    app.get('/getMonthlyTotalSales', controller.getMonthlyTotalSales); // input: ?month=0 (index ng month, 0-indexing), output: sum total sales of completed orders of month input
    app.get('/getYearlyTotalSales', controller.getYearlyTotalSales); // input: ?year=2025, output: sum total sales of completed orders of year input
    app.get('/getWeeklyTotalSalesProduct', controller.getWeeklyTotalSalesProduct); // input: [uid, week], output: sum total sales of product of week input
    app.get('/getMonthlyTotalSalesProduct', controller.getMonthlyTotalSalesProduct); // input: [uid, month], output: sum total sales of product of month input
    app.get('/getYearlyTotalSalesProduct', controller.getYearlyTotalSalesProduct); // input: [uid, year], output: sum total sales of product of year input

}

export default router;