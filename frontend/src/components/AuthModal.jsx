"use client";
import { X } from "lucide-react";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState , useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

const AuthModal = () => {
    // for frontend routing
    const router = useRouter();

    // initializations
    const { userId, setUserId, showAuth, setShowAuth } = useContext(AuthContext);
    

    return(
    <>

    <div onClick={onClose} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="w-[70vw] h-[85vh] bg-white rounded-lg shadow-xl p-6 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-2xl font-bold">Edit Profile</h3>
        <button 
        onClick={onClose}
         className="text-gray-400 hover:text-gray-700 cursor-pointer transition-colors"
        >
        <X className="w-6 h-6" />
        </button>
            </div>
        </div>
    </div>
    
    </>
    )
}

export default AuthModal;