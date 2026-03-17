'use client';

import Link from 'next/link';
import { FaFacebook, FaInstagram, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

// Import content from JSON - editable via Power Hub CMS
import content from '@/content/footer.json';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { company, quickLinks, services, contact, social, awards, copyright, legalLinks } = content;

  return (
    <footer className="bg-crock-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="space-y-4 col-span-2 md:col-span-1">
            <h3 className="text-xl sm:text-2xl font-bold">
              <span className="text-white">{company.name}</span>
              <span className="text-crock-orange" style={{ fontStyle: 'italic' }}>{company.nameSuffix}</span>
            </h3>
            <p className="text-crock-gray-light text-xs sm:text-sm">
              {company.description}
            </p>
            <p className="text-crock-orange font-semibold text-xs sm:text-sm italic">
              &quot;{company.tagline}&quot;
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-crock-orange">Quick Links</h4>
            <ul className="space-y-1">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-crock-gray-light hover:text-crock-orange transition-colors block py-2 min-h-[44px] flex items-center">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-crock-orange">Services</h4>
            <ul className="space-y-2 text-crock-gray-light text-sm">
              {services.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-base sm:text-lg font-semibold mb-4 text-crock-orange">Connect With Us</h4>
            <div className="space-y-2">
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center space-x-2 text-crock-gray-light hover:text-crock-orange transition-colors py-2 min-h-[44px]"
              >
                <FaEnvelope className="flex-shrink-0" />
                <span className="text-sm sm:text-base break-all">{contact.email}</span>
              </a>
              <div className="flex items-center space-x-2 text-crock-gray-light py-2">
                <FaMapMarkerAlt className="flex-shrink-0" />
                <span>{contact.location}</span>
              </div>
              {/* Social links with Google-recommended 48px touch targets */}
              <div className="flex space-x-2 mt-4">
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-crock-gray-light hover:text-crock-orange transition-colors p-3 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full hover:bg-white/10"
                  aria-label="Visit our Facebook page"
                >
                  <FaFacebook size={24} />
                </a>
                <a
                  href={social.instagram}
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
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-crock-gray-light mb-6">
            {awards.map((award, index) => (
              <span key={index} className="bg-crock-orange/20 px-2 sm:px-3 py-1.5 rounded-full text-center">
                🏆 {award}
              </span>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-crock-gray/30 mt-4 pt-6 text-center text-crock-gray-light text-sm safe-bottom">
          <p>&copy; {currentYear} The Crock Spot. All rights reserved.</p>
          <p className="mt-2">
            {copyright.foundersText}
          </p>
          {/* Legal links with adequate touch targets */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {legalLinks.map((link, index) => (
              <span key={index} className="flex items-center">
                <Link
                  href={link.href}
                  className="hover:text-crock-orange transition-colors px-4 py-2 min-h-[44px] flex items-center"
                >
                  {link.name}
                </Link>
                {index < legalLinks.length - 1 && (
                  <span className="hidden sm:inline py-2">•</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
