"use client"
import Cookies from 'js-cookie';
import {useState} from "react";
import axiosInstance from "@/axios/axiosInstance";
import {useRouter} from "next/navigation";


export default function Login() {
    const router = useRouter();

    const [userinfo, setUserInfo] = useState({
        email:"",
        password:""
    });

    const handleLogin = async (e) => {
        e.preventDefault();
     // console.log(userinfo);
        try {
            const response = await axiosInstance.post('/api/login', {
                email: userinfo.email,
                password: userinfo.password,
            });
            const { data } = response.data;
            if(data){
                console.log("log sucess");
                router.push('/about');

            }

        } catch (error) {
            console.error('Login failed:', error);
            // Optionally handle error responses, e.g., display error messages to the user
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login to Your Account</h1>
                    <p className="py-6">
                        Welcome back! Please enter your credentials to log in.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleLogin}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="input input-bordered"
                                value={userinfo.email}
                                onChange={(e)=>setUserInfo({...userinfo,email:e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                className="input input-bordered"
                                value={userinfo.password}
                                onChange={(e)=>setUserInfo({...userinfo,password:e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
