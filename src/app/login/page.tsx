"use client";
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation" 
import axios from "axios"
import toast from "react-hot-toast"

export default function LoginPage (){
    const router=useRouter()
    const [user,setUser]=React.useState({
        email:"",
        password:"",
    })
    const [buttonDisabled,setButtonDisabled]=useState(false);
    const [loading,setLoading]=useState(false)
    const onLogin=async()=>{
        try {
            setLoading(true)
            const response=await axios.post("/api/users/login",user);
            console.log(response.data)
            toast.success("login success")
            router.push("/profile")
        } catch (error:unknown) {
            const message=error instanceof Error ? error.message : "Internal server error"
            console.log(message)
            toast.error(message)
        } finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true)
        }
    },[user])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="font-bold">{loading ? "processing":"login"}</h1>
            <hr />
            <hr />
            
            <label htmlFor="email" >email</label>
            <input 
               className="p-2 border-gray-300 text-black bg-amber-100 placeholder-gray-400 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
               id="email"
               value={user.email}
               onChange={(e)=>setUser({...user,email:e.target.value})}
               placeholder="email"
            />
            <label  htmlFor="password" >password</label>
            <input 
               className="p-2 border-gray-300 text-black bg-amber-100 placeholder-gray-400 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
               id="password"
               type="password"
               value={user.password}
               onChange={(e)=>setUser({...user,password:e.target.value})}
               placeholder="password"
            />

            <button
             onClick={onLogin}
             className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >
                Login here
            </button>
            <Link href="/signup">Visit Signup page</Link>
        </div>
    )
}