"use client"
import React, {useState} from 'react';
import axiosInstance from "@/axios/axiosInstance";
import {useRouter} from "next/navigation";

const Page = () => {
    const router = useRouter();

    const [user,setUser]=useState({email:"",password:""});
// const[formError,serFormError]=useState({email:"",password:""});
const handleRegister=async (e)=>{
    e.preventDefault();
    try {
        const response = await axiosInstance.post('/api/register', {
            email: user.email,
            password: user.password
        });
        const { data } = response.data;
  if(data){
      // Redirect to login page
      router.push('/login');
  }

        // Optionally handle redirection or other actions after successful registration
    } catch (error) {
        console.error('Registration failed:', error);
        // Optionally handle error responses, e.g., display error messages to the user
    }

}
    return (

            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Register now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body" onSubmit={handleRegister}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" name="email" onBlur={(e)=>setUser({...user,email:e.target.value})} className="input input-bordered" required/>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered"
                                   name="password" onBlur={(e)=>setUser({...user,password:e.target.value})}    required/>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    );
};

export default Page;