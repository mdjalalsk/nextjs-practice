'use client'

import Link from "next/link";
import { ReactNode } from "react";
import {usePathname} from "next/navigation";
import { useRouter } from 'next/navigation'


// Define interface for navigation item
interface NavItem {
    id: number;
    name: string;
    url: string;
}

// Sample navigation items
const navItems: NavItem[] = [
    {
        id: 1,
        name: "Home",
        url: "/"
    },
    {
        id: 2,
        name: "About",
        url: "/about"
    }
];

const Navber = () => {
    const pathname  =usePathname()
    // const router = useRouter();

    const navItemList = (
        <>
            {navItems.map((item) => (
                <li key={item.id} className="px-3">
                    <Link className={`link ${pathname === item.url ? 'active text-blue-700 font-bold text-lg  ' : 'bg-none font-bold text-lg text-black'} no-underline`} href={item.url}>
                        {item.name}
                    </Link>
                </li>
            ))}
        </>
    );

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content  rounded-box z-[1] mt-3 w-52 p-2"
                        >
                            {navItemList}
                        </ul>
                    </div>

                    <a className="btn btn-ghost text-xl">daisyUI</a>
                    <div className="hidden lg:flex">
                        <ul className="flex">{navItemList}</ul>
                    </div>
                </div>

                <div className="navbar-end">
                    <ul className="">
                        <li>
                            <Link className={`link ${pathname === '/login' ? 'active text-blue-700 font-bold text-lg  ' : 'bg-none font-bold text-lg text-black'} no-underline`} href="/login">Login</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navber;
