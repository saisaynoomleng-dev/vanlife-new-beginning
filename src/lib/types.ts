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
