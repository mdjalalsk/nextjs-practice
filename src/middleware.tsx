
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AUTH_KEY } from './constant/authConstatn';
import { getAccessToken } from './action/authAction';

const AuthRoutes = [
    '/login',
    '/register',
    "/about"
];

const commonPrivateRoutes = [
    '/dashboard222',

];

export function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;
    // const accessToken = cookies().get(AUTH_KEY)?.value;
    const accessToken = getAccessToken(AUTH_KEY);
    // console.log({pathname,accessToken});

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