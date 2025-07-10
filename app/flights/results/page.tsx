'use client';

import { useSearchParams } from 'next/navigation';
import styles from './Results.module.scss';
import { motion } from 'framer-motion';

export default function FlightResultsPage() {
  const params = useSearchParams();

  const from = params.get('from');
  const to = params.get('to');
  const departure = params.get('departure');
  const returnDate = params.get('return');
  const passengers = params.get('passengers');

  return (
    <main className={styles.resultsPage}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Flight Search Results</h1>
        <p>
          {from} ✈️ {to} | {departure} → {returnDate} | {passengers} Passenger{Number(passengers) > 1 ? 's' : ''}
        </p>
      </motion.div>

      <motion.div
        className={styles.flightCard}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2>AsmaaOnAir Special</h2>
        <p><strong>From:</strong> {from}</p>
        <p><strong>To:</strong> {to}</p>
        <p><strong>Departure:</strong> {departure}</p>
        <p><strong>Return:</strong> {returnDate}</p>
        <p><strong>Passengers:</strong> {passengers}</p>
        <p><strong>Price:</strong> €129.99</p>
        <button className={styles.selectButton}>Select</button>
      </motion.div>
    </main>
  );
}
