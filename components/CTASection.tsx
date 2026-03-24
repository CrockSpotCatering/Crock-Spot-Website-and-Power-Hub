'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowRight, FaPhone } from 'react-icons/fa';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  variant?: 'orange' | 'dark' | 'purple';
}

const CTASection = ({
  title = "Ready to Crock Your Event?",
  subtitle = "Let us bring our award-winning cuisine to your next event. From corporate lunches to dream weddings, we've got you covered.",
  buttonText = "Get Your Free Custom Quote",
  buttonLink = "/contact",
  variant = 'orange',
}: CTASectionProps) => {
  const variantStyles = {
    orange: 'bg-gradient-to-r from-crock-orange to-crock-orange-light',
    dark: 'bg-gradient-to-r from-crock-dark to-crock-purple',
    purple: 'bg-gradient-to-r from-crock-purple to-crock-purple-light',
  };

  const buttonVariants = {
    orange: 'bg-white text-crock-orange hover:bg-crock-dark hover:text-white',
    dark: 'bg-crock-orange text-white hover:bg-white hover:text-crock-dark',
    purple: 'bg-crock-orange text-white hover:bg-white hover:text-crock-purple',
  };

  return (
    <section className={`py-16 md:py-20 ${variantStyles[variant]} relative overflow-hidden`}>
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 sm:px-0">
            <Link href={buttonLink} className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full sm:w-auto ${buttonVariants[variant]} px-8 sm:px-10 py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 inline-flex items-center justify-center gap-2 min-h-[56px]`}
              >
                <FaPhone /> {buttonText} <FaArrowRight />
              </motion.button>
            </Link>
          </div>
          <p className="text-white/70 text-sm mt-6">
            Serving Denver Metro, Front Range & Mountain Regions
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
