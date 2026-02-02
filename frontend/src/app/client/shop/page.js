"use client";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import ItemCard from "@/components/ItemCard";
import ProfileBar from "@/components/ProfileBar";
import Footer from "@/components/Footer"
import React, { useEffect, useState , useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { handleGetItems } from "@/integration/item_cart_order_tile.js"; // input: [type, sort] type: 1 for produce, 2 for poultry || sortBy: 1 for name, 2 for price, 3 for quantity || order: 1 for ascending, 2 for descending
import { useRouter } from 'next/navigation';
import { ArrowUp, ArrowUpDown } from "lucide-react";
import { handleGetUser } from "@/integration/authentication"; // input: userId

export default function ShopPage() {
    // for frontend routing
    const router = useRouter();
    // initializations
    const [activeCategory, setActiveCategory] = useState("produce")
    const [produceArray, setProduceArray] = useState([]);
    const [poultryArray, setPoultryArray] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { userId, setUserId, showAuth, setShowAuth } = useContext(AuthContext);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            if (userId) {
                const fetchedUser = await handleGetUser(userId);
                setUser(fetchedUser);
            }
        };
        fetchUser();
        fetchItems();
    }, [userId]);

    async function fetchItems() {
        setIsLoading(true);
        const produce = await handleGetItems("1", "1", "1");
        const poultry = await handleGetItems("2", "1", "1");
        setProduceArray(produce);
        setPoultryArray(poultry);
        setIsLoading(false);
    }


    return (
        <>
        <div>
            <NavBar/>
            {/* Tabs */}
            <div className="bg-linear-to-l from-[#97cb28] to-[#efc354] w-full h-[6vh]">
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <p
                        onClick={() => setActiveCategory("produce")}
                        className={`h-[6vh] place-self-center relative flex-1 px-4 sm:flex-initial whitespace-nowrap px-4 sm:px-6 py-2 text-sm sm:text-base transition-colors duration-200 ${
                            activeCategory === "produce"
                            ? "text-[#005001] font-bold"
                            : "text-black hover:bg-[#D5A52B] cursor-pointer"
                        }`}
                        >Produce</p>
                        <div className="h-[4vh] w-[1] bg-black"></div>
                        <p
                        onClick={() => setActiveCategory("poultry")}
                        className={`place-self-center h-[6vh] relative flex-1 sm:flex-initial whitespace-nowrap px-4 sm:px-6 py-2 text-sm sm:text-base transition-colors duration-200 ${
                            activeCategory === "poultry"
                            ? "text-[#005001] font-bold"
                            : "text-[black] hover:bg-[#D5A52B] cursor-pointer"
                        }`}
                        >Poultry</p>
                    </div>

                    <div className="place-self-center px-4">
                        <div className="flex flex-row items-center gap-2">
                        <ArrowUpDown/><p>Sort by:</p> 
                        <form className="max-w-sm mx-auto">
                            <select 
                                id="sort" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                onChange={ async (e) => {
                                    const value = e.target.value;
                                    let sortBy = "1"; // default: name
                                    let order = "1"; // default: ascending
                                
                                    if (value === "name-asc") [sortBy, order] = ["1", "1"];
                                    else if (value === "name-desc") [sortBy, order] = ["1", "2"];
                                    else if (value === "price-asc") [sortBy, order] = ["2", "1"];
                                    else if (value === "price-desc") [sortBy, order] = ["2", "2"];
                                    else if (value === "quantity-asc") [sortBy, order] = ["3", "1"];
                                    else if (value === "quantity-desc") [sortBy, order] = ["3", "2"];
                                
                                    const produce = await handleGetItems("1", sortBy, order);
                                    const poultry = await handleGetItems("2", sortBy, order);
                                    setProduceArray(produce);
                                    setPoultryArray(poultry);
                                  }}
                                >
                                {/* <option selected>Name (Ascending)</option> */}
                                <option value="name-asc">Name (A-Z)</option>
                                <option value="name-desc">Name (Z-A)</option>
                                <option value="price-asc">Price (Low - High)</option>
                                <option value="price-desc">Price (High - Low)</option>         
                                <option value="quantity-asc">Quantity (Low - High)</option>
                                <option value="quantity-desc">Quantity (High - Low)</option>                               
                            </select>
                            </form>
                        </div>
                    </div>
                </div>
                
                {/* Categories content */}
                { isLoading ? (
                        <div className="flex flex-col items-center justify-center w-full h-[60vh]">
                            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-[#357322]"></div>
                        </div>
                    ) : (
                    <>           
                    { activeCategory === "produce" && (
                        <>
                        <div className="bg-[#ECEDE4] w-screen min-h-screen p-10">
                            <div className="relative">
                                <img src="https://miro.medium.com/v2/resize:fit:1400/1*X1mMOf_pijwb-bwbfxcBEw.png" 
                                className="rounded-md h-[20vh] w-[95vw] place-self-center object-cover brightness-60"></img>
                                <div className="flex justify-between w-full absolute top-[4vh] left-[2.5vw] p-6">
                                    <h2 className="text-3xl font-thin text-white">
                                        Produce
                                    </h2>
                                    
                                </div>
                                <div >
                                    <img className="rounded-ful w-[100px] h-[100px] absolute right-[4vw] top-[4vh]"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Department_of_Agriculture_of_the_Philippines.svg/1200px-Department_of_Agriculture_of_the_Philippines.svg.png"></img>
                                </div>
                            </div>
                            <div className="flex justify-end p-6">
                                <button className="flex justify-center border border-gray-350 text-gray-400 rounded-md p-1 w-[30px]
                                hover:text-white hover:bg-gray-400 cursor-pointer">1</button>
                            </div>

                            <div className="flex flex-row gap-5">
                                {user && <ProfileBar user={user} />}
                                <div className="flex w-[80vw] gap-6 flex-wrap">
                                    {produceArray.map((item, index) => (
                                    
                                    <div key={index} className="flex flex-col">
                                        <ItemCard item={item}/>
                                    </div>
                                    
                                    ))}
                                
                                </div>
                            </div>


                        </div>
                        </>
                    )}

                    { activeCategory === "poultry" && (
                        <>
                        <div className="bg-[#ECEDE4] w-screen min-h-screen p-10">
                            <div className="relative">
                                <img src="https://miro.medium.com/v2/resize:fit:1400/1*X1mMOf_pijwb-bwbfxcBEw.png" 
                                className="rounded-md h-[20vh] w-[95vw] place-self-center object-cover brightness-60"></img>
                                <div className="flex justify-between w-full absolute top-[4vh] left-[2.5vw] p-6">
                                    <h2 className="text-3xl font-thin text-white">
                                        Produce
                                    </h2>
                                    
                                </div>
                                <div >
                                    <img className="rounded-ful w-[100px] h-[100px] absolute right-[4vw] top-[4vh]"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Department_of_Agriculture_of_the_Philippines.svg/1200px-Department_of_Agriculture_of_the_Philippines.svg.png"></img>
                                </div>
                            </div>
                            <div className="flex justify-end p-6">
                                <button className="flex justify-center border border-gray-350 text-gray-400 rounded-md p-1 w-[30px]
                                hover:text-white hover:bg-gray-400 cursor-pointer">1</button>
                            </div>
                            <div className="flex flex-row gap-5">
                                <ProfileBar user={user}/>
                                <div className="flex w-[80vw] gap-6 flex-wrap">
                                    {poultryArray.map((item, index) => (
                                    
                                    <div key={index} className="flex flex-col">
                                        <ItemCard item={item}/>
                                    </div>
                                    
                                    ))}
                                
                                </div>
                            </div>
                        </div>
                        </>
                    )}
                    </>
                )}
                <Footer/>
            </div>
            
        </div>
        
        </>
  );
}
