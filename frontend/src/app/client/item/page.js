"use client";
import NavBar from "@/components/NavBar";
import OrderTile from "@/components/OrderTile";
import React, { useEffect, useState , useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { handleGetProduct } from "@/integration/item_cart_order_tile";
import { handleAddToCart } from "@/integration/transactions";
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Footer from "@/components/Footer"
import { useSearchParams } from 'next/navigation';

export default function OrdersPage() { 
    // for frontend routing
    const router = useRouter();
    const searchParams = useSearchParams();
    const itemId = searchParams.get('id');

    const [item, setItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { userId, setUserId, showAuth, setShowAuth } = useContext(AuthContext);

    useEffect(() => {
        const fetchItem = async () => {
            if (itemId) {
                const product = await handleGetProduct(itemId);
                setItem(product);
                setIsLoading(false);
            }
        };
        fetchItem();
    }, [itemId]);

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

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-[60vh]">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-[#357322]"></div>
            </div>
        );
    }

    if (!item) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p>Product not found.</p>
            </div>
        );
    }

    return(
        <>
        <div className="bg-[#ECEDE4] w-full min-h-[100vh]">
            <NavBar/>
            <div className="flex flex-row gap-2 p-5" >
                <div className="flex flex-row gap-2 hover:cursor-pointer hover:text-[#235423]" onClick={() => router.push('/client/shop')}>
                <ArrowLeft/>
                Shop
                </div>
                <p>|</p>
                <p className="font-semibold text-[#cb4e00]">{item.name}</p>
            </div>
                <div className="w-[80vw] flex flex-row gap-4 bg-white shadow border border-gray-300 rounded-md p-6 mb-10 place-self-center">
                    <div className="flex flex-col w-[50vw] p-4 bg-white shadow border border-gray-300 rounded-md items-center gap-3  hover:scale-125">
                     { item.img ? (<img src={item.img} className="rounded-md h-[25vw] w-[40vw] shadow"></img>) : ( <div className="rounded-md h-[200] w-[100] p-6 bg-gray-200"></div>)}
                     <p className="font-bold text-2xl">{item.name}</p>
                    </div>
                    <div className="w-2/3">
                    <p className="italic text-gray-500">{item.type == 1 ? 'Produce' : 'Poultry'}</p>
                    <p>{item.desc}</p>
                    <div className="flex flex-row gap-2">
                        <p className="font-semibold">Currently in stock:</p>
                        <p>{item.stock} remaining</p>
                    </div>
                    
                    </div>
                    <div className="place-self-end text-xl font-semibold w-auto">Php {item.price}.00
                        <button className=" w-auto place-self-end bg-[#357322] text-white rounded-md font-normal p-2 hover:cursor-pointer hover:bg-[#072E07]" 
                            onClick={() => {
                                addToCart(itemId);
                            }}>
                        Add to cart
                    </button>
                    </div>
                </div>
                <Footer/>
        </div>
        </>
    );
}