'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import styles from './Confirmation.module.scss';
import { jsPDF } from 'jspdf';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ConfirmationPage() {
  const params = useSearchParams();
  const name = params.get('name') || '';
  const email = params.get('email') || '';
  const gender = params.get('gender') || '';
  const type = params.get('type') || '';
  const router = useRouter();

  const [qrUrl, setQrUrl] = useState('');
  const bookingSaved = useRef(false); // ✅ Prevent duplicate save

  useEffect(() => {
    const ticketText = `AsmaaOnAir Flight Ticket\nPassenger: ${name}\nEmail: ${email}\nType: ${type}\nGender: ${gender}`;
    const encoded = encodeURIComponent(ticketText);
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?data=${encoded}&size=150x150`);

    const saveBooking = async () => {
      try {
        const res = await fetch('/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            gender,
            type,
            createdAt: new Date().toISOString(),
          }),
        });

        if (!res.ok) {
          const err = await res.json();
          console.error('Booking save failed:', err.message || 'Unknown error');
        }
      } catch (err) {
        console.error('Booking save error:', err);
      }
    };

    if (!bookingSaved.current) {
      saveBooking();
      bookingSaved.current = true; // ✅ Only save once
    }
  }, [name, email, gender, type]);

  const generatePdf = () => {
    const doc = new jsPDF();
    const logo = new window.Image();
    logo.src = '/flight.png';

    logo.onload = () => {
      doc.addImage(logo, 'PNG', 85, 10, 40, 40);
      doc.setFontSize(16);
      doc.text('Booking Confirmed!', 20, 60);
      doc.setFontSize(12);
      doc.text(`Passenger Name: ${name}`, 20, 70);
      doc.text(`Email: ${email}`, 20, 80);
      doc.text(`Passenger Type: ${type}`, 20, 90);
      doc.text(`Gender: ${gender}`, 20, 100);

      const qr = new window.Image();
      qr.src = qrUrl;
      qr.onload = () => {
        doc.addImage(qr, 'PNG', 150, 60, 40, 40);
        const blob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(blob);
        window.open(pdfUrl, '_blank');
      };
    };
  };

  return (
    <main className={styles.confirmation}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image src="/flight.png" alt="Success" width={100} height={100} />
        <h1>Booking Confirmed!</h1>
        <p>Thank you, <strong>{name}</strong>! ✈️</p>
        <p>Email: {email}</p>
        <p>Passenger Type: {type}</p>
        <p>Gender: {gender}</p>

        {qrUrl && (
          <div className={styles.qr}>
            <img src={qrUrl} alt="QR Code" width={120} height={120} />
          </div>
        )}

        <div className={styles.buttons}>
          <button className={styles.button} onClick={generatePdf}>Download Ticket</button>
          <button className={styles.button} onClick={() => router.push('/')}>Back to Home</button>
        </div>
      </motion.div>
    </main>
  );
}
