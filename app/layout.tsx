import type { Metadata, Viewport } from 'next';
import { Mulish } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const mulish = Mulish({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-muli',
});

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#2F2744',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://thecrockspot.com'),
  title: {
    default: 'The Crock Spot - Denver\'s Premier Food Truck Catering | Slow Cooked Gourmet Cuisine',
    template: '%s | The Crock Spot',
  },
  description:
    'Award-winning food truck catering in Denver. Voted Best Food Truck by 5280 Magazine. Customizable gourmet rice bowls, event catering, corporate events, and weddings. 15+ years of experience.',
  keywords: [
    'Denver catering',
    'food truck catering Denver',
    'corporate catering Denver',
    'wedding catering Denver',
    'gourmet rice bowls',
    'Crock Spot',
    'best food truck Denver',
    'event catering Colorado',
    'customizable catering',
    'slow cooked cuisine',
    'build your own bowl',
    'Denver food truck',
  ],
  authors: [
    { name: 'Steven & Mandy' },
    { name: 'The Crock Spot Team' },
  ],
  creator: 'The Crock Spot',
  publisher: 'The Crock Spot',
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
    siteName: 'The Crock Spot',
    title: 'The Crock Spot - Denver\'s Premier Food Truck Catering',
    description:
      'Award-winning food truck catering serving Denver since 2010. Customizable gourmet rice bowls, event catering, weddings, and corporate events.',
    images: [
      {
        url: '/images/hero-bowl.jpg',
        width: 1200,
        height: 630,
        alt: 'The Crock Spot - Delicious Gourmet Rice Bowls',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Crock Spot - Denver\'s Premier Food Truck Catering',
    description:
      'Award-winning food truck catering serving Denver since 2010. Customizable gourmet rice bowls for any event.',
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
    title: 'The Crock Spot',
  },
};

// Organization Schema
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'FoodEstablishment',
  name: 'The Crock Spot',
  url: 'https://thecrockspot.com',
  logo: 'https://thecrockspot.com/images/crock-spot-logo.png',
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

// Service Schema
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    {
      '@type': 'FoodService',
      position: 1,
      name: 'Food Truck Catering',
      description:
        'On-site food truck catering for events. Fresh, customizable rice bowls served directly from our gourmet food trucks.',
      provider: {
        '@type': 'Organization',
        name: 'The Crock Spot',
      },
      serviceType: 'Food Truck Catering',
    },
    {
      '@type': 'FoodService',
      position: 2,
      name: 'Buffet Style Catering',
      description:
        'Traditional buffet setup with our signature slow-cooked proteins, bases, sauces, and toppings.',
      provider: {
        '@type': 'Organization',
        name: 'The Crock Spot',
      },
      serviceType: 'Buffet Catering',
    },
    {
      '@type': 'FoodService',
      position: 3,
      name: 'Corporate Event Catering',
      description:
        'Quick-serve concept perfect for corporate events. Serve 100+ people per hour with customizable options.',
      provider: {
        '@type': 'Organization',
        name: 'The Crock Spot',
      },
      serviceType: 'Corporate Catering',
    },
    {
      '@type': 'FoodService',
      position: 4,
      name: 'Wedding Catering',
      description:
        'Design specialty bowls or themed bars for your special day. Memorable food experiences for you and your guests.',
      provider: {
        '@type': 'Organization',
        name: 'The Crock Spot',
      },
      serviceType: 'Wedding Catering',
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
      name: 'What makes The Crock Spot different from other caterers?',
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
  name: 'The Crock Spot',
  url: 'https://thecrockspot.com',
  description:
    'Award-winning food truck catering company in Denver. Slow cooked gourmet cuisine for events, weddings, and corporate catering.',
  publisher: {
    '@type': 'Organization',
    name: 'The Crock Spot',
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
      <body className={mulish.className}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
