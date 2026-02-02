"use client";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import ItemCard from "@/components/ItemCard";
import Footer from "@/components/Footer"
import { useEffect, useState } from "react";
import { handleGetItems } from "../integration/item_cart_order_tile.js";
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState(1); // 1 for produce
  const [produceArray, setProduceArray] = useState([]);
  const [poultryArray, setPoultryArray] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      const produce = await handleGetItems("1", "1", "1");
      const poultry = await handleGetItems("2", "1", "1");
      setProduceArray(produce);
      setPoultryArray(poultry);
    }
    fetchItems();
  }, []);

  const handleItemClick = (item) => {
    console.log("Clicked item:", item);
    alert(`Clicked item: ${item.name} `)
    // router.push(`/items/${item.id}`)
  };

  return (
    <div className="bg-[#ECEDE4]">
      <NavBar/>
      {/* Tabs */}
      <div className="bg-linear-to-l from-[#97cb28] to-[#efc354] w-full h-[6vh]">
        <div className="flex justify-between">
          <div className="flex items-center">
            <p
              onClick={() => setActiveCategory(1)}
              className={`h-[6vh] place-self-center relative flex-1 px-4 sm:flex-initial whitespace-nowrap px-4 sm:px-6 py-2 text-sm sm:text-base transition-colors duration-200 ${
                activeCategory === 1
                ? "text-[#005001] font-bold"
                : "text-black hover:bg-[#D5A52B] cursor-pointer"
              }`}
            >Produce</p>
            <div className="h-[4vh] w-[1] bg-black"></div>
            <p
              onClick={() => setActiveCategory(2)}
              className={`place-self-center h-[6vh] relative flex-1 sm:flex-initial whitespace-nowrap px-4 sm:px-6 py-2 text-sm sm:text-base transition-colors duration-200 ${
                activeCategory === 2
                ? "text-[#005001] font-bold"
                : "text-[black] hover:bg-[#D5A52B] cursor-pointer"
              }`}
            >Poultry</p>
          </div>

          <div className="place-self-center px-4">
            <div className="flex flex-row items-center gap-2">
              <p>Sort by:</p> 
              <form className="max-w-sm mx-auto">
                  <select 
                    id="sort" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                          
                      }}>
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
        { activeCategory === 1 && (
          <>
            <div className="bg-[#ECEDE4] w-screen min-h-screen p-10">
              <div className="relative">
                <img src="https://miro.medium.com/v2/resize:fit:1400/1*X1mMOf_pijwb-bwbfxcBEw.png" 
                className="rounded-md h-[20vh] w-[95vw] place-self-center object-cover brightness-60"></img>
                <div className="flex justify-between w-full absolute top-[4vh] left-[2.5vw] p-6">
                  <h2 className="text-3xl font-thin text-white">
                    Home
                  </h2>
                </div>
                <div>
                  <img className="rounded-ful w-[100px] h-[100px] absolute right-[4vw] top-[4vh]"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Department_of_Agriculture_of_the_Philippines.svg/1200px-Department_of_Agriculture_of_the_Philippines.svg.png"></img>
                </div>
              </div>
              <div className="flex justify-end p-6">
                <button className="flex justify-center border border-gray-350 text-gray-400 rounded-md p-1 w-[30px]
                hover:text-white hover:bg-gray-400 cursor-pointer">1</button>
              </div>
              <div className="flex gap-6 m-5 flex-wrap">
                {produceArray.map((item) => (
                  <div key={item.name} className="flex flex-col">
                    <ItemCard item={item}/>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        { activeCategory === 2 && (
          <>
            <div className="bg-[#ECEDE4] w-screen min-h-screen p-10">
              <div className="relative">
                <img src="https://miro.medium.com/v2/resize:fit:1400/1*X1mMOf_pijwb-bwbfxcBEw.png" 
                className="rounded-md h-[20vh] w-[95vw] place-self-center object-cover brightness-60"></img>
                <div className="flex justify-between w-full absolute top-[4vh] left-[2.5vw] p-6">
                  <h2 className="text-3xl font-thin text-white">
                    Home
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
              <div className="flex gap-6 m-5 flex-wrap">
                {poultryArray.map((item) => (
                  <div key={item.name} className="flex flex-col">
                    <ItemCard item={item}/>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        <Footer/>
      </div>
    </div>
  );
}