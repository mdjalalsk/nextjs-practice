import { NextRequest, NextResponse } from 'next/server';
import { db } from "@/app/api/db";
import jwt from 'jsonwebtoken'; // Assuming you have JWT library installed

const secret = 'jalal103'; // Replace with your actual JWT secret key

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        // Check if user already exists (mock implementation)
        const existingUser = db.users.find((user) => user.email === email);
        if (existingUser) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        // Create new user object
        const newUser = {
            id: db.users.length + 1,
            email,
            password, // Note: Consider hashing the password before saving it to the DB
        };
        db.users.push(newUser);

        // Generate JWT token
        // const token = jwt.sign({userEmail: newUser.email }, secret, { expiresIn: '1h' });

        // Return success response with user data and token
        return NextResponse.json({ data: newUser}, { status: 201 });
    } catch (error) {
        // console.error('Registration error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
