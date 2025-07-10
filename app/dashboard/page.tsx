'use client';

import { useEffect, useState } from 'react';
import styles from './Dashboard.module.scss';

interface Booking {
  _id: string;
  name: string;
  email: string;
  gender: string;
  type: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [userEmail, setUserEmail] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedBooking, setEditedBooking] = useState<Partial<Booking>>({});

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setUserEmail(storedEmail);
      fetchBookings(storedEmail);
    }
  }, []);

  const fetchBookings = async (email: string) => {
    try {
      const res = await fetch('/api/bookings');
      const data: Booking[] = await res.json();
      const userBookings = data.filter((b) => b.email === email);
      setBookings(userBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleEdit = (booking: Booking) => {
    setEditingId(booking._id);
    setEditedBooking({
      name: booking.name,
      gender: booking.gender,
      type: booking.type,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedBooking({});
  };

  const handleChange = (field: keyof Booking, value: string) => {
    setEditedBooking((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async (id: string) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedBooking),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to update booking');
      }

      const updatedBookings = bookings.map((b) =>
        b._id === id ? { ...b, ...editedBooking } as Booking : b
      );
      setBookings(updatedBookings);
      setEditingId(null);
      setEditedBooking({});
    } catch (err) {
      console.error('Failed to update booking:', err);
      alert(`Failed to update booking: ${err.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm('Are you sure you want to delete this booking?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setBookings(bookings.filter((b) => b._id !== id));
      } else {
        console.error('Failed to delete');
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <main className={styles.dashboard}>
      <h2>Welcome to Your Dashboard</h2>
      <div className={styles.cards}>
        {bookings.length === 0 ? (
          <p>No bookings found for your account.</p>
        ) : (
          bookings.map((booking) => (
            <div key={booking._id} className={styles.card}>
              {editingId === booking._id ? (
                <>
                  <input
                    type="text"
                    value={editedBooking.name || ''}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    value={editedBooking.gender || ''}
                    onChange={(e) => handleChange('gender', e.target.value)}
                    placeholder="Gender"
                  />
                  <input
                    type="text"
                    value={editedBooking.type || ''}
                    onChange={(e) => handleChange('type', e.target.value)}
                    placeholder="Type"
                  />
                  <div className={styles.actions}>
                    <button onClick={() => handleSave(booking._id)}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <h3>{booking.name}</h3>
                  <p><strong>Email:</strong> {booking.email}</p>
                  <p><strong>Gender:</strong> {booking.gender}</p>
                  <p><strong>Type:</strong> {booking.type}</p>
                  <p><strong>Date:</strong> {new Date(booking.createdAt).toLocaleDateString()}</p>
                  <div className={styles.actions}>
                    <button onClick={() => handleEdit(booking)}>Edit</button>
                    <button onClick={() => handleDelete(booking._id)}>Delete</button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </main>
  );
}
