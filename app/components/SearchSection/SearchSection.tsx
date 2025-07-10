// File: components/SearchSection/SearchSection.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SearchSection.module.scss';
import { Plane, Hotel, Car } from 'lucide-react';

export default function SearchSection() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Flights');

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departure, setDeparture] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);

  const tabs = [
    { name: 'Flights', icon: <Plane size={16} /> },
    { name: 'Hotels', icon: <Hotel size={16} /> },
    { name: 'Car hire', icon: <Car size={16} /> },
  ];

  const handleSearch = () => {
    if (!from || !to || !departure) return;

    const query = new URLSearchParams({
      from,
      to,
      departure,
      return: returnDate,
      passengers: passengers.toString(),
    }).toString();

    router.push(`/flights/results?${query}`);
  };

  return (
    <section className={styles.searchSection}>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`${styles.tabButton} ${activeTab === tab.name ? styles.active : ''}`}
            onClick={() => setActiveTab(tab.name)}
          >
            <span className={styles.icon}>{tab.icon}</span>
            {tab.name}
          </button>
        ))}
      </div>

      <div className={styles.searchBox}>
        <input
          className={styles.input}
          type="text"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <input
          className={styles.input}
          type="text"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <input
          className={styles.input}
          type="date"
          placeholder="Departure"
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
        />
        <input
          className={styles.input}
          type="date"
          placeholder="Return"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
        />
        <input
          className={styles.input}
          type="number"
          min="1"
          placeholder="Passengers"
          value={passengers?.toString() ?? ''}
          onChange={(e) => setPassengers(Number(e.target.value))}
        />
        <button className={styles.searchButton} onClick={handleSearch}>
          Search
        </button>
      </div>
    </section>
  );
}
