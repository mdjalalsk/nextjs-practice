
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {getAccessToken} from "@/actions/authAction";

const AuthRoutes = [
    '/login',
    '/register',
    "/about"
];

const commonPrivateRoutes = [
    '/dashboard',

];

export async function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;
    const accessToken =await getAccessToken('accessToken');
    // console.log(accessToken);

    // check authenticattion
    if (!accessToken) {
        if (AuthRoutes.includes(pathname)) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    if (accessToken && (commonPrivateRoutes.includes(pathname) || commonPrivateRoutes.some((route) => pathname.startsWith(route)))) {
        return NextResponse.next();
    }

    return NextResponse.next();
    // return NextResponse.redirect(new URL('/', request.url))
}


// which which page/routes this middleware will trigger
export const config = {
    matcher: [
        '/dashboard/:page*',
        // "/api/:path*",
    ],
}