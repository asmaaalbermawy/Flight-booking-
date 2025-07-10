'use client';

import styles from './NewsletterBanner.module.scss';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function NewsletterBanner() {
  return (
    <section className={styles.banner}>
      <motion.div
        className={styles.flyer}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <div className={styles.text}>
          <h2>✈️ Sign up & fly away with deals!</h2>
          <p>Get exclusive Asmaa-style discounts straight to your inbox.</p>
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
        <div className={styles.imageWrapper}>
          <Image
            src="/flyer-plane.jpg"
            alt="Flying plane"
            width={300}
            height={200}
            className={styles.image}
          />
        </div>
      </motion.div>
    </section>
  );
}
