// File: components/PartnersExtras/PartnersExtras.tsx
'use client';

import styles from './PartnersExtras.module.scss';

const items = [
  {
    label: 'Car hire',
    image: '/car.jfif',
  },
  {
    label: 'Hotels',
    image: '/hotel.jfif',
  },
  {
    label: 'Activities',
    image: '/activities.jfif',
  },
  {
    label: 'Insurance',
    image: '/insurance.jfif',
  },
  {
    label: 'Gift Vouchers',
    image: '/gift.png',
  },
];

export default function PartnersExtras() {
  return (
    <section className={styles.partnersExtras}>
      <h2 className={styles.heading}>Our Partners & Extras</h2>
      <div className={styles.grid}>
        {items.map((item, idx) => (
          <div
            key={idx}
            className={styles.card}
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
