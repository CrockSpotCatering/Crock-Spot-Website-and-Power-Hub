import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Power Hub | The Crock Spot',
  description: 'CrockSpot Power Hub - Content Management System',
};

export default function PowerHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
