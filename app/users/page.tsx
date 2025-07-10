// app/users/page.tsx
import clientPromise from '@/lib/mongodb';

export default async function UsersPage() {
  const client = await clientPromise;
  const db = client.db('AsmaaOnAir');
  const users = await db.collection('users').find().toArray();

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Registered Users (Testing)</h1>
      <ul>
        {users.map((user: any) => (
          <li key={user._id}>
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </main>
  );
}
