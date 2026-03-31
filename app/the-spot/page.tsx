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
  FaBox,
  FaHamburger,
  FaConciergeBell,
  FaWineGlass,
  FaGift,
  FaArrowRight,
  FaCertificate,
} from 'react-icons/fa';

// Import content from JSON - editable via Power Hub CMS
import content from '@/content/the-spot.json';

// The Spot Cafe Brand Colors
const spotNavy = '#1B3A5F';
const spotCoral = '#E8704A';
const spotLightBg = '#F8F6F3';

// Icon mapping for services
const serviceIcons: Record<string, React.ReactNode> = {
  'coffee': <FaCoffee size={36} />,
  'leaf': <FaLeaf size={36} />,
  'utensils': <FaUtensils size={36} />,
  'glass-cheers': <FaGlassCheers size={36} />,
};

// Icon mapping for catering packages
const packageIcons: Record<string, React.ReactNode> = {
  'board': <FaConciergeBell size={32} />,
  'burrito': <FaHamburger size={32} />,
  'package': <FaBox size={32} />,
  'buffet': <FaUtensils size={32} />,
  'party': <FaGift size={32} />,
  'wine': <FaWineGlass size={32} />,
};

export default function TheSpot() {
  const { hero, intro, services, cateringPackagesSection, cateringPackages, deliveryOptions, happyHour, customPromise, certification, owner, cta } = content;

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section
        className="relative py-32 overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${hero.backgroundImage})`, backgroundColor: spotNavy }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: spotNavy, opacity: 0.85 }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{ backgroundColor: `${spotCoral}33`, border: `1px solid ${spotCoral}66`, color: spotCoral }}
              >
                <FaBuilding /> {hero.badge}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {hero.title}
              </h1>
              <p className="text-xl font-semibold mb-4" style={{ color: spotCoral }}>
                {hero.tagline}
              </p>
              <p className="text-lg text-gray-300 mb-8">
                {hero.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href={`tel:${hero.phone.replace(/[^0-9]/g, '')}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-white px-8 py-4 rounded-full font-semibold text-lg inline-flex items-center gap-2"
                    style={{ backgroundColor: spotCoral }}
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
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {intro.text}
            </p>
            <div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-semibold"
              style={{ backgroundColor: `${spotCoral}15`, color: spotCoral }}
            >
              <FaStar /> {intro.tagline}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20" style={{ backgroundColor: spotLightBg }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4" style={{ color: spotNavy }}>
              Our <span style={{ color: spotCoral }}>Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
                <div className="mb-4" style={{ color: spotCoral }}>
                  {serviceIcons[service.icon] || <FaUtensils size={36} />}
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: spotNavy }}>{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Catering Packages */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4" style={{ color: spotNavy }}>
              In-House <span style={{ color: spotCoral }}>Catering Packages</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {cateringPackagesSection.subheadline}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cateringPackages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all"
                style={{ ['--hover-border' as string]: spotCoral }}
              >
                <div
                  className="p-5"
                  style={{ background: `linear-gradient(135deg, ${spotNavy} 0%, ${spotNavy}dd 100%)` }}
                >
                  <div className="flex items-center justify-between">
                    <div style={{ color: spotCoral }}>
                      {packageIcons[pkg.icon] || <FaUtensils size={32} />}
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold" style={{ color: spotCoral }}>{pkg.price}</p>
                      <p className="text-sm text-gray-300">{pkg.priceNote}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3" style={{ color: spotNavy }}>{pkg.name}</h3>
                  <p className="text-gray-600">{pkg.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Options */}
      <section className="py-20 text-white" style={{ backgroundColor: spotNavy }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Flexible <span style={{ color: spotCoral }}>Delivery Options</span>
              </h2>
              <p className="text-lg text-gray-300 mb-8">
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
                    <FaCheckCircle style={{ color: spotCoral }} className="flex-shrink-0" />
                    <span className="text-lg">{option}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl"
              style={{ backgroundColor: `${spotCoral}20`, border: `1px solid ${spotCoral}40` }}
            >
              <h3 className="text-2xl font-bold mb-4" style={{ color: spotCoral }}>{happyHour.title}</h3>
              <p className="text-lg text-gray-300 mb-6">
                {happyHour.description}
              </p>
              <ul className="space-y-3">
                {happyHour.items.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <FaCheckCircle style={{ color: spotCoral }} className="flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Custom Promise */}
      <section
        className="pt-20 pb-8"
        style={{ background: `linear-gradient(to bottom, ${spotCoral}15 0%, white 100%)` }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4" style={{ color: spotNavy }}>
              The Sky&apos;s the <span style={{ color: spotCoral }}>Limit</span>
            </h2>
            <p className="text-xl text-gray-600">
              {customPromise.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Certification Section */}
      {certification && (
        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center gap-2 mb-4" style={{ color: spotCoral }}>
                <FaCertificate size={28} />
                <span className="text-lg font-semibold uppercase tracking-wide">Credentials</span>
              </div>
              <h2 className="text-3xl font-bold" style={{ color: spotNavy }}>
                {certification.title}
              </h2>
              <p className="text-gray-600 mt-2">{certification.subtitle}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col lg:flex-row items-center gap-8 p-6 rounded-2xl border-2"
              style={{ borderColor: `${spotNavy}20`, backgroundColor: `${spotNavy}05` }}
            >
              <div className="flex-shrink-0">
                <Image
                  src={certification.certificateImage}
                  alt={certification.certificateName}
                  width={400}
                  height={300}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-xl font-bold mb-3" style={{ color: spotNavy }}>
                  {certification.certificateName}
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p><span className="font-semibold">Holder:</span> {owner.name}</p>
                  <p><span className="font-semibold">Issued:</span> {certification.issuedDate}</p>
                  <p><span className="font-semibold">Valid Through:</span> {certification.expiresDate}</p>
                  <p><span className="font-semibold">Certificate ID:</span> #{certification.certificateId}</p>
                </div>
                <div
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full text-sm font-semibold"
                  style={{ backgroundColor: `${spotCoral}15`, color: spotCoral }}
                >
                  <FaCheckCircle /> Certified for On-Premises Alcohol Service
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Contact / Owner Info */}
      <section className="pt-8 pb-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl p-8 md:p-12 text-center"
            style={{ backgroundColor: spotNavy }}
          >
            <h2 className="text-3xl font-bold text-white mb-2">{owner.name}</h2>
            <p className="text-xl font-semibold mb-6" style={{ color: spotCoral }}>{owner.title}</p>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {owner.certifications.map((cert, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full font-semibold"
                  style={{
                    backgroundColor: index === 1 ? `${spotCoral}30` : 'rgba(255,255,255,0.1)',
                    color: index === 1 ? spotCoral : 'white'
                  }}
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
                  className="text-white px-8 py-4 rounded-full font-semibold text-lg inline-flex items-center justify-center gap-2 w-full sm:w-auto"
                  style={{ backgroundColor: spotCoral }}
                >
                  <FaPhone /> {owner.phone}
                </motion.button>
              </Link>
              <a href={`mailto:${owner.email}`} target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-full font-semibold text-lg inline-flex items-center justify-center gap-2 w-full sm:w-auto"
                  style={{ backgroundColor: 'white', color: spotNavy }}
                >
                  <FaEnvelope /> {owner.email}
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Custom CTA for The Spot */}
      <section className="py-20" style={{ backgroundColor: spotCoral }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {cta.title}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {cta.subtitle}
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full font-semibold text-lg inline-flex items-center gap-2"
                style={{ backgroundColor: spotNavy, color: 'white' }}
              >
                Get Started <FaArrowRight />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
