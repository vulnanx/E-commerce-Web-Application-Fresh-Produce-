"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

const PORT = 8080;

const ProductForm = ({ handleAddItem, closeForm }) => {
  // for frontend routing
  const router = useRouter();

  // initializations
  const { userId } = useContext(AuthContext);

  const startingProductData = {
    name: "",
    img: "",
    desc: "",
    type: 0, // 1 for produce, 2 for poultry
    stock: 0,
    price: 0,
  };

  const [formData, setFormData] = useState(startingProductData);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = {
      uid: userId, // Ensure userId is set correctly
      name: formData.name,
      img: formData.img,
      desc: formData.desc,
      type: Number(formData.type), // Ensure type is an integer
      stock: Number(formData.stock),
      price: Number(formData.price),
    };

    try {
      const res = await fetch(`http://localhost:${PORT}/addProductToInventory`, {
        method: "POST",
        body: JSON.stringify(formDataToSend),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log("Response from backend:", data);

      if (data.success) {
        handleAddItem(data.product); // Add the new product to the UI
        alert("Product added successfully!");
        closeForm(); // Close the modal properly
      } else {
        alert(data.message || "Failed to add product.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add product.");
    }
  };

  return (
    <>
      <form method="post" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 justify-between">
          <label>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            required={true}
            value={formData.name}
            className="w-full p-2 border border-gray-300 mb-4 pr-10 rounded-md"
          />
          <label>Image:</label>
          <input
            type="text"
            id="img"
            name="img"
            onChange={handleChange}
            required={true}
            value={formData.img}
            className="w-full p-2 border border-gray-300 mb-4 pr-10 rounded-md"
          />

          <label>Description:</label>
          <textarea
            id="desc"
            name="desc"
            onChange={handleChange}
            required={true}
            value={formData.desc}
            className="w-full p-2 border border-gray-300 mb-4 pr-10 rounded-md"
          />
          <label>Type:</label>
            <select
                id="type"
                name="type"
                onChange={handleChange}
                required={true}
                value={formData.type}
                className="w-full p-2 border border-gray-300 mb-4 pr-10 rounded-md"
            >
            <option value="">Select type</option>  {/* Optional placeholder */}
            <option value="1">Produce</option>
            <option value="2">Poultry</option>
            </select>

          <label>Quantity Available:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            onChange={handleChange}
            required={true}
            value={formData.stock}
            className="w-full p-2 border border-gray-300 mb-4 pr-10 rounded-md"
            min={0}
          />

          <label>Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            onChange={handleChange}
            required={true}
            value={formData.price}
            className="w-full p-2 border border-gray-300 mb-4 pr-10 rounded-md"
            min={0}
            step="0.01"
          />
        </div>
        <div>
          <input
            type="submit"
            value="Add Product"
            className="place-self-end bg-[#357322] text-white rounded-md w-25 p-1 hover:cursor-pointer hover:bg-[#072E07]"
          />
        </div>
      </form>
    </>
  );
};

export default ProductForm;
