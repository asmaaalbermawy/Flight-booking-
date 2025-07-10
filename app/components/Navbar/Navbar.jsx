'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Globe,
  User,
  Menu,
  Plane,
  Hotel,
  Car,
  Sun,
  Ticket,
  Users,
  Briefcase,
  Smartphone,
  Clock,
} from 'lucide-react';

import styles from './Navbar.module.scss';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  //const [userName, setUserName] = useState<string | null>(null);
  const [userName, setUserName] = useState(null);


  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) setUserName(storedName);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userName');
    window.location.href = '/'; // redirect to homepage
  };

  const menuItems = [
    { name: 'Flights', icon: <Plane size={16} />, href: '/flights' },
    { name: 'Hotels', icon: <Hotel size={16} />, href: '#' },
    { name: 'Car hire', icon: <Car size={16} />, href: '#' },
    { name: 'Holidays', icon: <Sun size={16} />, href: '#' },
    { name: 'Things to do', icon: <Ticket size={16} />, href: '#' },
    { name: 'Groups', icon: <Users size={16} />, href: '#' },
    { name: 'Business', icon: <Briefcase size={16} />, href: '#' },
    //{ name: 'My Bookings', icon: <Clock size={16} />, href: '/history' },
  ];

  return (
    <header className={styles.navbar}>
      <div className={styles.leftSection}>
        <Link href="/" className={styles.logoLink}>
          <Image
            src="/Asmaa.png"
            alt="AsmaaOnAir Logo"
            width={120}
            height={30}
            className={styles.logo}
          />
        </Link>

        <nav className={styles.menu}>
          {menuItems.map((item, idx) => (
            <Link href={item.href} key={idx} className={styles.menuItem}>
              <span className={styles.menuIcon}>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className={styles.rightSection}>
        <Globe size={20} />

        <div className={styles.userMenuWrapper}>
          <div
            className={styles.userIcon}
            onClick={() => setShowUserMenu((prev) => !prev)}
          >
            {userName ? <span>{userName}</span> : <User size={20} />}
          </div>

          {showUserMenu && (
            <div className={styles.userDropdown}>
              {!userName ? (
                <>
                  <Link href="/register" className={styles.dropdownItem}>
                    Register
                  </Link>
                  <Link href="/login" className={styles.dropdownItem}>
                    Login
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/dashboard" className={styles.dropdownItem}>
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} className={styles.dropdownItem}>
                    Logout
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        <Menu size={24} className={styles.mobileMenuIcon} />
      </div>
    </header>
  );
}
