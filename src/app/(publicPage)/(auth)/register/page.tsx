"use client"
import React, {useState} from 'react';
import axiosInstance from "@/axios/axiosInstance";
import {useRouter} from "next/navigation";
import { useAppDispatch } from '@/redux/reducHook';
import { setError, setUser } from '@/redux/features/authSlice';
import { setAccessToken } from '@/actions/authAction';

const Page = () => {
    const router = useRouter();
    const dispatch = useAppDispatch()
    const [regUser,setRegUser]=useState({email:"",password:""});
// const[formError,serFormError]=useState({email:"",password:""});
const handleRegister=async (e:React.FormEvent)=>{
    e.preventDefault();
    try {
        const response = await axiosInstance.post('/api/register', {
            email: regUser.email,
            password: regUser.password
        });
        const { data,token} = response.data;
       if(token){
        setAccessToken('accessToken',token)
       }
    //    console.log(token);
          dispatch(setUser(data))
          router.push('/login');
    } catch (error:any) {
        console.error('Registration failed:', error);
      dispatch(setError(error.message))
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
                                <input type="email" placeholder="email" name="email" onBlur={(e)=>setRegUser({...regUser,email:e.target.value})} className="input input-bordered" required/>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered"
                                   name="password" onBlur={(e)=>setRegUser({...regUser,password:e.target.value})}    required/>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    );
};

export default Page;