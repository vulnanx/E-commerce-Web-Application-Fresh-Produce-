"use client";
import { Trash2, Pencil } from "lucide-react";
import React, { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

const InventoryCard = ({ item, onDelete }) => {
    // Handle the delete action when the trash icon is clicked
    const handleDeleteClick = () => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            onDelete(item._id); // Call the onDelete function passed as a prop with the item id
        }
    };

    return (
        <div className="flex flex-col bg-white shadow border border-gray-300 rounded-md p-6 w-[80vw] hover:bg-gray-50">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-6">
                    <div>
                        {item.img ? (
                            <img src={item.img} className="rounded-md h-[110] w-[128px] shadow" />
                        ) : (
                            <div className="rounded-md h-[200] w-[100] p-6 bg-gray-200"></div>
                        )}
                    </div>

                    <div>
                        <p className="pt-2 text-xl font-bold">Item ID: {item._id}</p>
                        <p className="pt-2 font-medium">{item.name}</p>
                        <span className="flex flex-row gap-2">Price: Php {item.price}</span>
                        <p>Stock: {item.stock}</p>
                    </div>
                </div>

                <div className="flex flex-row gap-2">
                    <Trash2 className="hover:cursor-pointer" onClick={handleDeleteClick} />
                    <Pencil className="hover:cursor-pointer" />
                </div>
            </div>
        </div>
    );
};

export default InventoryCard;
