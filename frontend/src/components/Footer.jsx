"use client";
import { User, Trash2, Pencil, Facebook, Globe } from "lucide-react";
import React, { useEffect, useState , useContext } from 'react';

const ProfileBar = ({user, onDelete}) => { // item: id, pid , quantity, name, type, amount, stock, order_status, date_requested, date_confirmed, date_cancelled, image

    return(
        <>
            <div className="text-white w-full h-[40vh] bg-cover bg-no-repeat p-15 bg-[url(https://images.pexels.com/photos/582486/pexels-photo-582486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)]">
                <div className="flex flex-row items-start justify-between"> {/* flex row */}
                    <div className="flex flex-col gap-2 items-center">
                        <img className="w-[20vh] h-[20vh]"
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Department_of_Agriculture_of_the_Philippines.svg/1200px-Department_of_Agriculture_of_the_Philippines.svg.png"></img>
                        <p className="text-white font-semibold">Department of Agriculture</p>
                        <div className="flex flex-col gap-0 items-center">
                            <p className="opacity-90 text-sm">Elliptical Road, Diliman</p> 
                            <p className="opacity-90 text-sm">Quezon City, 1100</p>
                        </div>
                        
                    </div>
                <div className="flex flex-col gap-1 text-sm">
                    <p className="text-lg underline">About Us</p>
                    <a href="https://www.da.gov.ph/about-us/history/">History</a>
                    <a href="https://www.da.gov.ph/about-us/mandate/">Mandate</a>
                    <a href="https://www.da.gov.ph/citizens-charter/">Citizen's Charter</a>
                    
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-lg underline">Contact Us</p>
                    <p className="text-sm">	+63 (2) 8928-8741 to 64</p>
                    <p className="text-sm">+63 (2) 8273-2474</p>
                    <p className="text-sm">osec.official@da.gov.ph</p>
                    
                    
                    
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-lg underline">Follow Us</p>
                    <div className="flex flex-row gap-3">
                    <a className="text-sm" href="https://www.facebook.com/dacentralphilippines"><Facebook/></a>
                    <a className="text-sm" href="https://www.da.gov.ph/"><Globe/></a>
                    </div>
                    
                </div>
                </div>
            </div>
        </>
    )
}

export default ProfileBar;