import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const client = await clientPromise;
    const db = client.db('AsmaaOnAir');

    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ message: 'Incorrect password' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Login successful', name: user.name });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Login failed', error }, { status: 500 });
  }
}
