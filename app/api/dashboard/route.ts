import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('AsmaaOnAir');

    const email = req.nextUrl.searchParams.get('email');

    if (!email) {
      return NextResponse.json([], { status: 200 });
    }

    const bookings = await db
      .collection('bookings')
      .find({ email })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ message: 'Failed to fetch bookings.' }, { status: 500 });
  }
}
