'use client';

import React, { useState } from 'react';
import styles from './Booking.module.scss';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Footer from '../components/Footer/Footer';
import { useRouter } from 'next/navigation';

export default function BookingPage() {
  const router = useRouter();

  // Store form input values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    type: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, gender, type } = formData;
    const query = new URLSearchParams({ name, email, gender, type }).toString();
    router.push(`/confirmation?${query}`);
  };

  return (
    <>
      <main className={styles.bookingPage}>
        {/* Title */}
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Book Your Flight
        </motion.h1>

        {/* Flight Summary */}
        <motion.section
          className={styles.summary}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2>Flight Summary</h2>
          <Image
            src="https://media.istockphoto.com/id/96653894/photo/airplane-in-sky.webp?a=1&b=1&s=612x612&w=0&k=20&c=LOA30kPi9eoyCNj6yguUmDlRl9Q7l1n8bBlPIKiBCrA="
            alt="Flight"
            width={600}
            height={200}
            className={styles.flightImage}
          />
          <p><strong>From:</strong> Cairo</p>
          <p><strong>To:</strong> Rome</p>
        </motion.section>

        {/* Passenger Info Form */}
        <motion.section
          className={styles.formSection}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h2>Passenger Information</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input type="text" placeholder="Passport / ID Number" required />
            <input type="text" placeholder="Nationality" required />
            <input type="date" placeholder="Passport Expiry Date" required />

            <div className={styles.groupedInputs}>
              <input
                type="number"
                min="1"
                placeholder="Number of Passengers"
                required
              />
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="">Passenger Type</option>
                <option value="adult">Adult</option>
                <option value="child">Child</option>
              </select>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <button type="submit">Confirm Booking</button>
          </form>
        </motion.section>
      </main>

      <Footer />
    </>
  );
}
