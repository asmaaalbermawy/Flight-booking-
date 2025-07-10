import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('AsmaaOnAir');
    const bookings = await db.collection('bookings')
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ message: 'Failed to fetch bookings.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, gender, type, createdAt } = body;

    if (!name || !email || !gender || !type) {
      return NextResponse.json({ message: 'Missing fields.' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('AsmaaOnAir');
    const result = await db.collection('bookings').insertOne({ name, email, gender, type, createdAt });

    return NextResponse.json({ message: 'Booking saved.', insertedId: result.insertedId });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ message: 'Failed to save booking.', error: String(error) }, { status: 500 });
  }
}
