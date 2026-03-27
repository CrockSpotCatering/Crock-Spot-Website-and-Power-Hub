import type { Metadata, Viewport } from 'next';
import { Mulish, Pacifico } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const mulish = Mulish({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-muli',
});

// Script font for The Spot Café button - matches café logo aesthetic
const pacifico = Pacifico({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pacifico',
});

// Viewport configuration - Google Mobile Optimization Standards 2025
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#2F2744',
  viewportFit: 'cover', // Support for notched devices
  interactiveWidget: 'resizes-content', // Prevents layout shift when keyboard appears
};

export const metadata: Metadata = {
  metadataBase: new URL('https://thecrockspot.com'),
  title: {
    default: 'Crock Spot - Denver\'s Premier Event Caterer | Corporate Catering & Weddings',
    template: '%s | Crock Spot',
  },
  description:
    'Denver\'s award-winning event caterer for corporate events, weddings, and private gatherings. Customizable gourmet rice bowls, buffet service, and food truck catering. 15+ years serving Colorado.',
  keywords: [
    'Denver catering',
    'corporate catering Denver',
    'event catering Denver',
    'wedding catering Denver',
    'buffet catering Colorado',
    'gourmet rice bowls',
    'Crock Spot',
    'corporate event food',
    'Denver caterer',
    'customizable catering menus',
    'professional catering service',
    'Colorado event catering',
  ],
  authors: [
    { name: 'Steven & Mandy' },
    { name: 'Crock Spot Team' },
  ],
  creator: 'Crock Spot',
  publisher: 'Crock Spot',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://thecrockspot.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://thecrockspot.com',
    siteName: 'Crock Spot',
    title: 'Crock Spot - Denver\'s Premier Event Caterer',
    description:
      'Award-winning catering for corporate events, weddings, and private gatherings. Customizable gourmet rice bowls and buffet service. Serving Colorado since 2010.',
    images: [
      {
        url: '/images/hero-bowl.jpg',
        width: 1200,
        height: 630,
        alt: 'Crock Spot - Award-Winning Event Catering',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crock Spot - Denver\'s Premier Event Caterer',
    description:
      'Award-winning catering for corporate events, weddings, and private gatherings. Customizable gourmet cuisine.',
    images: ['/images/hero-bowl.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Crock Spot',
  },
};

// Organization Schema
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'FoodEstablishment',
  name: 'Crock Spot',
  url: 'https://thecrockspot.com',
  logo: 'https://thecrockspot.com/images/crock-spot-logo-new.png',
  description:
    'Award-winning food truck catering company in Denver serving slow-cooked gourmet cuisine since 2010.',
  foundingDate: '2010',
  founders: [
    {
      '@type': 'Person',
      name: 'Steven',
      jobTitle: 'Co-Founder',
    },
    {
      '@type': 'Person',
      name: 'Mandy',
      jobTitle: 'Co-Founder',
    },
  ],
  sameAs: [
    'https://www.facebook.com/104226646277525',
    'https://www.instagram.com/thecrockspot',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'steven@thecrockspot.com',
    url: 'https://thecrockspot.com/contact',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Denver',
    addressRegion: 'CO',
    addressCountry: 'US',
  },
  areaServed: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 39.7392,
      longitude: -104.9903,
    },
    geoRadius: '100 mi',
  },
  servesCuisine: ['New American', 'Bowls', 'Gourmet', 'International'],
  priceRange: '$$',
  award: [
    'Best Food Truck in Denver - 5280 Magazine',
    'Best Meals on Wheels - Westword Magazine',
    '50 Coolest Small Businesses in America - Business Insider',
  ],
};

// Service Schema - Corporate catering focus
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    {
      '@type': 'FoodService',
      position: 1,
      name: 'Corporate Catering',
      description:
        'Professional catering for corporate events, team lunches, and business gatherings. Serve 100+ guests per hour with customizable menus.',
      provider: {
        '@type': 'Organization',
        name: 'Crock Spot',
      },
      serviceType: 'Corporate Catering',
    },
    {
      '@type': 'FoodService',
      position: 2,
      name: 'Buffet Style Service',
      description:
        'Elegant buffet presentations with signature slow-cooked proteins, bases, sauces, and toppings. Perfect for weddings and formal occasions.',
      provider: {
        '@type': 'Organization',
        name: 'Crock Spot',
      },
      serviceType: 'Buffet Catering',
    },
    {
      '@type': 'FoodService',
      position: 3,
      name: 'Wedding Catering',
      description:
        'Design specialty bowls or themed bars for your special day. Memorable food experiences for you and your guests.',
      provider: {
        '@type': 'Organization',
        name: 'Crock Spot',
      },
      serviceType: 'Wedding Catering',
    },
    {
      '@type': 'FoodService',
      position: 4,
      name: 'Food Truck Option',
      description:
        'On-site food truck catering for outdoor events and festivals. Fresh, customizable rice bowls served directly from our mobile kitchen.',
      provider: {
        '@type': 'Organization',
        name: 'Crock Spot',
      },
      serviceType: 'Food Truck Catering',
    },
  ],
};

// FAQ Schema
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What makes Crock Spot different from other caterers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our food truck advantage means your food is cooked fresh on-site and never has to be bagged, boxed, or reheated. Plus, our quick-serve concept means guests are served in 25 seconds or less!',
      },
    },
    {
      '@type': 'Question',
      name: 'What areas do you serve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We serve the entire Denver Metro area, Front Range, and mountain regions of Colorado.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you accommodate dietary restrictions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely! We offer extensive gluten-free, vegetarian, and vegan options. Our build-your-own bowl concept allows guests to customize their meal to their dietary needs.',
      },
    },
    {
      '@type': 'Question',
      name: 'How far in advance should I book?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We recommend booking at least 2-4 weeks in advance for corporate events and 3-6 months for weddings. However, we can sometimes accommodate last-minute requests!',
      },
    },
  ],
};

// WebSite Schema
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Crock Spot',
  url: 'https://thecrockspot.com',
  description:
    'Award-winning food truck catering company in Denver. Slow cooked gourmet cuisine for events, weddings, and corporate catering.',
  publisher: {
    '@type': 'Organization',
    name: 'Crock Spot',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="format-detection" content="telephone=no" />
        <link rel="canonical" href="https://thecrockspot.com" />
        <link rel="icon" href="/favicon.ico" />

        {/* Preconnect hints for better Core Web Vitals (LCP improvement) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />

        {/* Mobile app manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Organization Schema */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        {/* Service Schema */}
        <Script
          id="service-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema),
          }}
        />

        {/* FAQ Schema */}
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />

        {/* WebSite Schema */}
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className={`${mulish.className} ${pacifico.variable}`}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
