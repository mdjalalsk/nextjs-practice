import React, { MouseEvent, ReactNode } from 'react';
import Link from 'next/link';

type ButtonProps = {
    className?: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    href?: string;
    children: ReactNode;
    disabled?: boolean; // New prop for disabling the button
    loading?: boolean; // New prop for showing loading state
    error?: boolean; // New prop for showing error state
};

const ButtonComponent = ({ className, href, onClick, children, disabled, loading, error }: ButtonProps) => {
    if (href) {
        return (
            <Link href={href} passHref>
                <a className={`${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    {loading ? 'Loading...' : children}
                </a>
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={`px-5 py-2.5 ${className}`} disabled={disabled}>
            {loading ? 'Loading...' : error ? 'Error' : children}
        </button>
    );
};

export default ButtonComponent;
