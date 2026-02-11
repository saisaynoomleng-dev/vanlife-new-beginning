import UserNav from '@/components/UserNav';

export default function UserPageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="grid grid-cols-[auto_1fr]">
      <UserNav />
      {children}
    </div>
  );
}
