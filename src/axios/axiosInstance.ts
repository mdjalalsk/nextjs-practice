import { getAccessToken } from '@/actions/authAction';
import axios, {AxiosRequestConfig} from 'axios';
import {logout} from "@/redux/features/authSlice";
import store from "@/redux/store";

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
});
const { dispatch } = store;

// Request interceptor to add JWT token to headers
axiosInstance.interceptors.request.use(
async (config: any) => {
    const accessToken = await getAccessToken('accessToken');
    // console.log(accessToken);
    if (accessToken) {
        config.headers.Authorization = accessToken; // Use Bearer token format
    }
    return config;
},
    (error) => {
        dispatch(logout()); // Dispatch the logout action on error
        return Promise.reject(error);
    }
);

// Response interceptor to handle token expiration
// axiosInstance.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error) => {
//         const originalRequest = error.config;
//         if (error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
//             try {
//                 const refreshToken = Cookies.get('refreshToken');
//                 const response = await axiosInstance.post('/api/refresh-token', { token: refreshToken });
//                 const { accessToken } = response.data;
//                 Cookies.set('accessToken', accessToken, { expires: 1, secure: true, sameSite: 'Strict' });
//                 axios.defaults.headers.common['Authorization'] = ` ${accessToken}`;
//                 return axiosInstance(originalRequest);
//             } catch (error) {
//                 // Handle token refresh failure (e.g., redirect to login)
//                 console.error('Token refresh failed:', error);
//                 return Promise.reject(error);
//             }
//         }
//         return Promise.reject(error);
//     }
// );

export default axiosInstance;
