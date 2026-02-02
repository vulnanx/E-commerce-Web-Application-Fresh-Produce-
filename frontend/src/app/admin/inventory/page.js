"use client";
import Image from "next/image";
import AdminNavBar from "@/components/AdminNavBar";
import Footer from "@/components/Footer";
import InventoryCard from "@/components/InventoryCard";
import ProductForm from "@/components/ProductForm";
import { useEffect, useState } from "react";
import { ArrowUpDown, Plus, X } from "lucide-react";
import { handleGetItems } from "@/integration/item_cart_order_tile.js"; // input: [type, sort]
const PORT = 8080;

export default function InventoryPage() {
  const [activeCategory, setActiveCategory] = useState("produce");
  const [addItem, setShowAddItem] = useState(false);
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

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:${PORT}/deleteInventoryItem`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      });
      const data = await response.json();
      if (response.ok) {
        setProduceArray(produceArray.filter((item) => item._id !== itemId));
        setPoultryArray(poultryArray.filter((item) => item._id !== itemId));
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("There was an error deleting the item.");
    }
  };

  return (
    <>
      <div className="bg-[#ECEDE4] min-h-screen">
        <AdminNavBar />
        {/* Categories content */}
        <div className="m-6 flex flex-col bg-white shadow border border-gray-300 rounded-md p-6 w-[90vw] place-self-center">
          <div className="flex flex-row justify-between">
            <p className="text-2xl font-semibold text-[#072E07]">INVENTORY</p>
            <span
              className="text-[#072E07] flex flex-row gap-2 rounded-md border p-2 border-gray-400 hover:cursor-pointer hover:bg-gray-50"
              onClick={() => setShowAddItem(true)}
            >
              <Plus /> Add Item
            </span>
          </div>
          <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700"></hr>

          {/* Category Tabs */}
          <div className="flex justify-between">
            <div className="flex items-center">
              <p
                onClick={() => setActiveCategory("produce")}
                className={`h-[6vh] place-self-center relative flex-1 px-4 sm:flex-initial whitespace-nowrap sm:px-6 py-2 text-sm sm:text-base transition-colors duration-200 ${
                  activeCategory === "produce"
                    ? "text-[#005001] font-bold bg-gray-50"
                    : "text-black hover:bg-gray-50 cursor-pointer"
                }`}
              >
                Produce
              </p>
              <div className="h-[4vh] w-[1] bg-black"></div>
              <p
                onClick={() => setActiveCategory("poultry")}
                className={`place-self-center h-[6vh] relative flex-1 sm:flex-initial whitespace-nowrap px-4 sm:px-6 py-2 text-sm sm:text-base transition-colors duration-200 ${
                  activeCategory === "poultry"
                    ? "text-[#005001] font-bold bg-gray-50"
                    : "text-[black] hover:bg-gray-50 cursor-pointer"
                }`}
              >
                Poultry
              </p>
            </div>

            {/* Sort dropdown */}
            <div className="place-self-center px-4">
              <div className="flex flex-row items-center gap-2">
                <ArrowUpDown />
                <p>Sort by:</p>
                <form className="max-w-sm mx-auto">
                  <select
                    id="sort"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    onChange={async (e) => {
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

          {/* Produce List */}
          {activeCategory === "produce" && (
            <>
              <div className="flex justify-end p-2">
                <button
                  className="flex justify-center border border-gray-350 text-gray-400 rounded-md p-1 w-[30px]
                            hover:text-white hover:bg-gray-400 cursor-pointer"
                >
                  1
                </button>
              </div>
              <div className="flex flex-col gap-6 items-center">
                {produceArray.map((item) => (
                  <div key={item._id} className="flex flex-col">
                    <InventoryCard item={item} onDelete={handleDeleteItem} />
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Poultry List */}
          {activeCategory === "poultry" && (
            <>
              <div className="flex justify-end p-2">
                <button
                  className="flex justify-center border border-gray-350 text-gray-400 rounded-md p-1 w-[30px]
                            hover:text-white hover:bg-gray-400 cursor-pointer"
                >
                  1
                </button>
              </div>
              <div className="flex flex-col gap-6 items-center">
                {poultryArray.map((item) => (
                  <div key={item._id} className="flex flex-col">
                    <InventoryCard item={item} onDelete={handleDeleteItem} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <Footer />
      </div>

      {/* Add Item Modal */}
      {addItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="w-[50vw] h-[90vh] bg-white rounded-lg shadow-xl flex flex-col overflow-y-auto">
            <div className="flex flex-col bg-white p-6 justify-center">
              <div className="flex flex-row justify-between">
                <p className="text-2xl font-semibold text-[#072E07]">Add new product</p>
                <X className="hover:cursor-pointer" onClick={() => setShowAddItem(false)} />
              </div>
              <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700"></hr>

              {/* Pass both handleAddItem and closeForm props */}
              <ProductForm
                handleAddItem={(newProduct) => {
                  if (newProduct.type === "1" || newProduct.type === 1) {
                    setProduceArray((prev) => [...prev, newProduct]);
                  } else if (newProduct.type === "2" || newProduct.type === 2) {
                    setPoultryArray((prev) => [...prev, newProduct]);
                  }
                  setShowAddItem(false); // close modal after adding
                }}
                closeForm={() => setShowAddItem(false)} // close function for the modal
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
