"use client";
import { User, X } from "lucide-react";
import React, { useEffect, useState , useContext } from 'react';
import { useRouter } from 'next/navigation';
import { handleAddToCart } from '@/integration/transactions'
import { AuthContext } from '@/context/AuthContext';

const ItemCard = ({item}) => { // 'item' is the product model defined in mongoose
    // for frontend routing
    const router = useRouter();

    // initializations
    const { userId, setUserId, showAuth, setShowAuth } = useContext(AuthContext);

    const addToCart = async ( pid ) => {
        // no logged in user
        if (!userId) { 
            // show sign up/in
            setShowAuth(true)
        } else if (item.stock > 0) {
            const isAdded = await handleAddToCart(userId, pid)
            if (!isAdded.success) {
                alert(`failed to add to cart \n${isAdded.message}`)
                return
            } else {
                alert("item added to cart!")
            }
            
        }
    };

    return(
        <>
       <div
            className="flex flex-col bg-white shadow border border-gray-300 rounded-md p-6 w-[250px] hover:cursor-pointer hover:scale-115"
            onClick={() => {
                router.push(`/client/item?id=${item._id.toString()}`);
            }}
        >
            { item.img ? (<img src={item.img} className="rounded-md h-[220px] w-[238px] shadow"></img>) : ( <div className="rounded-md h-[200] w-[100] p-6 bg-gray-200"></div>)}
            <p className="pt-2 text-lg font-medium">{item.name}</p>
            <p className="italic text-gray-500">{item.type == 1 ? 'Produce' : 'Poultry'}</p>
            <p className="italic text-gray-500">Stock: {item.stock}</p>
            <div className="place-self-end text-xl font-semibold">Php {item.price}</div>
            <button className="place-self-end bg-[#357322] text-white rounded-md w-25 p-1 hover:cursor-pointer hover:bg-[#072E07]" 
                onClick={(e) => {
                    e.stopPropagation(); // dont show item page since the button is inside the div item card
                    addToCart(item._id.toString());
                }}>
                Add to cart
            </button>
        </div>
        </>
    )
}

export default ItemCard;