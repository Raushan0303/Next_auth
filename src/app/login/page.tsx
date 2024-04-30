'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { text } from 'stream/consumers';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter()
    const [user, setUser] = useState({
        email : "",
        password: ""
    });
    const [buttondisabled, setButtondisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onLogin= async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login",user);
            console.log("login success", response.data)
            router.push('/profile')
        } catch (error:any) {
            console.log("signup failed");
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        if(user.email.length>0 && user.password.length > 0){
            setButtondisabled(false)
        }else{
            setButtondisabled(true)
        }
    },[user])
  return (
    <div className='flex flex-col items-center justify-center min-h-screen
     py-2'>
        <h1>{loading? "processing":"Signup"}</h1>
        <hr/>
        <label htmlFor="email">email</label>
        <input className='p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        id = 'email'
        value={user.email}
        onChange={(e)=>setUser({...user,email: e.target.value})}
        placeholder='email'
        type = "text"/>
        <label htmlFor="password">password</label>
        <input className='p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        id = 'password'
        value={user.password}
        onChange={(e)=>setUser({...user,password: e.target.value})}
        placeholder='password'
        type = "text"/>
        <button 
        onClick={onLogin}
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        >
            {buttondisabled ? "No Login" : "Login"}
        </button>
        <Link href= '/signup'>visit signup page</Link>
     </div>
  )
}
