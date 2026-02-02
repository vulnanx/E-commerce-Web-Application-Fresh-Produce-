"use client";
import NavBar from "@/components/NavBar";
import OrderTile from "@/components/OrderTile";
import Footer from "@/components/Footer"
import React, { useEffect, useState , useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { handleGetCompleteOrders, handleGetPendingOrders , handleGetCancelledOrders } from "@/integration/item_cart_order_tile";
import { useRouter } from 'next/navigation';
import { PackageCheck, PackageX, Truck } from 'lucide-react';

export default function OrdersPage() {
    // for frontend routing
    const router = useRouter();
    // initializations
    const [isLoading, setIsLoading] = useState(true);
    const { userId, setUserId, showAuth, setShowAuth } = useContext(AuthContext);
    const [activeCategory, setActiveCategory] = useState("Pending")
    const [ordersComplete, setOrdersComplete] = useState([]);
    const [ordersPending, setOrdersPending] = useState([]);
    const [ordersCancelled, setOrdersCancelled] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);
    
    // async function that gets the array of orders to display
    const fetchItems = async () => {
        setIsLoading(true);
        const completeArray = await handleGetCompleteOrders(userId); 
        const pendingArray = await handleGetPendingOrders(userId); 
        const cancelledArray = await handleGetCancelledOrders(userId); 
        setOrdersComplete(completeArray);
        setOrdersPending(pendingArray);
        setOrdersCancelled(cancelledArray);
        setIsLoading(false);
    }

    return(
        <>
        <div className="bg-[#ECEDE4] w-full min-h-[100vh]">
        <NavBar/>
        <div className="flex flex-col items-center m-10">
            <div className="w-[80vw] flex flex-col gap-2">
                <div className="flex items-center justify-between bg-[#D5A52B] rounded-md">
                        <p
                        onClick={() => setActiveCategory("Pending")}
                        className={`h-[6vh] w-1/3 text-center relative flex-1 px-4 sm:flex-initial whitespace-nowrap px-4 sm:px-6 py-2 text-sm sm:text-base transition-colors duration-200 ${
                            activeCategory === "Pending"
                            ? "text-[#005001] font-bold"
                            : "text-white hover:bg-[#005001] cursor-pointer"
                        }`}
                        >   <div className="flex flex-row gap-2 justify-center">
                            <Truck/>
                            Pending
                            </div>
                            </p>
                        <p
                        onClick={() => setActiveCategory("Completed")}
                        className={`text-center h-[6vh] w-1/3 relative flex-1 sm:flex-initial whitespace-nowrap px-4 sm:px-6 py-2 text-sm sm:text-base transition-colors duration-200 ${
                            activeCategory === "Completed"
                            ? "text-[#005001] font-bold"
                            : "text-[white] hover:bg-[#005001] cursor-pointer"
                        }`}
                        > <div className="flex flex-row gap-2 justify-center">
                            <PackageCheck/>
                            Completed
                            </div>
                            </p>
                        <p
                        onClick={() => setActiveCategory("Cancelled")}
                        className={`text-center h-[6vh] w-1/3 relative flex-1 sm:flex-initial whitespace-nowrap px-4 sm:px-6 py-2 text-sm sm:text-base transition-colors duration-200 ${
                            activeCategory === "Cancelled"
                            ? "text-[#005001] font-bold"
                            : "text-[white] hover:bg-[#005001] cursor-pointer"
                        }`}
                        ><div className="flex flex-row gap-2 justify-center">
                            <PackageX/>
                            Cancelled
                            </div>
                            </p>
                    </div>
                
                { isLoading ? (
                        <div className="flex flex-col items-center justify-center w-full h-[60vh]">
                            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-[#357322]"></div>
                        </div>
                    ) : (
                    <div className="flex items-center justify-between bg-white rounded-md">
                        {/* Categories content */}
                        
                        {activeCategory === "Pending" && (
                            ordersPending.length > 0 ? (
                                <div className="flex flex-col gap-6 m-5 h-[70vh] overflow-y-auto">
                                    {ordersPending.map((item, index) => (
                                        <div key={item.id} className="flex flex-col">
                                            <OrderTile item={item} onDelete={fetchItems}/>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center w-full h-[60vh] text-gray-500">
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
                                        alt="No pending orders"
                                        className="w-64 h-64 object-contain mb-4"
                                    />
                                    <p className="text-lg">No pending orders.</p>
                                </div>
                            )
                        )}

                        {activeCategory === "Completed" && (
                            ordersComplete.length > 0 ? (
                                <div className="flex flex-col gap-6 m-5 h-[70vh] overflow-y-auto">
                                    {ordersComplete.map((item, index) => (
                                        <div key={item.id} className="flex flex-col">
                                            <OrderTile item={item} onDelete={fetchItems}/>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center w-full h-[60vh] text-gray-500">
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
                                        alt="No completed orders"
                                        className="w-64 h-64 object-contain mb-4"
                                    />
                                    <p className="text-lg">No completed orders.</p>
                                </div>
                            )
                        )}

                        {activeCategory === "Cancelled" && (
                            ordersCancelled.length > 0 ? (
                                <div className="flex flex-col gap-6 m-5 h-[70vh] overflow-y-auto">
                                    {ordersCancelled.map((item, index) => (
                                        <div key={item.id} className="flex flex-col">
                                            <OrderTile item={item} onDelete={fetchItems}/>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center w-full h-[60vh] text-gray-500">
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
                                        alt="No cancelled orders"
                                        className="w-64 h-64 object-contain mb-4"
                                    />
                                    <p className="text-lg">No cancelled orders.</p>
                                </div>
                            )
                        )}
                    </div>
                    )
                }
            </div>
        </div>
        <Footer/>
        </div>
        </>
    );
}