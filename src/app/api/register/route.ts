
import { NextRequest, NextResponse } from 'next/server';
import { db } from "@/app/api/db";

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
            password,
        };
        db.users.push(newUser);
        return NextResponse.json({ data: newUser}, { status: 201 });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

