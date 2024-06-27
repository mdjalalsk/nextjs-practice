import React, { MouseEvent, ReactNode } from 'react';
import Link from 'next/link';

type ButtonProps = {
    className?: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void; // Corrected onClick type
    href?: string;
    children: ReactNode; // Ensure children are of type ReactNode
};

const ButtonComponent = ({ className, href, onClick, children }: ButtonProps) => {
    if (href) {
        return (
            <Link href={href} passHref>
                <a className={className}>{children}</a>
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={`px-5 py-2.5 ${className}`}>
            {children}
        </button>
    );
};

export default ButtonComponent;
