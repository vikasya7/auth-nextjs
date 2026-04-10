"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function ProfilePage(){
   
    const router=useRouter()
    const [data,setData]=useState('')
    const logout = async () =>{
        try {
            await axios.get('/api/users/logout')
            toast.success("successfull")
            router.push('/login')
        } catch (error:unknown) {
            const messaage=error instanceof Error ? error.message : "Internal server error"
            console.log(messaage)
            toast.error(messaage)
        }
    }

    const getUserDetails=async()=>{
        const response=await axios.get('/api/users/me')
        console.log(response.data);
        setData(response.data.data._id)
    }


    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <h1>Profile jkergf</h1>
            <hr />
            <h2>{data==='nothing' ? "Nothing":<Link href={`/profile/${data}`}>
            {data}</Link>}</h2>
            <button 
             onClick={logout}
            className="bg-blue-500 mt-4 px-4 py-2 rounded-xl font-bold text-white hover:bg-blue-400">
                Logout
            </button>
            <button 
             onClick={getUserDetails}
            className="bg-red-500 mt-4 px-4 py-2 rounded-xl font-bold text-white hover:bg-blue-400">
                getUserDetails
            </button>
        </div>
    )
}