import clientPromise from '@/lib/mongodb';

export async function getAllBookings() {
  const client = await clientPromise;
  const db = client.db();
  return db.collection('bookings').find().toArray();
}

export async function createBooking(data: any) {
  const client = await clientPromise;
  const db = client.db();
  return db.collection('bookings').insertOne(data);
}
