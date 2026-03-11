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
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-crock-gray-light hover:text-crock-orange transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/catering" className="text-crock-gray-light hover:text-crock-orange transition-colors">
                  Catering
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-crock-gray-light hover:text-crock-orange transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/menus" className="text-crock-gray-light hover:text-crock-orange transition-colors">
                  Menus
                </Link>
              </li>
              <li>
                <Link href="/government-capabilities" className="text-crock-gray-light hover:text-crock-orange transition-colors">
                  Government Capabilities
                </Link>
              </li>
              <li>
                <Link href="/community-partners" className="text-crock-gray-light hover:text-crock-orange transition-colors">
                  Community Partners
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
            <div className="space-y-3">
              <a
                href="mailto:steven@thecrockspot.com"
                className="flex items-center space-x-2 text-crock-gray-light hover:text-crock-orange transition-colors"
              >
                <FaEnvelope />
                <span>steven@thecrockspot.com</span>
              </a>
              <div className="flex items-center space-x-2 text-crock-gray-light">
                <FaMapMarkerAlt />
                <span>Denver, Colorado</span>
              </div>
              <div className="flex space-x-4 mt-4">
                <a
                  href="https://www.facebook.com/104226646277525"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-crock-gray-light hover:text-crock-orange transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebook size={24} />
                </a>
                <a
                  href="https://www.instagram.com/thecrockspot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-crock-gray-light hover:text-crock-orange transition-colors"
                  aria-label="Instagram"
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
        <div className="border-t border-crock-gray/30 mt-4 pt-6 text-center text-crock-gray-light text-sm">
          <p>&copy; {currentYear} The Crock Spot. All rights reserved.</p>
          <p className="mt-2">
            Founded by Steven & Mandy | Serving Denver Since 2010
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <Link href="/privacy" className="hover:text-crock-orange transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-crock-orange transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
