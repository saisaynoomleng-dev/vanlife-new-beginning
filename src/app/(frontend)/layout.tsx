import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function FrontendLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
}
