'use client';
import styles from './AppPromo.module.scss'; // ✅ importing styles, not JSON


import SearchSection from './components/SearchSection/SearchSection';
import DestinationDeals from './components/DestinationDeals/DestinationDeals';
import NewsletterBanner from './components/NewsletterBanner/NewsletterBanner';
import PartnersExtras from './components/PartnersExtras/PartnersExtras';
import AppPromo from './components/AppPromo/AppPromo';
import Footer from './components/Footer/Footer';


export default function HomePage() {
  return (
    <main>
      <SearchSection />
      <DestinationDeals />
      <NewsletterBanner />
      < PartnersExtras/>
      <AppPromo />
      <Footer />

    </main>
  );
}
