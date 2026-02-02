"use client";
import NavBar from "@/components/NavBar";
import CartTile from "@/components/CartTile";
import React, { useEffect, useState , useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { handleGetCart } from "@/integration/item_cart_order_tile";
import { orderCheckOut } from "@/integration/transactions";
import Footer from "@/components/Footer"
import { useRouter } from 'next/navigation';

export default function CartPage() {
    // for frontend routing
    const router = useRouter();
    // initializations
    const [isLoading, setIsLoading] = useState(true);
    const [cartArray, setcartArray] = useState([]);
    const {userId, setUserId, showAuth, setShowAuth } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    useEffect(() => {
        fetchItems();
    }, []);
    
    // async function that gets the array of carts to display
    const fetchItems = async () => {
        setIsLoading(true);
        const array = await handleGetCart(userId); 
        setcartArray(array);
        setIsLoading(false);
    };

    return(
        <div className="bg-[#ECEDE4] w-full min-h-[100vh]">
        <NavBar/>
        <div className="flex flex-row gap-6">
            <div className="flex flex-col gap-6 m-5">
                    {cartArray.map((item, index) => ( // id , pid, name, type, price, quantity, img 
                    
                    <div key={`${item.name}-${index}`} className="flex flex-col">
                        <CartTile item={item} onDelete={fetchItems}/>
                    </div>
                    
                    ))}
                        
            </div>

            { isLoading ? (
                <div className="flex flex-col items-center justify-center w-full h-[60vh]">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-[#357322]"></div>
                </div>
            ) : (
                cartArray.length > 0 ? (
                    <div className="flex flex-col bg-white shadow border border-gray-300 rounded-md p-6 h-[75vh] w-[20vw] m-5">
                            <div>
                                Email: 
                                <input
                                type="text"
                                className="w-full p-2 border border-gray-300 mb-4 pr-10 rounded-md" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                />

                            </div>
                            <div>
                                Contact Number: 
                                <input
                                type="text"
                                className="w-full p-2 border border-gray-300 mb-4 pr-10 rounded-md" 
                                value={contactNumber}
                                onChange={(e) => setContactNumber(e.target.value)}
                                />
                            </div>
                            <div>
                                Delivery Address:
                                <input
                                type="text" placeholder="Street/Brgy"
                                className="w-full p-2 border border-gray-300 mb-4 pr-10 rounded-md" 
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                />
                                <div className="flex flex-row justify-between">
                                <input
                                type="text" placeholder="City"
                                className="w-30 p-2 border border-gray-300 mb-4 pr-10 rounded-md" 
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                />
                                <input
                                type="text" placeholder="Province"
                                className="w-30 p-2 border border-gray-300 mb-4 pr-10 rounded-md" 
                                value={province}
                                onChange={(e) => setProvince(e.target.value)}
                                />
                                </div>
                            </div>
                            <div>
                                Mode of Payment: 
                                <select 
                                id="payment" 
                                className="p-2 border border-gray-300 mb-4 pr-10 rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                >   
                                    <option>Choose a payment method</option>
                                    <option value="Cash">Cash</option>
                                    <option value="GCash">GCash</option>
                                    <option value="Bank Transfer">Bank Transfer</option>
                                    <option value="Credit/Debit Card">Credit/Debit Card</option>
                                </select>
                            </div>
                            <div>
                                <button 
                                    className="place-self-end bg-[#357322] text-white rounded-md w-25 p-1 hover:cursor-pointer hover:bg-[#072E07]"
                                    onClick={async () => {

                                        if (!street || !city || !province || !email || !contactNumber || !paymentMethod) {
                                            alert("Incomplete fields");
                                            return;
                                        }

                                        const address = `${street}, ${city}, ${province}`;

                                        const result = await orderCheckOut(userId, cartArray, email, address, paymentMethod, contactNumber)
                                        
                                        if (result.success) {
                                            alert("Checkout successful!");
                                            fetchItems();
                                        } else {
                                            alert(`Checkout failed: ${result.message}`);
                                        }
                                    }}
                                >Checkout</button>
                            </div>
                        </div>
                ) : (
                    <div className="flex flex-col items-center justify-center w-full h-[60vh] text-gray-500">
                        <img
                        src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
                        alt="Empty cart"
                        className="w-64 h-64 object-contain mb-4"
                        />
                        <p className="text-lg">Your cart is empty.</p>
                    </div>
                )
            )}
        
        </div>
        <Footer/>
    </div>
    );
}

