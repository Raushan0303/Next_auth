'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { text } from 'stream/consumers';
import Link from 'next/link';

export default function SignupPage() {
    const router = useRouter()
    const [user, setUser] = useState({
        username:"",
        email : "",
        password: ""
    });
    const [buttondisabled, setButtondisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup",user);
            console.log("signup success", response.data)
            router.push('/login')
        } catch (error:any) {
            console.log("signup failed");
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        if(user.email.length>0 && user.password.length > 0 && user.username.length>0){
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
        <label htmlFor="username">username</label>
        <input className='p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        id = 'username'
        value={user.username}
        onChange={(e)=>setUser({...user,username: e.target.value})}
        placeholder='username'
        type = "text"/>
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
        onClick={onSignup}
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        >
            {buttondisabled ? "No Signup" : "Signup"}
        </button>
        <Link href= '/login'>login page</Link>
     </div>
  )
}