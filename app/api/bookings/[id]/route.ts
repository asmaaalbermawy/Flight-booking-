import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db('AsmaaOnAir');
    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
    }

    const updates = await req.json();

    const result = await db.collection('bookings').updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Booking updated successfully' });
  } catch (error) {
    console.error('PATCH error:', error);
    return NextResponse.json({ message: 'Failed to update booking.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db('AsmaaOnAir');
    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
    }

    const result = await db.collection('bookings').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ message: 'Failed to delete booking.' }, { status: 500 });
  }
}
