'use client';

import SearchSection from '../components/SearchSection/SearchSection';
import Footer from '../components/Footer/Footer';
import styles from './Flights.module.scss';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function FlightsPage() {
  return (
    <main className={styles.flightsPage}>
      {/* Hero Motion Banner */}
      <motion.div
        className={styles.heroCard}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Image
          className={styles.heroImage}
          src="https://media.istockphoto.com/id/1145289888/photo/aircraft-approach-before-landing-with-landing-gear.jpg?s=612x612&w=0&k=20&c=r20q-vEtjfJakusPPHI9mB6MOPFHi4riWAGN-G1QlG0="
          alt="Flight background"
          fill
          priority
        />
        <div className={styles.heroOverlay}>
          <h1>Welcome to AsmaaOnAir Flights</h1>
        </div>
      </motion.div>

      <SearchSection />

      <section className={styles.results}>
        <h2>Available Flights</h2>
        <div className={styles.flightList}>
          {[1, 2, 3].map((_, idx) => (
            <div key={idx} className={styles.flightCard}>
              <div className={styles.details}>
                <p><strong>From:</strong> Cairo</p>
                <p><strong>To:</strong> Rome</p>
                <p><strong>Date:</strong> 2025-07-01</p>
              </div>
              <div className={styles.price}>€59.99</div>
              <Link href="/book">
                <button className={styles.bookBtn}>Book Now</button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
