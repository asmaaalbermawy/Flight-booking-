'use client';

import { useEffect, useState } from 'react';
import styles from './History.module.scss';

interface Booking {
  _id: string;
  name: string;
  email: string;
  gender: string;
  type: string;
  createdAt: string;
}

export default function BookingHistoryPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch('/api/bookings');

        // If the response is not ok, try to read error JSON
        if (!res.ok) {
          const contentType = res.headers.get('content-type');
          if (contentType?.includes('application/json')) {
            const errorData = await res.json();
            setError(errorData.message || 'Failed to load bookings.');
          } else {
            const text = await res.text();
            console.error('Non-JSON error response:', text);
            setError('Server error (non-JSON).');
          }
          return;
        }

        const contentType = res.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
          const text = await res.text();
          console.error('Invalid JSON response:', text);
          setError('Invalid response from server.');
          return;
        }

        const data = await res.json();

        if (Array.isArray(data)) {
          setBookings(data);
        } else {
          setError('Unexpected response format.');
          console.error('Unexpected data format:', data);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Error fetching bookings.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <main className={styles.historyPage}>
      <h1>Booking History</h1>

      {loading && <p>Loading bookings...</p>}

      {error && !loading && <p className={styles.error}>{error}</p>}

      {!loading && bookings.length === 0 && !error && (
        <p>No bookings yet.</p>
      )}

      {!loading && bookings.length > 0 && (
        <ul className={styles.bookingList}>
          {bookings.map((booking) => (
            <li key={booking._id} className={styles.card}>
              <strong>{booking.name}</strong>
              <p>Email: {booking.email}</p>
              <p>Type: {booking.type}</p>
              <p>Gender: {booking.gender}</p>
              <p>Date: {new Date(booking.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
