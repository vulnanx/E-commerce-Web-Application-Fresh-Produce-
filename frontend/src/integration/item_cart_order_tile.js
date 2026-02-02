const PORT = 8080;

// router:     app.get('/getShoppingCartItems', controller.getShoppingCartItems); // input: uid, output: array of cart objects
export async function handleGetShoppingCartItems(uid) {
  try {
      const response = await fetch(`http://localhost:${PORT}/getShoppingCartItems?uid=${encodeURIComponent(uid)}`);
      if (!response.ok) {
          //alert(error)
      }
      const shoppingCartArray = await response.json();
      return shoppingCartArray;

  } catch (error) {
      console.error("Error fetching item:", error);
      return null; // Return null if there's an error
  }
}

export async function handleGetItems(type, sort, order) {
    try {
        type = type.trim();
        if (sort === "1") { // sort by name
          if (order === "1") { // sort name ascending
            const response = await fetch(`http://localhost:${PORT}/getProductAscendingName?type=${encodeURIComponent(type)}`);
            const itemsArray = await response.json();
            if (!response.ok) {
              //alert(error)
            }
            return itemsArray;
          } else { // sort name descending
            const response = await fetch(`http://localhost:${PORT}/getProductDescendingName?type=${encodeURIComponent(type)}`);
            const itemsArray = await response.json();
            if (!response.ok) {
              //alert(error)
            }
            return itemsArray;
          }
        } else if (sort === "2") { // sort by price
          if (order === "1") { // sort price ascending
            const response = await fetch(`http://localhost:${PORT}/getPriceAscending?type=${encodeURIComponent(type)}`);
            const itemsArray = await response.json();
            if (!response.ok) {
              //alert(error)
            }
            return itemsArray;
          } else { // sort price descending
            const response = await fetch(`http://localhost:${PORT}/getPriceDescending?type=${encodeURIComponent(type)}`);
            const itemsArray = await response.json();
            if (!response.ok) {
              //alert(error)
            }
            return itemsArray;
          }
        } else { // sort by quantity 
          if (order === "1") { // sort quantity ascending
            const response = await fetch(`http://localhost:${PORT}/getQuantityAscendingProduct?type=${encodeURIComponent(type)}`);
            const itemsArray = await response.json();
            if (!response.ok) {
              //alert(error)
            }
            return itemsArray;
          } else { // sort quantity descending
            const response = await fetch(`http://localhost:${PORT}/getQuantityDescendingProduct?type=${encodeURIComponent(type)}`);
            const itemsArray = await response.json();
            if (!response.ok) {
              //alert(error)
            }
            return itemsArray;
          }
        }   
    } catch (error) {
        console.error("Error fetching items:", error);
        // Return empty array if there's an error to prevent frontend crashes
        return []
    }
};

export async function handleGetProduct(id) {
    try {
        const response = await fetch(`http://localhost:${PORT}/getProductById?pid=${encodeURIComponent(id)}`);
        if (!response.ok) {
            //alert(error)
        }
        const itemObject = await response.json();
        return itemObject;

    } catch (error) {
        console.error("Error fetching item:", error);
        return null; // Return null if there's an error
    }
}

export async function handleGetItemsAscName(type) {
  try {
      type = type.trim();
      const response = await fetch(`http://localhost:${PORT}/getProductAscendingName?type=${encodeURIComponent(type)}`);
      if (!response.ok) {
          //alert(error)
      }
      const itemsArray = await response.json();

      return itemsArray;
      
  } catch (error) {
      console.error("Error fetching items:", error);
      // Return empty array if there's an error to prevent frontend crashes
      return []
  }
};

export async function handleGetCart(uid) {
    try {
        if (!uid) {
            //alert("No user id entered!"); 
            return null;
        }

        const response = await fetch(`http://localhost:${PORT}/getShoppingCartItems?uid=${encodeURIComponent(uid)}`);
        const cartObjects = await response.json(); // array of cart objects (uid, pid, quantity, total_price)

        if (!Array.isArray(cartObjects)) {
            return //alert("Cart data does not exist or is not an array!"); 
        }

        // convert the array to return as a cart array (name, pid, type, price, stock, quantity, image)
        const cartArray = await Promise.all(
            cartObjects.map(async (item) => {
                const productResponse = await fetch(`http://localhost:${PORT}/getProductById?pid=${encodeURIComponent(item.pid)}`);
                const product = await productResponse.json(); // expects { name, type, price, stock, image }

                return {
                    id: item._id.toString(),
                    name: product.name,
                    pid: product._id.toString(),
                    type: product.type,
                    price: product.price,
                    stock: product.stock,
                    quantity: item.quantity,
                    img: product.img, 
                };
            })
        );

        return cartArray;

    } catch (error) {
        console.error("error:", error);
        //alert(`Error: getting cart array of user \n ${error.message}`);
        return null;
    }
}

export async function handleGetCompleteOrders(uid) {
    try {
        if (!uid) {
            //alert("No user id entered!");
            return null;
        }

        const response = await fetch(`http://localhost:${PORT}/getUserCompletedOrders?uid=${encodeURIComponent(uid)}`);
        const orderObjects = await response.json(); // expects array of order objects

        if (orderObjects.length===0) {
            return []
        } 

        const orderArray = await Promise.all(
            orderObjects.map(async (order) => {
                return {
                    id: order._id.toString(),
                    pid: order.pid, // pang update ng stock if icancel
                    name: order.name,
                    email: order.email,
                    type: order.type,
                    quantity: order.quantity,
                    amount: order.total_price,
                    order_status: "completed",
                    date_confirmed: order.date_confirmed,
                    image: order.img,
                    mot: order.mot,
                    address: order.address,
                    contactno: order.contactno,
                };
            })
        );

        // Filter out nulls in case some requests failed
        return orderArray.filter(item => item !== null);

    } catch (error) {
        console.error("error:", error);
        //alert(`Error: getting completed orders \n ${error.message}`);
        return null;
    }
}

