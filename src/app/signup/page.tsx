"use client"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation" 
import axios from "axios"
import toast from "react-hot-toast"

export default function SignUp (){
    const router=useRouter()
    const [user,setUser]=React.useState({
        email:"",
        password:"",
        username:"",
    })
    const [buttonDisabled,setButtonDisabled]=useState(false);
    const [loading,setLoading]=useState(false)
    const onSignUp=async()=>{
        try {
            setLoading(true)
            const response=await axios.post("/api/users/signup",user)
            console.log("Sign up data",response.data);
             router.push("/login")
        } catch (error :unknown) {
            const message=error instanceof Error ? "error?.message":"Internal server error"
            console.log("Sign up failed",message)
            toast.error(message)
        }finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
       if(user.email.length>0 && user.password.length>0 && user.username.length>0){
         // eslint-disable-next-line react-hooks/set-state-in-effect
         setButtonDisabled(false)
       }
       else{
        setButtonDisabled(true)
       }
    },[user])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="font-bold">{loading ? "Processing":"Signup"}</h1>
            <hr />
            <hr />
            <label htmlFor="username" >username</label>
            <input 
               className="p-2 bg-amber-100 text-black placeholder-gray-400 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
               id="username"
               type="text"
               value={user.username}
               onChange={(e)=>setUser({...user,username:e.target.value})}
               placeholder="username"
            />
            <label htmlFor="email" >email</label>
            <input 
               className="p-2 text-black border-gray-300 bg-amber-100 placeholder-gray-400 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
               id="email"
               value={user.email}
               onChange={(e)=>setUser({...user,email:e.target.value})}
               placeholder="email"
            />
            <label  htmlFor="password" >password</label>
            <input 
               className="p-2 text-black border-gray-300 bg-amber-100 placeholder-gray-400 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
               id="password"
               type="password"
               value={user.password}
               onChange={(e)=>setUser({...user,password:e.target.value})}
               placeholder="password"
            />

            <button
             onClick={onSignUp}
             className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >
              {buttonDisabled ? "No signup":"Signup here"}
            </button>
            <Link href="/login">Visit login page</Link>
        </div>
    )
}