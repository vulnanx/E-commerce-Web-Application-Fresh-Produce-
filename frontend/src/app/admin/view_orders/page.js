"use client";
import AdminNavBar from "@/components/AdminNavBar";
import OrderTile from "@/components/OrderTile";
import Footer from "@/components/Footer"
import { useState, useEffect, useContext } from "react";
import { handleGetAllPendingOrders, handleGetAllCancelledOrders, handleGetAllCompletedOrders } from "@/integration/item_cart_order_tile";
import { confirmOrder, cancelOrder } from "@/integration/transactions";
import { AuthContext } from "@/context/AuthContext";

export default function OrdersPage() {
  const { userId } = useContext(AuthContext);
  const adminUid = userId;

  const [activeCategory, setActiveCategory] = useState("Pending");
  const [ordersPending, setOrdersPending] = useState([]);
  const [ordersCancelled, setOrdersCancelled] = useState([]);
  const [ordersComplete, setOrdersComplete] = useState([]);

  // Reusable fetch function for current tab
  const fetchOrdersForActiveCategory = async () => {
    if (!adminUid) return;

    if (activeCategory === "Pending") {
      const pendingOrders = await handleGetAllPendingOrders(adminUid);
      setOrdersPending(pendingOrders || []);
    }

    if (activeCategory === "Cancelled") {
      const cancelledOrders = await handleGetAllCancelledOrders(adminUid);
      setOrdersCancelled(cancelledOrders || []);
    }

    if (activeCategory === "Completed") {
      const completedOrders = await handleGetAllCompletedOrders(adminUid);
      setOrdersComplete(completedOrders || []);
    }
  };

  useEffect(() => {
    fetchOrdersForActiveCategory();
  }, [activeCategory, adminUid]);

  // Confirm order handler
  const handleConfirm = async (orderId) => {
    const res = await confirmOrder(orderId, adminUid);

    if (res.success) {
      alert("Order confirmed successfully");
      fetchOrdersForActiveCategory();
    } else {
      alert(res.message);
    }
  };

  // Cancel order handler
  const handleCancel = async (orderId) => {
    const res = await cancelOrder(orderId);
    
    if (res.success) {
      alert("Order cancelled successfully");
      fetchOrdersForActiveCategory();
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="bg-[#ECEDE4] w-full min-h-[100vh]">
      <AdminNavBar />
      <div className="flex flex-col items-center m-10">
        <div className="w-[80vw] flex flex-col gap-2">
          {/* Tabs */}
          <div className="flex items-center justify-between bg-[#D5A52B] rounded-md">
            {["Pending", "Completed", "Cancelled"].map((category) => (
              <p
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`h-[6vh] w-1/3 text-center relative flex-1 px-4 sm:flex-initial whitespace-nowrap px-4 sm:px-6 py-2 text-sm sm:text-base transition-colors duration-200 ${
                  activeCategory === category
                    ? "text-[#005001] font-bold"
                    : "text-white hover:bg-[#005001] cursor-pointer"
                }`}
              >
                {category}
              </p>
            ))}
          </div>

          <div className="flex items-center justify-between bg-white rounded-md">
            {/* Orders Display Section */}
            <div className="flex flex-col gap-6 m-5 h-[70vh] overflow-y-auto w-full">
              {activeCategory === "Pending" && (
                ordersPending.length === 0 ? (
                  <p className="text-center mt-10">No pending orders to display.</p>
                ) : (
                  ordersPending.map((item, index) => (
                    <div key={index} className="flex flex-col gap-2">
                      <OrderTile item={item} />
                      <div className="flex gap-2 mt-2">
                        <button
                          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                          onClick={() => handleConfirm(item.id)}
                        >
                          Confirm Order
                        </button>
                        <button
                          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                          onClick={() => handleCancel(item.id)}
                        >
                          Cancel Order
                        </button>
                      </div>
                    </div>
                  ))
                )
              )}

              {activeCategory === "Completed" && (
                ordersComplete.length === 0 ? (
                  <p className="text-center mt-10">No completed orders to display.</p>
                ) : (
                  ordersComplete.map((item, index) => (
                    <div key={index} className="flex flex-col gap-2">
                      <OrderTile item={item} />
                    </div>
                  ))
                )
              )}

              {activeCategory === "Cancelled" && (
                ordersCancelled.length === 0 ? (
                  <p className="text-center mt-10">No cancelled orders to display.</p>
                ) : (
                  ordersCancelled.map((item, index) => (
                    <div key={index} className="flex flex-col gap-2">
                      <OrderTile item={item} />
                    </div>
                  ))
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
