'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaCoffee,
  FaLeaf,
  FaUtensils,
  FaGlassCheers,
  FaPhone,
  FaEnvelope,
  FaCheckCircle,
  FaBuilding,
  FaStar,
} from 'react-icons/fa';
import CTASection from '@/components/CTASection';

export default function TheSpot() {
  const services = [
    {
      icon: <FaCoffee size={36} />,
      title: 'Breakfast Meetings & Workshops',
      desc: 'Start your day right with fresh, energizing breakfast options for your team.',
    },
    {
      icon: <FaLeaf size={36} />,
      title: 'Healthy Lunches & Salads',
      desc: 'Light, nourishing meals that keep everyone full, focused, and productive.',
    },
    {
      icon: <FaUtensils size={36} />,
      title: 'In-Room Coffee & Refreshments',
      desc: 'Keep your team fueled throughout the day with premium beverage service.',
    },
    {
      icon: <FaGlassCheers size={36} />,
      title: 'Happy Hours & Events',
      desc: 'Stunning charcuterie boards, grazing tables, and premium appetizers.',
    },
  ];

  const deliveryOptions = [
    'Drop-off catering',
    'Buffet-style setups',
    'Individually packaged meals',
    'Custom menu creation',
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section
        className="relative py-32 bg-crock-dark overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)' }}
      >
        <div className="absolute inset-0 bg-crock-dark/80"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-crock-orange/20 border border-crock-orange/40 text-crock-orange px-4 py-2 rounded-full mb-6">
                <FaBuilding /> Sister Company of The Crock Spot
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                The Spot Café
              </h1>
              <p className="text-xl text-crock-orange font-semibold mb-4">
                Your Trusted Corporate Catering Partner in Denver&apos;s RiNo District
              </p>
              <p className="text-lg text-crock-gray-light mb-8">
                Led by owner and Chef Mandy Smith, The Spot Café is the go-to choice for office catering in the Industry RiNo co-working spaces and surrounding Denver area.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="tel:925-699-6629">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-crock-orange text-white px-8 py-4 rounded-full font-semibold text-lg inline-flex items-center gap-2"
                  >
                    <FaPhone /> (925) 699-6629
                  </motion.button>
                </Link>
                <Link href="mailto:spotcafes@gmail.com">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/10 border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg inline-flex items-center gap-2"
                  >
                    <FaEnvelope /> Email Us
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <Image
                  src="/spot-cafe-logo.avif"
                  alt="The Spot Café Logo"
                  width={300}
                  height={300}
                  className="w-full max-w-[300px] h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xl text-crock-gray leading-relaxed mb-8">
              For years, we&apos;ve delivered fresh, flavorful meals that keep teams energized and productive. We specialize in <strong className="text-crock-dark">light, nourishing corporate catering</strong> designed to fuel your day.
            </p>
            <div className="inline-flex items-center gap-3 bg-crock-green/10 text-crock-green px-6 py-3 rounded-full font-semibold">
              <FaStar /> We KNOW what hits the Spot!
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-crock-gray-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-crock-dark mb-4">
              Our <span className="text-crock-orange">Services</span>
            </h2>
            <p className="text-xl text-crock-gray max-w-2xl mx-auto">
              From morning meetings to evening celebrations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-crock-orange mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-crock-dark mb-2">{service.title}</h3>
                <p className="text-crock-gray">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Options */}
      <section className="py-20 bg-crock-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Flexible <span className="text-crock-orange">Delivery Options</span>
              </h2>
              <p className="text-lg text-crock-gray-light mb-8">
                However you need it, we&apos;ll make it happen. Our focus is on food that&apos;s satisfying yet light — keeping everyone full, focused, and ready for whatever the workday brings.
              </p>
              <div className="space-y-4">
                {deliveryOptions.map((option, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <FaCheckCircle className="text-crock-green flex-shrink-0" />
                    <span className="text-lg">{option}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-crock-purple/30 p-8 rounded-2xl border border-crock-orange/20"
            >
              <h3 className="text-2xl font-bold mb-4 text-crock-orange">Happy Hours & Events</h3>
              <p className="text-lg text-crock-gray-light mb-6">
                We also shine at end-of-day office happy hours and events, creating:
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="text-crock-orange flex-shrink-0" />
                  <span>Stunning charcuterie boards</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="text-crock-orange flex-shrink-0" />
                  <span>Beautiful grazing tables</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="text-crock-orange flex-shrink-0" />
                  <span>Premium appetizers & small bites</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Custom Promise */}
      <section className="py-20 bg-gradient-to-b from-crock-orange/10 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-crock-dark mb-6">
              The Sky&apos;s the <span className="text-crock-orange">Limit</span>
            </h2>
            <p className="text-xl text-crock-gray mb-8">
              Tell us exactly what you need, and we&apos;ll make it happen with delicious, custom results every time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact / Owner Info */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-crock-dark rounded-2xl p-8 md:p-12 text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-2">Mandy Smith</h2>
            <p className="text-crock-orange text-xl font-semibold mb-6">Owner & Chef</p>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span className="bg-crock-green/20 text-crock-green px-4 py-2 rounded-full font-semibold">
                DBE
              </span>
              <span className="bg-crock-orange/20 text-crock-orange px-4 py-2 rounded-full font-semibold">
                MWBE
              </span>
              <span className="bg-crock-purple/20 text-crock-purple px-4 py-2 rounded-full font-semibold">
                SBE
              </span>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="tel:925-699-6629">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-crock-orange text-white px-8 py-4 rounded-full font-semibold text-lg inline-flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <FaPhone /> (925) 699-6629
                </motion.button>
              </Link>
              <Link href="mailto:spotcafes@gmail.com">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-crock-dark px-8 py-4 rounded-full font-semibold text-lg inline-flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <FaEnvelope /> spotcafes@gmail.com
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <CTASection
        title="Ready to Hit the Spot?"
        subtitle="Contact us today for your next corporate catering event."
        variant="orange"
      />
    </div>
  );
}
