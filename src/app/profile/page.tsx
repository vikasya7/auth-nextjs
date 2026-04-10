"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function ProfilePage(){
   
    const router=useRouter()

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




    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <h1>Profile jkergf</h1>
            <hr />
            <button 
             onClick={logout}
            className="bg-blue-500 mt-4 px-4 py-2 rounded-xl font-bold text-white hover:bg-blue-400">
                Logout
            </button>
        </div>
    )
}