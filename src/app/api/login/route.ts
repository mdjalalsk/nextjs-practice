
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/api/db'; // Adjust path based on your project structure
import jwt from 'jsonwebtoken';

const secret = 'jalal103'; // Replace with your actual JWT secret key
interface User {
    id: number;
    email: string;
    password: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const { email, password }: { email: string; password: string } = await req.json();
        // console.log(email, password);

        // Find user by email and password (mock implementation)
        const user: User | undefined = db.users.find((user: User) => user.email === email && user.password === password);
        // console.log(user);

        if (!user) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        // Generate JWT tokens
        const accessToken = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '1h' });

        // Create response and set cookies
        const response = NextResponse.json({data: user,accessToken},{ status: 200 });
        // response.headers.append('Set-Cookie', `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict`);
        // console.log(response);
        return response;
    } catch (error) {
        // console.error('Login error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

