import Link from 'next/link';
import NewsletterFormTable from './NewsletterFormTable';

const PAGES_LINKS = [
  { name: 'Home', url: '/' },
  { name: 'About', url: '/about' },
  { name: 'Vans', url: '/vans' },
  { name: 'Contact Us', url: '/contact-us' },
];

const UTILITY_LINKS = [
  { name: 'Privacy Policy', url: '/privacy-policy' },
  { name: 'Acessibility Accessment', url: '/accessibility-accessment' },
  { name: 'Terms & Conditions', url: '/terms-and-conditions' },
  { name: 'Late Fee Policy', url: '/late-fee-policy' },
  { name: 'Cancellation Policy', url: '/cancellation-policy' },
];

const Footer = () => {
  return (
    <footer className="p-10 bg-brand-black-100 text-brand-white grid md:grid-cols-3 gap-y-5">
      <div className="flex flex-col gap-y-3">
        <p className="font-semibold">Useful Links</p>
        <ul className="flex flex-col gap-y-1">
          {PAGES_LINKS.map((link) => (
            <Link href={link.url} key={link.url} className="hover:underline">
              {link.name}
            </Link>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-y-3">
        <p className="font-semibold">Utility Pages</p>
        <ul className="flex flex-col gap-y-1">
          {UTILITY_LINKS.map((link) => (
            <Link href={link.url} key={link.url} className="hover:underline">
              {link.name}
            </Link>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-y-3">
        <p className="font-semibold">Subscribe for Updates</p>
        <NewsletterFormTable />
      </div>

      <div className="col-span-full flex justify-between italic text-fs-300">
        <p>copyright&copy;{new Date().getFullYear()} Vanlife</p>
        <p>Designed and developed by Sai Say Noom Leng</p>
      </div>
    </footer>
  );
};

export default Footer;
