'use client';

import Link from 'next/link';
import { FaFacebook, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-crock-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              <span className="text-white">CROCK</span>
              <span className="text-crock-orange" style={{ fontStyle: 'italic' }}>Spot</span>
            </h3>
            <p className="text-crock-gray-light text-sm">
              Slow Cooked Gourmet Cuisine. Award-winning food truck catering serving Denver since 2010.
            </p>
            <p className="text-crock-orange font-semibold text-sm italic">
              &quot;Let Us Crock Your World&quot;
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-crock-orange">Quick Links</h4>
            <ul className="space-y-1">
              <li>
                <Link href="/" className="text-crock-gray-light hover:text-crock-orange transition-colors block py-2 min-h-[44px] flex items-center">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/catering" className="text-crock-gray-light hover:text-crock-orange transition-colors block py-2 min-h-[44px] flex items-center">
                  Catering
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-crock-gray-light hover:text-crock-orange transition-colors block py-2 min-h-[44px] flex items-center">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/menus" className="text-crock-gray-light hover:text-crock-orange transition-colors block py-2 min-h-[44px] flex items-center">
                  Menus
                </Link>
              </li>
              <li>
                <Link href="/government-capabilities" className="text-crock-gray-light hover:text-crock-orange transition-colors block py-2 min-h-[44px] flex items-center">
                  Government
                </Link>
              </li>
              <li>
                <Link href="/community-partners" className="text-crock-gray-light hover:text-crock-orange transition-colors block py-2 min-h-[44px] flex items-center">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-crock-orange">Services</h4>
            <ul className="space-y-2 text-crock-gray-light text-sm">
              <li>Food Truck Catering</li>
              <li>Buffet Style Service</li>
              <li>Corporate Events</li>
              <li>Wedding Catering</li>
              <li>Private Parties</li>
              <li>Themed Food Bars</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-crock-orange">Connect With Us</h4>
            <div className="space-y-2">
              <a
                href="mailto:steven@thecrockspot.com"
                className="flex items-center space-x-2 text-crock-gray-light hover:text-crock-orange transition-colors py-2 min-h-[44px]"
              >
                <FaEnvelope className="flex-shrink-0" />
                <span className="text-sm sm:text-base break-all">steven@thecrockspot.com</span>
              </a>
              <div className="flex items-center space-x-2 text-crock-gray-light py-2">
                <FaMapMarkerAlt className="flex-shrink-0" />
                <span>Denver, Colorado</span>
              </div>
              {/* Social links with Google-recommended 48px touch targets */}
              <div className="flex space-x-2 mt-4">
                <a
                  href="https://www.facebook.com/104226646277525"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-crock-gray-light hover:text-crock-orange transition-colors p-3 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full hover:bg-white/10"
                  aria-label="Visit our Facebook page"
                >
                  <FaFacebook size={24} />
                </a>
                <a
                  href="https://www.instagram.com/thecrockspot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-crock-gray-light hover:text-crock-orange transition-colors p-3 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full hover:bg-white/10"
                  aria-label="Visit our Instagram page"
                >
                  <FaInstagram size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Awards Banner */}
        <div className="border-t border-crock-orange/30 mt-8 pt-8">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-crock-gray-light mb-6">
            <span className="bg-crock-orange/20 px-3 py-1 rounded-full">🏆 Best Food Truck - 5280 Magazine</span>
            <span className="bg-crock-orange/20 px-3 py-1 rounded-full">🏆 Best Meals on Wheels - Westword</span>
            <span className="bg-crock-orange/20 px-3 py-1 rounded-full">🏆 50 Coolest Small Businesses - Business Insider</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-crock-gray/30 mt-4 pt-6 text-center text-crock-gray-light text-sm safe-bottom">
          <p>&copy; {currentYear} The Crock Spot. All rights reserved.</p>
          <p className="mt-2">
            Founded by Steven & Mandy | Serving Denver Since 2010
          </p>
          {/* Legal links with adequate touch targets */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Link
              href="/privacy"
              className="hover:text-crock-orange transition-colors px-4 py-2 min-h-[44px] flex items-center"
            >
              Privacy Policy
            </Link>
            <span className="hidden sm:inline py-2">•</span>
            <Link
              href="/terms"
              className="hover:text-crock-orange transition-colors px-4 py-2 min-h-[44px] flex items-center"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
