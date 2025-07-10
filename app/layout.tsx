import './globals.css';
import Navbar from './components/Navbar/Navbar';

export const metadata = {
  title: 'AsmaaOnAir',
  description: 'A Ryanair-inspired travel booking UI',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        <Navbar />
        <main className="pt-[120px]">{children}</main>
      </body>
    </html>
  );
}
