"use client"
import Cookies from 'js-cookie';
import {useState} from "react";
import axiosInstance from "@/axios/axiosInstance";
import {useRouter} from "next/navigation";
import { useAppDispatch } from '@/redux/reducHook';
import { setError, setTokens, setUser } from '@/redux/features/authSlice';
import { getAccessToken, setAccessToken,setRefreshToken } from '@/actions/authAction';


export default function Login() {
    const router = useRouter();
    const dispatch = useAppDispatch()
    const [userinfo, setUserInfo] = useState({
        email:"",
        password:""
    });

    const handleLogin = async (e:React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/api/login', {
                email: userinfo.email,
                password: userinfo.password,
            });
            const {data,accessToken,refreshToken} = response.data; 
            const existAccessToken=getAccessToken('accessToken')
           
            if(!existAccessToken && accessToken && refreshToken){
               setAccessToken('accessToken', accessToken);
                setRefreshToken('refreshToken', refreshToken)
               dispatch(setTokens({ accessToken, refreshToken }));
            }
            dispatch(setUser(data));
            router.push('/about');
            // Redirect to another page upon successful login
        } catch (error:any) {
            console.error('Login failed:', error);
            dispatch(setError(error.message))

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
