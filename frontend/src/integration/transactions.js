const PORT = 8080;

// for the add to cart button in ItemCard
export async function handleAddToCart(uid, pid) {
    try {
        // check if the quantity they want to order exceeds the available stocks 
        const response = await fetch(`http://localhost:8080/addToCart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uid, pid }),
        });

        const res = await response.json();
        
        if (!res.success) {
            return { success: false, message: res.message };
        }

        return { success: true, cart: res.cart };

    } catch (error) {
        console.error("error:", error);
        return { message: error.message };
    }
}

// for increment and decrement button in CartTile
export async function updateQuantityInDB(cid, quantity, price) {
    try {
        // update the quantity of item with the quantity state in UI
        const response = await fetch(`http://localhost:8080/updateCartQuantity`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cid, quantity, price }),
        });
    } catch (error) {
        console.error("error:", error);
    }
}

// for deleting of cart in CartTile
export async function deleteCart(uid, pid) {
    try {
        // router: app.post('/deleteCart', controller.deleteCart); // input: [pid, uid] 
        const response = await fetch(`http://localhost:8080/deleteCart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uid, pid }),
        });

        const data = await response.json();
        return data

    } catch (error) {
        console.error("error:", error);
    }
}

// cancelling order
export async function cancelOrder(tid) {
    try {
        // router: app.post('/cancelOrder', controller.cancelOrder); // input: tid
        const response = await fetch(`http://localhost:8080/cancelOrder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tid }),
        });

        const data = await response.json();
        return data

    } catch (error) {
        console.error("error:", error);
    }
}

// in item_cart_order_tile.js (or your integration file)
export async function confirmOrder(tid, uid) {
  try {
    const response = await fetch(`http://localhost:8080/confirmOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tid, uid }),  // include uid here!
    });
    const data = await response.json();
    return data;

  } catch (error) {
    console.error("error:", error);
    return null;
  }
}


// for checking out
export async function orderCheckOut(userId, cartArray, email, address, paymentMethod, contactNumber) {
    try {

        for (const item of cartArray) { // id , pid, name, type, price, quantity, img
            if (!item) {
                console.error(`Cart item missing: ${item.pid}`);
                continue;
            }
           
            // router : app.post('/createOrderCheckOut', controller.createOrderCheckOut); // input: [cid, uid] 
            const response = await fetch(`http://localhost:8080/createOrderCheckOut`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    uid: userId,
                    pid: item.pid,
                    email: email,
                    quantity: item.quantity,
                    total_price: item.price,
                    status: '0',
                    date_requested: new Date(),
                    date_confirmed: null,
                    date_cancelled: null,
                    img: item.img,
                    mot: paymentMethod,
                    address: address,
                    contactno: contactNumber,
                 }),
            });
    
            const data = await response.json();

            if (data.success) {
                // delete the cart using router: app.post('/deleteCart', controller.deleteCart); // input: [pid, uid] 
                const delResponse = await fetch(`http://localhost:8080/deleteCart`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ pid: item.pid, uid: userId }),
                });

                const delData = await delResponse.json();
                if (!delData.success) {
                    console.error(`Failed to delete cart item: ${item.pid}`);
                }
            } else {
                console.error(`Failed to create order for item: ${item.pid}`);
                continue;
            }
        }
        return { success: true, message: "Checkout complete" };

    } catch (error) {
        console.error("Checkout error:", error);
        throw new Error(`Error checking out: ${error.message}`);
    }
}


