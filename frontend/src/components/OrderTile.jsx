"use client";
import { User, X } from "lucide-react";
import React, { useEffect, useState , useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';
import { cancelOrder} from '@/integration/transactions'

const OrderTile = ({item, onDelete}) => { // item: id, pid , quantity, name, type, amount, stock, order_status, date_requested, date_confirmed, date_cancelled, image

    // for frontend routing
    const router = useRouter();

    // initializations
    const { userId, setUserId, showAuth, setShowAuth } = useContext(AuthContext);
    const handleCancel = async () => {
        await cancelOrder(item.id);
        onDelete(); // refresh the orders page after deletion
    };
    return(
        <>
        <div className="flex flex-col bg-white shadow border border-gray-300 rounded-md p-6 w-[75vw]">
            <div className="flex flex-row gap-6">
                <div>
                    { item.image ? (<img src={item.image} className="rounded-md h-[220px] w-[238px] shadow"></img>) : ( <div className="rounded-md h-[200] w-[100] p-6 bg-gray-200"></div>)}
                </div>

                <div>
                    <p className="pt-2 text-xl font-bold">Transaction Number: {item.id}</p>
                    <p className="pt-2 text-xl font-medium">{item.name}</p>
                    {/* <p className="italic text-gray-500">{item.type}</p> */}
                    <span className="flex flex-row text-lg gap-2">Amount Paid: <div className="text-lg font-semibold">Php {(item.amount * item.quantity).toFixed(2)}</div></span>
                    { item.order_status === "completed" && (
                       <>   
                            Quantity: {item.quantity} <br />
                            Date Received: {
                                (() => {
                                    const rawDate = item.date_confirmed;
                                    if (!rawDate) return "Unknown date";
                                    const date = new Date(rawDate);
                                    return isNaN(date.getTime())
                                        ? "Invalid date"
                                        : date.toLocaleDateString("en-PH", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        });
                                })()
                            } 
                        </>
                        
                    )}
                    { item.order_status === "pending" && (
                        <>
                            Quantity: {item.quantity} <br />
                            Date Requested: {
                            (() => {
                            const rawDate = item.date_requested;
                            if (!rawDate) return "Unknown date";
                            const date = new Date(rawDate);
                            return isNaN(date.getTime())
                                ? "Invalid date"
                                : date.toLocaleDateString("en-PH", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                });
                            })()
                        }
                        </>
                    )}
                    { item.order_status === "cancelled" && (
                        <>
                            Quantity: {item.quantity} <br />
                            Date Cancelled: {
                            (() => {
                            const rawDate = item.date_cancelled;
                            if (!rawDate) return "Unknown date";
                            const date = new Date(rawDate);
                            return isNaN(date.getTime())
                                ? "Invalid date"
                                : date.toLocaleDateString("en-PH", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                });
                            })()
                        }
                        </>
                    )}
                    <p className="italic text-white bg-[#D5A52B] rounded-lg text-center my-3">{item.order_status}</p>
                </div>
            </div>
            { item.order_status === "pending" && (
                <>
                <p className="bg-red-500 rounded-md text-white p-2 place-self-end hover:cursor-pointer"
                    onClick={handleCancel}
                >Cancel Order</p>
                </>
            )}
        </div>
        </>
    )
}

export default OrderTile;