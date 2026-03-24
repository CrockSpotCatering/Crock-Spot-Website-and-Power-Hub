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

// Import content from JSON - editable via Power Hub CMS
import content from '@/content/the-spot.json';

// Icon mapping for services
const serviceIcons: Record<string, React.ReactNode> = {
  'coffee': <FaCoffee size={36} />,
  'leaf': <FaLeaf size={36} />,
  'utensils': <FaUtensils size={36} />,
  'glass-cheers': <FaGlassCheers size={36} />,
};

export default function TheSpot() {
  const { hero, intro, services, deliveryOptions, happyHour, customPromise, owner, cta } = content;

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section
        className="relative py-32 bg-crock-dark overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${hero.backgroundImage})` }}
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
                <FaBuilding /> {hero.badge}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {hero.title}
              </h1>
              <p className="text-xl text-crock-orange font-semibold mb-4">
                {hero.tagline}
              </p>
              <p className="text-lg text-crock-gray-light mb-8">
                {hero.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href={`tel:${hero.phone.replace(/[^0-9]/g, '')}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-crock-orange text-white px-8 py-4 rounded-full font-semibold text-lg inline-flex items-center gap-2"
                  >
                    <FaPhone /> {hero.phone}
                  </motion.button>
                </Link>
                <a href={`mailto:${hero.email}`} target="_blank" rel="noopener noreferrer">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/10 border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg inline-flex items-center gap-2"
                  >
                    <FaEnvelope /> Email Us
                  </motion.button>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <Image
                src={hero.logo}
                alt="The Spot Café Logo"
                width={350}
                height={350}
                className="w-full max-w-[350px] h-auto drop-shadow-2xl"
              />
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
              {intro.text}
            </p>
            <div className="inline-flex items-center gap-3 bg-crock-green/10 text-crock-green px-6 py-3 rounded-full font-semibold">
              <FaStar /> {intro.tagline}
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
                <div className="text-crock-orange mb-4">
                  {serviceIcons[service.icon] || <FaUtensils size={36} />}
                </div>
                <h3 className="text-xl font-bold text-crock-dark mb-2">{service.title}</h3>
                <p className="text-crock-gray">{service.description}</p>
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
                {deliveryOptions.title.split(' ').slice(0, 1).join(' ')} <span className="text-crock-orange">{deliveryOptions.title.split(' ').slice(1).join(' ')}</span>
              </h2>
              <p className="text-lg text-crock-gray-light mb-8">
                {deliveryOptions.description}
              </p>
              <div className="space-y-4">
                {deliveryOptions.options.map((option, index) => (
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
              <h3 className="text-2xl font-bold mb-4 text-crock-orange">{happyHour.title}</h3>
              <p className="text-lg text-crock-gray-light mb-6">
                {happyHour.description}
              </p>
              <ul className="space-y-3">
                {happyHour.items.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <FaCheckCircle className="text-crock-orange flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
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
              {customPromise.title.replace("Limit", "")} <span className="text-crock-orange">Limit</span>
            </h2>
            <p className="text-xl text-crock-gray mb-8">
              {customPromise.description}
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
            <h2 className="text-3xl font-bold text-white mb-2">{owner.name}</h2>
            <p className="text-crock-orange text-xl font-semibold mb-6">{owner.title}</p>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {owner.certifications.map((cert, index) => (
                <span
                  key={index}
                  className={`px-4 py-2 rounded-full font-semibold ${
                    index === 0 ? 'bg-crock-green/20 text-crock-green' :
                    index === 1 ? 'bg-crock-orange/20 text-crock-orange' :
                    'bg-crock-purple/20 text-crock-purple'
                  }`}
                >
                  {cert}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href={`tel:${owner.phone.replace(/[^0-9]/g, '')}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-crock-orange text-white px-8 py-4 rounded-full font-semibold text-lg inline-flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <FaPhone /> {owner.phone}
                </motion.button>
              </Link>
              <a href={`mailto:${owner.email}`} target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-crock-dark px-8 py-4 rounded-full font-semibold text-lg inline-flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <FaEnvelope /> {owner.email}
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <CTASection
        title={cta.title}
        subtitle={cta.subtitle}
        variant="orange"
      />
    </div>
  );
}
