import type { Metadata } from 'next';
import './power-hub.css';

export const metadata: Metadata = {
  title: 'Power Hub | The Crock Spot',
  description: 'CrockSpot Power Hub - Content Management System',
  robots: {
    index: false,
    follow: false,
  },
};

export default function PowerHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="power-hub-wrapper min-h-screen">
      {children}
    </div>
  );
}
