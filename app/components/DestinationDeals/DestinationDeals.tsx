'use client';

import styles from './DestinationDeals.module.scss';
import Image from 'next/image';

const destinations = [
  {
    city: 'Barcelona',
    price: 'From €24.99',
    image: '/barcelona.jfif',
  },
  {
    city: 'Rome',
    price: 'From €29.99',
    image: '/rome.jfif',
  },
  {
    city: 'Paris',
    price: 'From €19.99',
    image: '/paris.jfif',
  },
];

export default function DestinationDeals() {
  return (
    <section className={styles.dealsSection}>
      <h2 className={styles.title}>Popular Destinations</h2>
      <div className={styles.grid}>
        {destinations.map((dest) => (
          <div key={dest.city} className={styles.card}>
            <Image src={dest.image} alt={dest.city} width={300} height={200} className={styles.image} />
            <div className={styles.details}>
              <h3>{dest.city}</h3>
              <p>{dest.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