export async function handleGetPendingOrders(uid) {
    try {
        if (!uid) {
            //alert("No user id entered!");
            return null;
        }

        const response = await fetch(`http://localhost:${PORT}/getUserPendingOrders?uid=${encodeURIComponent(uid)}`);
        const orderObjects = await response.json(); // expects array of order objects
        if (orderObjects.length===0) {
            return []
        } 

        const orderArray = await Promise.all(
            orderObjects.map(async (order) => {
                return {
                    id: order._id.toString(),
                    pid: order.pid, // pang update ng stock if icancel
                    name: order.name,
                    email: order.email,
                    type: order.type,
                    quantity: order.quantity,
                    amount: order.total_price,
                    order_status: "pending",
                    date_requested: order.date_requested,
                    image: order.img,
                    mot: order.mot,
                    address: order.address,
                    contactno: order.contactno,
                };
            })
        );

        // Filter out nulls in case some requests failed
        return orderArray.filter(item => item !== null);

    } catch (error) {
        console.error("error:", error);
        //alert(`Error: getting completed orders \n ${error.message}`);
        return null;
    }
}

export async function handleGetCancelledOrders(uid) {
    try {
        if (!uid) {
            //alert("No user id entered!");
            return null;
        }

        const response = await fetch(`http://localhost:${PORT}/getUserCancelledOrders?uid=${encodeURIComponent(uid)}`);
        const orderObjects = await response.json(); // expects array of order objects

        if (orderObjects.length===0) {
            return []
        } 

        const orderArray = await Promise.all(
            orderObjects.map(async (order) => {
                return {
                    id: order._id.toString(),
                    pid: order.pid, // pang update ng stock if icancel
                    name: order.name,
                    email: order.email,
                    type: order.type,
                    quantity: order.quantity,
                    amount: order.total_price,
                    order_status: "cancelled",
                    date_cancelled: order.date_cancelled,
                    image: order.img,
                    mot: order.mot,
                    address: order.address,
                    contactno: order.contactno,
                };
            })
        );

        // Filter out nulls in case some requests failed
        return orderArray.filter(item => item !== null);

    } catch (error) {
        console.error("error:", error);
        //alert(`Error: getting completed orders \n ${error.message}`);
        return null;
    }
}

export async function handleGetAllPendingOrders(uid) {
  try {
    if (!uid) {
      //alert("No user id entered!");
      return null;
    }
    const response = await fetch(`http://localhost:${PORT}/getAllPendingOrders?uid=${encodeURIComponent(uid)}`);
    const data = await response.json();

    if (data.message) {
      // Handle error or info message from backend
      //alert(data.message);
      return [];
    }

    // Map backend orders to frontend order objects
    const orderArray = data.map(order => ({
      id: order._id.toString(),
      pid: order.pid,
      name: order.name,
      email: order.email,
      type: order.type,
      quantity: order.quantity,
      amount: order.total_price,
      order_status: "Pending",
      date_requested: order.date_requested,
      image: order.img,
      mot: order.mot,
      address: order.address,
      contactno: order.contactno,
    }));

    return orderArray;

  } catch (error) {
    console.error("Error fetching all pending orders:", error);
    //alert(`Error fetching all pending orders \n${error.message}`);
    return null;
  }
}

export async function handleGetAllCompletedOrders(uid) {
  try {
    if (!uid) {
      //alert("No user id entered!");
      return null;
    }
    const response = await fetch(`http://localhost:${PORT}/getAllCompletedOrders?uid=${encodeURIComponent(uid)}`);
    const data = await response.json();

    if (data.message) {
      //alert(data.message);
      return [];
    }

    const orderArray = data.map(order => ({
      id: order._id.toString(),
      pid: order.pid,
      name: order.name,
      email: order.email,
      type: order.type,
      quantity: order.quantity,
      amount: order.total_price,
      order_status: "Completed",
      date_confirmed: order.date_confirmed,
      image: order.img,
      mot: order.mot,
      address: order.address,
      contactno: order.contactno,
    }));

    return orderArray;
  } catch (error) {
    console.error("Error fetching completed orders:", error);
    //alert(`Error fetching completed orders \n${error.message}`);
    return null;
  }
}

export async function handleGetAllCancelledOrders(uid) {
  try {
    if (!uid) {
      //alert("No user id entered!");
      return null;
    }
    const response = await fetch(`http://localhost:${PORT}/getAllCancelledOrders?uid=${encodeURIComponent(uid)}`);
    const data = await response.json();

    if (data.message) {
      //alert(data.message);
      return [];
    }

    // Map backend cancelled orders to frontend format
    const orderArray = data.map(order => ({
      id: order._id.toString(),
      pid: order.pid,
      name: order.name,
      email: order.email,
      type: order.type,
      quantity: order.quantity,
      amount: order.total_price,
      order_status: "Cancelled",
      date_cancelled: order.date_cancelled,
      image: order.img,
      mot: order.mot,
      address: order.address,
      contactno: order.contactno,
    }));

    return orderArray;
  } catch (error) {
    console.error("Error fetching all cancelled orders:", error);
    //alert(`Error fetching cancelled orders \n${error.message}`);
    return null;
  }
}