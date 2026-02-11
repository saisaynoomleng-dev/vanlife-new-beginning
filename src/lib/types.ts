import { ALL_VANS_QUERYResult } from '@/sanity/types';

// Bounded props
export type BoundedProps = {
  as?: React.ElementType;
  className?: string;
  isPadded?: boolean;
  children: React.ReactNode;
};

// CTA Props
export type CTAProps = {
  children: React.ReactNode;
  href: string;
  className?: string;
};

// Newsletter Form Props
export type NewsletterFormStateProps = {
  status: string;
  message: string;
};

// Contact Us Form Props
export type ContactUsFormStateProps = {
  status: string;
  message: string;
  field?: string;
};

export type EditUserProfileProps = {
  status: string;
  message: string;
  field?: string;
};

export type EditUserAddressProps = {
  status: string;
  message: string;
  field?: string;
};

// Van Type Props
export type VanTypeProps = {
  className?: string;
  children: React.ReactNode;
  type: 'simple' | 'rugged' | 'luxury';
};

export type VanCardProps = NonNullable<ALL_VANS_QUERYResult['vans'][number]> & {
  className?: string;
};
