"use client";
import axios from "axios";
import { useEffect, useState } from "react";




export default function ForgotPasswordPage(){
    const [token,setToken]=useState("")
    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")

    const forgot=async()=>{
        try {
            await axios.post("/api/users/forgotpassword",{token,password,confirmPassword})

        } catch (error:unknown) {
            const message =error instanceof Error ? error.message : "Internal server error";
           console.error(message);
        }
    }

    useEffect(()=>{
        const urlToken=window.location.search.split('=')[1] || "";
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setToken(urlToken)
    },[])


    return (
        <div className="flex flex-col min-h-screen justify-center items-center">
            <label  htmlFor="password" >password</label>
             <input type="password" 
             placeholder="enter your password"
             value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
             />
             <input type="password" 
             placeholder="enter your confirm password"
             value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
             />


             <button
             onClick={forgot}
             className="p-2 rounded-lg border-gray-300 mb-4 bg-amber-500 hover:bg-orange-800"
             >
                submit
             </button>
        </div>
    )
}


