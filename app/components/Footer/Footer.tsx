// File: components/Footer/Footer.tsx
'use client';

import styles from './Footer.module.scss';
import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.columns}>
        <div className={styles.column}>
          <h4>Company</h4>
          <ul>
            <li><Link href="#">About</Link></li>
            <li><Link href="#">Careers</Link></li>
            <li><Link href="#">Press Centre</Link></li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4>Help</h4>
          <ul>
            <li><Link href="#">Support</Link></li>
            <li><Link href="#">FAQs</Link></li>
            <li><Link href="#">Contact</Link></li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4>Extras</h4>
          <ul>
            <li><Link href="#">Gift Cards</Link></li>
            <li><Link href="#">Group Travel</Link></li>
            <li><Link href="#">Site Map</Link></li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4>Follow Us</h4>
          <div className={styles.socialIcons}>
            <a href="#"><Facebook size={20} /></a>
            <a href="#"><Twitter size={20} /></a>
            <a href="#"><Instagram size={20} /></a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} AsmaaOnAir. All rights reserved.</p>
      </div>
    </footer>
  );
}
