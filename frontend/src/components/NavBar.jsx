"use client";
import { User, X, LogOut, LogIn, ShoppingBag, ShoppingCart, Package2, Sprout } from "lucide-react";
import React, { useEffect, useState , useContext } from 'react';
import { useRouter } from 'next/navigation';
import { handleSignIn, handleSignUp, handleEmailExists, handleGetUser } from "../integration/authentication.js";
import { AuthContext } from '@/context/AuthContext';

const NavBar = () => {
    // for frontend routing
    const router = useRouter();

    // initializations
    const { userId, setUserId, showAuth, setShowAuth } = useContext(AuthContext);
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
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    
    // useEffect(() => {
    //     const fetchUser = async () => {
    //         if (userId) {
    //             const fetchedUser = await handleGetUser(userId);
    //             setUser(fetchedUser);
    //         }
    //     };
    //     if (user) {
    //         if (user.type === "admin") {
    //             router.push("/admin/inventory");
    //         } else {
    //             router.push("/client/shop");
    //         }
    //     }
    //     setIsLoading(true);
    //     fetchUser().then(() => setIsLoading(false));
    // }, [userId]);

    useEffect(() => {
        const fetchUser = async () => {
            if (userId) {
                setIsLoading(true);
                const fetchedUser = await handleGetUser(userId);
                setUser(fetchedUser);
                setIsLoading(false);
            }
        };
        fetchUser();
    }, [userId]);
    
    useEffect(() => {
        if (user) {
            if (user.type === "admin") {
                router.push("/admin/inventory");
            } 
            // else {
            //     router.push("/client/shop");
            // }
        }
    }, [user]);

    return (
    <>
    
      <div className="bg-linear-to-r from-[#072E07] to-[#001200] text-white h-[10vh] flex items-center p-10 justify-between">
        <div className="flex items-center gap-[2vw]">
            <div className="flex gap-3 items-center">
                {/* This is the logo */}
                
                    <Sprout className="place-self-center text-center h-11 w-11 text-white"/>
                
                <a href="/"> 
                <p className="text-xl">FARM TO TABLE</p> 
                </a>
            </div>

            <div className="h-[7vh] w-[1] bg-white"></div>

            <div className="flex justify-between h-[10vh] items-center">
                <div className="flex flex-row items-center h-[10vh] pr-20 pl-20 w-full justify-center hover:bg-[#041B04] cursor-pointer"
                    onClick={ () => {
                        // if signed in si user, makikita ang shop page, pag hindi, magsshow yung pop up for sign in/up
                        if (userId) {
                            router.push("/client/shop")
                        } else {
                            setShowAuth(true)
                        }
                    }}>
                    <div className="flex flex-row gap-2">
                    <ShoppingBag/>
                    Shop
                    </div>
                </div>
                <div className="flex items-center h-[10vh] pr-20 pl-20 w-full justify-center hover:bg-[#041B04] cursor-pointer"
                    onClick={ () => {
                        // if signed in si user, makikita ang shop page, pag hindi, magsshow yung pop up for sign in/up
                        if (userId) {
                            router.push("/client/cart")
                        } else {
                            setShowAuth(true)
                        }
                    }}>
                    <div className="flex flex-row gap-2">
                    <ShoppingCart/>
                    Cart
                    </div>
                </div>
                <div className="flex items-center h-[10vh] pr-20 pl-20 w-full justify-center hover:bg-[#041B04] cursor-pointer"
                    onClick={ () => {
                        // if signed in si user, makikita ang shop page, pag hindi, magsshow yung pop up for sign in/up
                        if (userId) {
                            router.push("/client/orders")
                        } else {
                            setShowAuth(true)
                        }
                    }}>
                    <div className="flex flex-row gap-2">
                    <Package2/>
                    Orders
                    </div>
                </div>
            </div>
        </div>

        {userId ? (
            <>
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
            </>
        ) : (
            <>
            <div className="hover:cursor-pointer" onClick={() => setShowAuth(true)}>
                <LogIn/>
                <p className="text-center">Sign In</p>
            </div>
            </>
        )}
        </div>

        
    {/* Sign in/Sign up modal */}
    {showAuth && (
        <div  className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="w-[70vw] h-[85vh] bg-white rounded-lg shadow-xl flex flex-col">
                <div className="flex">
                    <img className="w-[35vw] h-[85vh] rounded-tl-lg rounded-bl-lg brightness-75" src="https://images.pexels.com/photos/1391487/pexels-photo-1391487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"></img>
                    <div className="flex flex-col p-6 w-[35vw]">

                        {/* X button Pop up */}
                        <X onClick={() => setShowAuth(false)} className="w-6 h-6 self-end hover:cursor-pointer" />
                        
                        <div className="flex flex-col items-center m-auto">
                            <div className="flex flex-col items-center">
                                <h1 className="text-[50px]">FARM TO TABLE</h1>
                                <p className="pb-3 text-gray-800 italic">From our fields to your family</p>
                            </div>
                        { isSignIn? (
                            <>
                            {/* Forms */}
                            <div className="flex flex-col gap-1">
                                <div className="relative">
                                    <label className="block text-sm text-gray-600 mb-1">Email</label>
                                    <input
                                    type="text"
                                    value={signInEmail}
                                    onChange={(e) => setSignInEmail(e.target.value)}
                                    className="w-80 p-2 border border-gray-300 mb-4 pr-10 rounded-md" 
                                    />
                                </div>

                                <div className="relative">
                                    <label className="block text-sm text-gray-600 mb-1">Password</label>
                                    <input
                                    type="password"
                                    value={signInPassword}
                                    onChange={(e) => setSignInPassword(e.target.value)}
                                    className="w-80 p-2 border border-gray-300 mb-4 pr-10 rounded-md" 
                                    />
                                </div>

                                <div className="bg-[#54AE54] rounded-lg text-center p-2 text-white hover:cursor-pointer
                                hover:bg-[#346334] "
                                    onClick={ async () => {
                                        if (!signInEmail || !signInPassword ) {
                                            alert(`Please fill out the missing fields.`);
                                            return null;
                                        }
                                        const exists = await handleEmailExists(signInEmail);
                                        if (!exists) {
                                            alert('User does not exist.')
                                            return null;
                                        }
                                        const id = await handleSignIn(signInEmail, signInPassword);
                                        if (id) {
                                            alert(`Signed in successfully!`);
                                            setUserId(id);
                                            localStorage.setItem('userId', id); // save into localStorage since useState resets userId when page reloads
                                            setShowAuth(false);
                                        }  
                                    }}> Sign in
                                </div>
                                
                                <div className="text-center">
                                    <span>Don't have an account? </span>
                                    <span onClick={() => setIsSignIn(false)} className="text-[#2A39DB] hover:cursor-pointer">Sign up</span>
                                </div>
                            </div>
                            </>
                            ) : (
                            <>

                            {/* Sign up */}
                            <div className="flex flex-col gap-0.5 h-[60vh] w-[30vw] p-3 items-center overflow-y-auto scrollbar-thin">
                                <div className="relative">
                                    <label className="block text-sm text-gray-600 mb-1">First Name</label>
                                    <input
                                    type="text"
                                    value={fname} 
                                    onChange={(e) => setFname(e.target.value)} 
                                    className="w-80 p-2 border border-gray-300 mb-4 pr-10 rounded-md" 
                                    />
                                </div>

                                <div className="relative">
                                    <label className="block text-sm text-gray-600 mb-1">Middle Name</label>
                                    <input
                                    type="text" placeholder="Optional"
                                    value={mname} 
                                    onChange={(e) => setMname(e.target.value)}
                                    className="w-80 p-2 border border-gray-300 mb-4 pr-10 rounded-md" 
                                    />
                                </div>

                                <div className="relative">
                                    <label className="block text-sm text-gray-600 mb-1">Last Name</label>
                                    <input
                                    type="text"
                                    value={lname} 
                                    onChange={(e) => setLname(e.target.value)}
                                    className="w-80 p-2 border border-gray-300 mb-4 pr-10 rounded-md" 
                                    />
                                </div>

                                <div className="relative">
                                    <label className="block text-sm text-gray-600 mb-1">Email</label>
                                    <input
                                    type="text"
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-80 p-2 border border-gray-300 mb-4 pr-10 rounded-md" 
                                    />
                                </div>

                                <div className="relative">
                                    <label className="block text-sm text-gray-600 mb-1">Password</label>
                                    <input
                                    type="text"
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-80 p-2 border border-gray-300 mb-4 pr-10 rounded-md" 
                                    />
                                </div>

                                <div className="w-80 bg-[#54AE54] rounded-lg text-center p-2 text-white relative">
                                    <button onClick={ async () => {
                                        if (!fname || !mname || !lname || !email || !password ) {
                                            alert(`Please fill out the missing fields.`);
                                            return null;
                                        }
                                        const exists = await handleEmailExists(email);
                                        if (exists) {
                                            alert('Email already exists.')
                                            return null;
                                        }  
                                        const id = await handleSignUp(fname, mname, lname, email, password);
                                        if (id) {
                                            alert(`Signed up! Your user ID is: ${id}`);
                                            setUserId(id);
                                            localStorage.setItem('userId', id); // save into localStorage since useState resets userId when page reloads
                                            setShowAuth(false);
                                        }
                                    }}> Sign up</button>
                                </div>
                                
                                <div className="text-center">
                                    <span>Already have an account? </span>
                                    <span onClick={() => setIsSignIn(true)} className="text-[#2A39DB] hover:cursor-pointer">Sign in</span>
                                    
                                </div>
                            </div>
                            </>
                            ) }
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    )}

    </>
    );
  }
  

  export default NavBar;