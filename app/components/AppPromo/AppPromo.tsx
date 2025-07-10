// File: components/AppPromo/AppPromo.tsx
'use client';

import styles from './AppPromo.module.scss';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AppPromo() {
  return (
    <section className={styles.appPromo}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <div className={styles.textArea}>
          <h2>Download Our App</h2>
          <p>Book flights, manage trips, and enjoy faster check-ins right from your mobile device.</p>
          <div className={styles.stores}>
            <Image src="/app store.png" alt="App Store" width={130} height={40} />
            <Image src="/google play.png" alt="Google Play" width={130} height={40} />
          </div>
        </div>

        <div className={styles.imageArea}>
          <Image
            src="/app_preview.png"
            alt="App preview"
            width={300}
            height={500}
            className={styles.phoneImage}
          />
        </div>
      </motion.div>
    </section>
  );
}
