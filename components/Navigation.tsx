'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaPhone } from 'react-icons/fa';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Catering', href: '/catering' },
    { name: 'About', href: '/about' },
    { name: 'Menus', href: '/menus' },
    { name: 'Government', href: '/government-capabilities' },
    { name: 'Community', href: '/community-partners' },
    { name: 'Contact', href: '/contact' },
  ];

  // The Spot Café - separate styling for sister company
  const theSpotLink = { name: 'The Spot Café', href: '/the-spot' };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-crock-dark/95 backdrop-blur-md shadow-lg'
          : 'bg-crock-dark/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center"
            onClick={handleClose}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Image
                src="/images/crock-spot-logo-white.png"
                alt="The Crock Spot"
                width={150}
                height={50}
                className="h-10 sm:h-12 w-auto"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className={`text-white hover:text-crock-orange transition-colors duration-300 font-medium ${
                    pathname === link.href ? 'text-crock-orange' : ''
                  }`}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            {/* The Spot Café - Sister Company with distinct branding */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.1 }}
            >
              <Link
                href={theSpotLink.href}
                className="px-4 py-1.5 rounded-full bg-crock-green text-white hover:bg-crock-green-dark transition-all duration-300 font-semibold text-sm"
              >
                {theSpotLink.name}
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (navLinks.length + 1) * 0.1 }}
            >
              <Link
                href="/contact"
                className="bg-crock-orange text-white px-6 py-2 rounded-full hover:bg-crock-orange-dark transition-all duration-300 font-semibold inline-flex items-center gap-2"
              >
                <FaPhone className="text-sm" /> Get a Custom Quote
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={handleToggle}
            className="lg:hidden text-white text-2xl p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation active:scale-95 transition-transform"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            type="button"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, maxHeight: 0 }}
            animate={{
              opacity: 1,
              maxHeight: '100vh',
              transition: {
                opacity: { duration: 0.2 },
                maxHeight: { duration: 0.3, ease: 'easeInOut' },
              },
            }}
            exit={{
              opacity: 0,
              maxHeight: 0,
              transition: {
                opacity: { duration: 0.2 },
                maxHeight: { duration: 0.2, ease: 'easeInOut' },
              },
            }}
            className="lg:hidden bg-crock-dark/98 backdrop-blur-md overflow-hidden"
          >
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={handleClose}
                  className={`block text-white hover:text-crock-orange transition-colors duration-300 py-3 px-4 rounded-lg hover:bg-white/10 text-lg font-medium touch-manipulation active:bg-white/20 ${
                    pathname === link.href ? 'text-crock-orange bg-white/5' : ''
                  }`}
                  aria-label={`Navigate to ${link.name}`}
                >
                  {link.name}
                </Link>
              ))}
              {/* The Spot Café - Sister Company with distinct branding */}
              <Link
                href={theSpotLink.href}
                onClick={handleClose}
                className="block bg-crock-green text-white hover:bg-crock-green-dark transition-colors duration-300 py-3 px-4 rounded-lg text-lg font-semibold touch-manipulation active:bg-crock-green/80 mt-2"
                aria-label="Navigate to The Spot Café"
              >
                {theSpotLink.name}
              </Link>
              <Link
                href="/contact"
                onClick={handleClose}
                className="block bg-crock-orange text-white px-6 py-4 rounded-full hover:bg-crock-orange-dark transition-all duration-300 font-semibold text-center mt-4 text-lg touch-manipulation active:scale-95"
                aria-label="Get a quote"
              >
                <FaPhone className="inline mr-2" /> Get a Custom Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
