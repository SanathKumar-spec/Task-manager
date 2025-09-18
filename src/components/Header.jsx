import React, { useState, useEffect } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { getBaseURL } from "../../utils/api";

export default function Header() {
    const [user, setUser] = useState("")

    useEffect(() =>{
        const fetchUser = async () =>{
            try{
                const res = await fetch(`${getBaseURL()}/userInfo`, {
                    method: 'GET',
                    credentials: 'include'
                })
                const data = await res.json();
                console.log(data);
                
                if(res.ok){
                    setUser(data)
                }
            }catch(err){
                console.log(err);
                
            }
        };
        fetchUser();
    }, []);

    return (
        <div>
            <header className="bg-white shadow-sm ">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <img src="logo.png" alt="PlanIt logo with modern blue gradient design and checkmark symbol" className="h-8 w-8 rounded" />
                            <span className="ml-2 text-xl font-bold text-gray-800">PlanIt</span>
                        </div>

                        <div className="flex-1 max-w-2xl mx-4">
                            <div className="relative">
                                <input type="text" placeholder="Search tasks..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="p-2 rounded-full hover:bg-gray-100">
                                <i className="fas fa-bell text-gray-600"></i>
                            </button>
                            <div className="flex items-center space-x-2 cursor-pointer">
                                <div className='rounded-full h-8 w-8 flex items-center justify-center'><FaUserCircle className='w-8 h-8 text-gray-500'/></div>
                                {user && <p className='text-md text-gray-500'>{user.username}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}
