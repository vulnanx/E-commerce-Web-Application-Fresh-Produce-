"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const productData = {
  Carrots: {
    name: "Carrots",
    type: "produce",
    price: 500,
    stock: 45,
    description: "Fresh, organic carrots full of nutrients.",
    image:
      "https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  Apples: {
    name: "Apples",
    type: "produce",
    price: 400,
    stock: 25,
    description: "Crisp and sweet apples freshly picked.",
    image:
      "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  Eggs: {
    name: "Eggs",
    type: "poultry",
    price: 300,
    stock: 45,
    description: "Farm fresh eggs, rich in protein.",
    image:
      "https://images.pexels.com/photos/600615/pexels-photo-600615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  "Whole Chicken": {
    name: "Whole Chicken",
    type: "poultry",
    price: 800,
    stock: 25,
    description: "Whole chicken, perfect for roasting.",
    image:
      "https://images.pexels.com/photos/10886018/pexels-photo-10886018.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
};

export default function ProductPage({ params }) {
  const { name } = params;
  const router = useRouter();
  const product = productData[name];

  const [form, setForm] = useState({
    name: "",
    price: "",
    type: "",
    description: "",
    stock: "",
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        price: product.price,
        type: product.type,
        description: product.description || "",
        stock: product.stock,
      });
    }
  }, [product]);

  if (!product) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <button
          className="mt-4 px-4 py-2 bg-[#357322] text-white rounded"
          onClick={() => router.back()}
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    // For demo: Just alert updated info
    alert(`Updated product details:\n${JSON.stringify(form, null, 2)}`);
    // In real app: send update request to backend here
  };

  return (
    <div className="flex p-10 gap-10 bg-[#ECEDE4] min-h-screen">
      {/* Left: Image */}
      <div className="w-1/2">
        <img
          src={product.image}
          alt={product.name}
          className="rounded-md object-cover w-full h-[400px]"
        />
      </div>

      {/* Right: Editable details */}
      <div className="w-1/2 flex flex-col gap-4">
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Price (Php)</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Type</label>
          <input
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Stock Quantity</label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          onClick={handleUpdate}
          className="mt-auto bg-[#357322] text-white px-6 py-3 rounded hover:bg-[#072E07]"
        >
          UPDATE
        </button>
      </div>
    </div>
  );
}
    