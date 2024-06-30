'use server';
import { cookies } from "next/headers";
export const setAccessToken = (keyName:string,token:string) =>{
    cookies().set(keyName,token,{
        httpOnly: true,
        sameSite: "lax",
        maxAge: 24*60*60
    })
}
export const setRefreshToken = (keyName:string,token:string) =>{
    cookies().set(keyName,token,{
        httpOnly: true,
        sameSite: "lax",
        maxAge: 90 * 24 * 60 * 60
    })
}
export const getAccessToken =  (keyName:string) =>{
    const token = cookies().get(keyName)?.value;
    console.log({token});
    return token
}