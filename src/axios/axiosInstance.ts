import { getAccessToken } from '@/actions/authAction';
import axios from 'axios';
import Cookies from 'js-cookie';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
});

// Request interceptor to add JWT token to headers
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = getAccessToken('accessToken');
        console.log(accessToken);
        if (accessToken) {
            config.headers.Authorization = accessToken;
        }
        return config;
    },
    (error) => {
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
