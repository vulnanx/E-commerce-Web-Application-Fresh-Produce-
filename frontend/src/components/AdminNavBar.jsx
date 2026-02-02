"use client";
import { User, X, LogOut, LogIn, Boxes, Users, PackageSearch, ChartNoAxesCombined, Sprout } from "lucide-react";
import React, { useEffect, useState , useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';
import { handleGetUser } from "../integration/authentication.js";


const NavBar = () => {
    // for frontend routing
    const router = useRouter();

    // initializations
    const [isSignIn, setIsSignIn] = useState(true); // show page for sign in/ sign up

    // for user inputs in SIGN UP (realtime)- initialize to empty strings
    const [fname, setFname] = useState("");
    const [mname, setMname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // for user inputs in SIGN IN (realtime)- initialize to empty strings
    const [signInEmail, setSignInEmail] = useState("");
    const [signInPassword, setSignInPassword] = useState("");

    // initializations
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
    }, [userId]);

    return (
    <>
    
      <div className="bg-linear-to-r from-[#072E07] to-[#001200] text-white h-[10vh] flex items-center p-10 justify-between">
        <div className="flex items-center gap-[2vw]">
            <div className="flex gap-5 items-center">
                {/* This is the logo */}
                <Sprout className="place-self-center text-center h-11 w-11 text-white"/>
                <a href="/admin/inventory"> 
                <p className="text-xl">FARM TO TABLE</p> 
                </a>
            </div>

            <div className="h-[7vh] w-[1] bg-white"></div>

            <div className="flex justify-between h-[10vh] items-center">
                <div className="flex flex-row items-center h-[10vh] pr-20 pl-20 w-full justify-center hover:bg-[#041B04] cursor-pointer"
                    onClick={ () => {
                        if (userId) {
                            if (user.type === "admin") {
                                router.push("/admin/inventory")
                            } else {
                                router.push("/client/shop")
                            }
                        } else {
                            setShowAuth(true)
                        }
                    }}>
                    <div className="flex flex-row gap-2">
                    <Boxes/>
                    Inventory
                    </div>
                </div>
                <div className="flex items-center h-[10vh] pr-20 pl-20 w-full justify-center hover:bg-[#041B04] cursor-pointer"
                    onClick={ () => {
                        if (userId) {
                            router.push("/admin/accounts")
                        } else {
                            setShowAuth(true)
                        }
                    }}>
                    <div className="flex flex-row gap-2">
                    <Users/>
                    Accounts
                    </div>
                </div>
                <div className="flex items-center h-[10vh] pr-20 pl-20 w-full justify-center hover:bg-[#041B04] cursor-pointer"
                    onClick={ () => {
                        if (userId) {
                            router.push("/admin/view_orders")
                        } else {
                            setShowAuth(true)
                        }
                    }}>
                    <div className="flex flex-row gap-2">
                    <PackageSearch/>
                    Orders
                    </div>
                </div>
                <div className="flex items-center h-[10vh] pr-20 pl-20 w-full justify-center hover:bg-[#041B04] cursor-pointer"
                    onClick={ () => {
                        if (userId) {
                            router.push("/admin/sales")
                        } else {
                            setShowAuth(true)
                        }
                    }}>
                    <div className="flex flex-row gap-2">
                    <ChartNoAxesCombined/>
                    Sales
                    </div>
                </div>
            </div>
        </div>

            {/* Profile logo */}
            <div className="flex flex-row gap-10">
                {/* <User className="bg-gray-500 rounded-[100] p-2 h-10 w-10 hover:cursor-pointer"
                    onClick={()=>{
                            router.push('/client/profile')             
                    }}
                /> */}
                {/* Log Out*/}
            <div className="hover:cursor-pointer"
                onClick={() => {
                    // if user is signed in, show profile with button to log out
                    alert('You have logged out successfully.')
                    router.push('/');
                    // removes the current logged in user and resets field for log in and sign up
                    setFname("");
                    setMname("");
                    setLname("");
                    setEmail("");
                    setPassword("");
                    setSignInEmail("");
                    setSignInPassword("");
                    setUserId(null);
                    setUser(null);
                    localStorage.removeItem('userId'); // clear the localStogage of any user Id
                    setShowAuth(true);
                                        
                }}
                > 
                <LogOut/>
                <p>Log Out</p>
            </div>
            </div>
        </div>      
    </>
    );
  }
  

  export default NavBar;