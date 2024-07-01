"use client"
import React, { useState } from 'react';
import axiosInstance from "@/axios/axiosInstance";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from '@/redux/reducHook';
import { setError, setTokens, setUser, setLoading } from '@/redux/features/authSlice';
import { getAccessToken, setAccessToken } from '@/actions/authAction';

const Login = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    // Redux loading state
    const loading = useAppSelector(state => state.auth.loading);

    // State for user input
    const [userinfo, setUserInfo] = useState({
        email: "",
        password: ""
    });

    // Handler for form submission
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setLoading(true)); // Set loading state to true

        try {
            // Perform login request
            const response = await axiosInstance.post('/api/login', {
                email: userinfo.email,
                password: userinfo.password,
            });

            const { data, accessToken } = response.data;

            // // Set access token in cookies if not already set
            // const existingAccessToken = getAccessToken('accessToken');
            // if (!existingAccessToken && accessToken) {
            //     setAccessToken('accessToken', accessToken);
            //     dispatch(setTokens({ accessToken }));
            // }


            setAccessToken('accessToken', accessToken);
            // Update user data in Redux store
            dispatch(setTokens({ accessToken }));
            dispatch(setUser(data));
            dispatch(setLoading(false)); // Set loading state to false
            router.push('/dashboard'); // Redirect to '/about' upon successful login
        } catch (error: any) {
            // console.error('Login failed:', error);
            dispatch(setError(error.message)); // Set error state in Redux store
            dispatch(setLoading(false)); // Set loading state to false
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
                                onChange={(e) => setUserInfo({ ...userinfo, email: e.target.value })}
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
                                onChange={(e) => setUserInfo({ ...userinfo, password: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
