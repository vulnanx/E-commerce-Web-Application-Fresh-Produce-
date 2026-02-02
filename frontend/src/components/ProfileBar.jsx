"use client";
import { User, Trash2, Pencil } from "lucide-react";
import React, { useEffect, useState , useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';
import { cancelOrder} from '@/integration/transactions'
import { handleGetShoppingCartItems } from "@/integration/item_cart_order_tile";

const ProfileBar = ({user, onDelete}) => { // item: id, pid , quantity, name, type, amount, stock, order_status, date_requested, date_confirmed, date_cancelled, image
    // for frontend routing
    const router = useRouter();

    // initializations
    const { userId, setUserId, showAuth, setShowAuth } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const fetchCartData = async () => {
          const items = await handleGetShoppingCartItems(userId);
          setCartItems(items);
    
          const quantitySum = items.reduce((sum, item) => sum + item.quantity, 0);
          const amountSum = items.reduce((sum, item) => sum + item.total_price, 0);
    
          setTotalQuantity(quantitySum);
          setTotalAmount(amountSum);
        };
    
        if (userId) {
          fetchCartData();
        }
      }, [userId, totalAmount, totalQuantity]);

    return(
        <>
             <div className="flex flex-col bg-white shadow border border-gray-300 rounded-md p-6 h-[75vh] w-[20vw]  gap-5 justify-between">
                <div className="flex flex-col gap-2 items-center">
                    <User className="bg-gray-300 rounded-[100] p-2 h-45 w-45 hover:cursor-pointer"/>
                    <p className="text-lg font-semibold flex flex-row gap-1">{user.fname} {user.mname} {user.lname}</p>
                    <p>{user.email}</p>
                    <p>{user.home_address}</p>
                </div>

                {/* <button className="bg-[#357322] text-white rounded-md w-auto px-2 py-1 hover:cursor-pointer hover:bg-[#072E07]">Select image</button> */}
                
                {/* <div className="text-[#5c5c5c] hover:text-[#459a3f] hover:cursor-pointer">
                    My Cart
                    
                </div>
                <div className="h-[1px] bg-[#5c5c5c] w-1/2"></div>
                <div className="text-[#5c5c5c] hover:text-[#459a3f] hover:cursor-pointer">
                    My Orders
                </div> */}
                <div className="">
                <p className="text-xl">Items in cart: {totalQuantity} item(s)</p>
                <p className="text-xl">Total amount: Php {totalAmount.toFixed(2)}</p>
                </div>
            </div>
        </>
    )
}

export default ProfileBar;