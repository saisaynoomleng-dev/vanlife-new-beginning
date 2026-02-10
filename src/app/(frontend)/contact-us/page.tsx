import Bounded from '@/components/Bounded';
import ContactForm from '@/components/ContactForm';
import Mapbox from '@/components/Mapbox';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    "Have questions about a booking or listing a van? Get in touch with our support team. We're here to help you get on the road.",
};

const ContactPage = () => {
  return (
    <Bounded isPadded className="grid md:grid-cols-2 gap-x-5">
      <div>
        <Image
          src="/contact.jpg"
          alt=""
          width={800}
          height={800}
          className="object-cover rounded-sm min-w-full"
        />
      </div>

      <ContactForm />

      <div className="col-span-full overflow-hidden">
        <Mapbox />
      </div>
    </Bounded>
  );
};

export default ContactPage;
