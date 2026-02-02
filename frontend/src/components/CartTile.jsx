"use client";
import { User, X, Trash2 } from "lucide-react";
import React, { useEffect, useState , useContext } from 'react';
import { useRouter } from 'next/navigation';
import { updateQuantityInDB , deleteCart } from '@/integration/transactions'
import { AuthContext } from '@/context/AuthContext';

const CartTile = ({ item , onDelete }) => { // id, pid, name, type, price, stock, quantity, date, img 
    // for frontend routing
    const router = useRouter();

    // initializations
    const [quantity, setQuantity] = useState(item.quantity ?? 1);
    const { userId, setUserId, showAuth, setShowAuth } = useContext(AuthContext);

    const increment = () => {
        if (quantity + 1 > item.stock) {
            alert("max number of available product reached!");
            return;
        }
    
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        updateQuantityInDB(item.id, newQuantity, item.price);
    };

    const decrement = () => {
        if (quantity - 1 < 0) {
            alert("quantity can't be zero!");
            return;
        }
    
        const newQuantity = quantity - 1;
        setQuantity(newQuantity);
        updateQuantityInDB(item.id, newQuantity, item.price);
    };

    const handleDelete = async () => {
        await deleteCart(userId, item.pid);
        onDelete(); // refresh the cart after deletion
    };

    return(
        <>
        <div className="flex flex-row justify-between bg-white shadow border border-gray-300 rounded-md p-6 w-[70vw]">
            <div className="flex flex-row gap-6">
                <div>
                    { item.img ? (<img src={item.img} className="rounded-md h-[150px] w-[168px] shadow"></img>) : ( <div className="rounded-md h-[200] w-[100] p-6 bg-gray-200"></div>)}
                </div>
                
                <div>
                    <p className="pt-2 text-lg font-medium">{item.name}</p>
                    <div className="text-xl font-semibold mb-2">Php {(item.price * quantity).toFixed(2)}</div>
                    
                <form className="max-w-xs mx-auto">
                    <label htmlFor="quantity-input" className="block text-sm font-medium text-gray-900 mb-0">Stock: {item.stock} </label>
                    <label htmlFor="quantity-input" className="block text-sm font-medium text-gray-900 mb-5">Price: {item.price} </label>
                    <div className="relative flex items-center max-w-[8rem]">
                        <button type="button" id="decrement-button" onClick={decrement} data-input-counter-decrement="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                            <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                            </svg>
                        </button>

                        <input type="text" id="quantity-input" value={quantity} onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (!isNaN(val) && val > 0 && val <= item.stock) {
                                setQuantity(val);
                            }
                        }} data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                        
                        <button type="button" id="increment-button" onClick={increment} data-input-counter-increment="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                            <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                            </svg>
                        </button>
                    </div>
                </form>

                    
                    {/* <button className="place-self-end bg-[#357322] text-white rounded-md w-25 p-1 hover:cursor-pointer hover:bg-[#072E07]">Remove</button> */}
                </div>
            </div>

            <div className="flex flex-cols justify-between">
                <Trash2 className="text-right text-red-400 hover:cursor-pointer hover:text-red-600"
                    onClick={handleDelete}
                />
            </div>
        </div>
        </>
    )
}

export default CartTile;