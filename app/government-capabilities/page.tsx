'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FaBuilding,
  FaShieldAlt,
  FaFileContract,
  FaUsers,
  FaCheckCircle,
  FaAward,
  FaClock,
  FaLeaf,
  FaMedal,
  FaFlag,
  FaStar,
} from 'react-icons/fa';
import CTASection from '@/components/CTASection';
import ContactForm from '@/components/ContactForm';

// Import content from JSON - editable via Power Hub CMS
import content from '@/content/government-capabilities.json';

// Icon mapping for capabilities
const capabilityIcons: Record<string, React.ReactNode> = {
  'users': <FaUsers size={40} />,
  'clock': <FaClock size={40} />,
  'leaf': <FaLeaf size={40} />,
  'shield': <FaShieldAlt size={40} />,
  'file-contract': <FaFileContract size={40} />,
  'award': <FaAward size={40} />,
};

export default function GovernmentCapabilities() {
  const {
    hero,
    vendorCredentials,
    capabilities,
    missionCritical,
    serviceTypes,
    pricingTiers,
    pricingNote,
    whyTrustUs,
    stats,
    contactForm,
    finalCta
  } = content;

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section
        className="relative py-32 bg-crock-dark overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${hero.backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-crock-dark/75"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-crock-green/20 border border-crock-green/40 text-crock-green px-4 py-2 rounded-full mb-6">
              <FaBuilding /> {hero.badge}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Government <span className="text-crock-orange">Capabilities</span>
            </h1>
            <p className="text-xl text-crock-gray-light mb-8 max-w-3xl mx-auto">
              {hero.subheadline}
            </p>
            <Link href={hero.ctaLink} className="inline-block w-full sm:w-auto px-4 sm:px-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-crock-orange text-white px-8 py-4 rounded-full font-semibold text-base sm:text-lg min-h-[56px]"
              >
                {hero.ctaText}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Vendor Credentials */}
      <section className="py-16 bg-crock-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-white mb-2">
              Approved <span className="text-crock-orange">Vendor Credentials</span>
            </h2>
            <p className="text-crock-gray-light">
              {vendorCredentials.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* NAICS Codes */}
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-bold text-crock-orange mb-4 flex items-center gap-2">
                <FaFileContract /> NAICS Codes
              </h3>
              <ul className="space-y-2 text-white font-mono">
                {vendorCredentials.naicsCodes.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="bg-crock-orange/20 px-2 py-1 rounded">{item.code}</span>
                    <span className="text-sm text-crock-gray-light">{item.description}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* DUNS Number */}
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-bold text-crock-orange mb-4 flex items-center gap-2">
                <FaShieldAlt /> DUNS Number
              </h3>
              <div className="bg-crock-orange/20 rounded-lg p-4 text-center">
                <p className="text-3xl font-mono font-bold text-white tracking-wider">
                  {vendorCredentials.dunsNumber.number}
                </p>
                <p className="text-sm text-crock-gray-light mt-2">
                  {vendorCredentials.dunsNumber.label}
                </p>
              </div>
              <p className="text-sm text-crock-gray-light mt-4">
                {vendorCredentials.dunsNumber.description}
              </p>
            </div>

            {/* CAGE Code */}
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-bold text-crock-orange mb-4 flex items-center gap-2">
                <FaBuilding /> CAGE Code
              </h3>
              <div className="bg-crock-orange/20 rounded-lg p-4 text-center">
                <p className="text-4xl font-mono font-bold text-white tracking-widest">
                  {vendorCredentials.cageCode.code}
                </p>
                <p className="text-sm text-crock-gray-light mt-2">
                  {vendorCredentials.cageCode.label}
                </p>
              </div>
              <p className="text-sm text-crock-gray-light mt-4">
                {vendorCredentials.cageCode.description}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-crock-dark mb-4">
              Our <span className="text-crock-orange">Capabilities</span>
            </h2>
            <p className="text-xl text-crock-gray max-w-2xl mx-auto">
              We understand the unique requirements of government catering
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-crock-gray-light/30 p-8 rounded-xl text-center"
              >
                <div className="text-crock-orange mb-4 flex justify-center">
                  {capabilityIcons[item.icon] || <FaAward size={40} />}
                </div>
                <h3 className="text-xl font-bold text-crock-dark mb-2">{item.title}</h3>
                <p className="text-crock-gray">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission-Critical Experience */}
      <section className="py-20 bg-gradient-to-b from-crock-purple/20 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-crock-orange/10 border border-crock-orange/30 text-crock-orange px-4 py-2 rounded-full mb-6">
              <FaMedal /> {missionCritical.badge}
            </div>
            <h2 className="text-4xl font-bold text-crock-dark mb-4">
              Mission-Critical <span className="text-crock-orange">Experience</span>
            </h2>
            <p className="text-xl text-crock-gray max-w-3xl mx-auto">
              {missionCritical.subtitle}
            </p>
          </motion.div>

          {/* COVID-19 Response Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-crock-dark rounded-2xl overflow-hidden shadow-2xl mb-12"
          >
            <div className="bg-gradient-to-r from-crock-orange to-crock-orange/80 px-6 py-4">
              <div className="flex items-center gap-3 text-white">
                <FaFlag size={24} />
                <h3 className="text-xl font-bold">{missionCritical.covidResponse.title}</h3>
              </div>
            </div>
            <div className="p-8 md:p-10">
              <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-8">
                <div className="text-center">
                  <p className="text-3xl sm:text-5xl font-bold text-crock-orange">{missionCritical.covidResponse.stats.days}</p>
                  <p className="text-crock-gray-light text-xs sm:text-base">{missionCritical.covidResponse.stats.daysLabel}</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl sm:text-5xl font-bold text-crock-orange">{missionCritical.covidResponse.stats.meals}</p>
                  <p className="text-crock-gray-light text-xs sm:text-base">{missionCritical.covidResponse.stats.mealsLabel}</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl sm:text-5xl font-bold text-crock-orange">{missionCritical.covidResponse.stats.mobilization}</p>
                  <p className="text-crock-gray-light text-xs sm:text-base">{missionCritical.covidResponse.stats.mobilizationLabel}</p>
                </div>
              </div>
              <p className="text-lg text-white leading-relaxed mb-6">
                <strong className="text-crock-orange">{missionCritical.covidResponse.dateRange}:</strong> {missionCritical.covidResponse.description}
              </p>
              <p className="text-crock-gray-light">
                {missionCritical.covidResponse.impact}
              </p>
            </div>
          </motion.div>

          {/* Military Contracts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-crock-gray-light/30"
          >
            <div className="flex items-center gap-3 mb-6">
              <FaStar className="text-crock-orange" size={28} />
              <h3 className="text-2xl font-bold text-crock-dark">{missionCritical.militaryPartnerships.title}</h3>
            </div>
            <p className="text-lg text-crock-gray mb-6">
              {missionCritical.militaryPartnerships.description}
            </p>
            <div className="flex flex-wrap gap-4">
              {missionCritical.militaryPartnerships.badges.map((badge, index) => (
                <span
                  key={index}
                  className={`px-4 py-2 rounded-full font-semibold flex items-center gap-2 ${
                    index === 0 ? 'bg-crock-green/10 text-crock-green' :
                    index === 1 ? 'bg-crock-orange/10 text-crock-orange' :
                    'bg-crock-purple/10 text-crock-purple'
                  }`}
                >
                  <FaCheckCircle /> {badge}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Types */}
      <section className="py-20 bg-crock-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Events We <span className="text-crock-orange">Support</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {serviceTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-crock-purple/30 px-3 sm:px-4 py-3 rounded-lg text-center text-xs sm:text-sm border border-crock-orange/20"
              >
                {type}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Options */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-crock-dark mb-4">
              Service <span className="text-crock-orange">Options</span>
            </h2>
            <p className="text-xl text-crock-gray">
              Flexible pricing to fit your budget requirements
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="bg-white border-2 border-crock-gray-light rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="bg-crock-dark p-6 text-center">
                  <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                  <p className="text-3xl font-bold text-crock-orange mt-2">{tier.price}</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-crock-dark">
                        <FaCheckCircle className="text-crock-green flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-crock-gray mt-8">
            {pricingNote}
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-crock-gray-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-crock-dark mb-4">
                Why Government Agencies <span className="text-crock-orange">Trust Us</span>
              </h2>
              <p className="text-lg text-crock-gray mb-6">
                {whyTrustUs.intro}
              </p>

              <h3 className="text-lg font-bold text-crock-dark mb-4">Known For:</h3>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {whyTrustUs.knownFor.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-crock-orange/10 px-4 py-3 rounded-lg text-crock-dark font-medium text-center"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>

              <div className="space-y-3">
                {whyTrustUs.reasons.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <FaCheckCircle className="text-crock-green flex-shrink-0" />
                    <span className="text-crock-dark">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-crock-dark p-8 rounded-2xl text-white"
            >
              <h3 className="text-2xl font-bold mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-crock-orange">{stats.years}</p>
                  <p className="text-crock-gray-light">{stats.yearsLabel}</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-crock-orange">{stats.events}</p>
                  <p className="text-crock-gray-light">{stats.eventsLabel}</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-crock-orange">{stats.guestsPerHour}</p>
                  <p className="text-crock-gray-light">{stats.guestsLabel}</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-crock-orange">{stats.serviceTime}</p>
                  <p className="text-crock-gray-light">{stats.serviceLabel}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-crock-dark mb-4">
              Request a <span className="text-crock-orange">Government Quote</span>
            </h2>
            <p className="text-xl text-crock-gray">
              {contactForm.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-crock-gray-light/20 p-8 rounded-2xl shadow-lg"
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>

      <CTASection
        title={finalCta.headline}
        subtitle={finalCta.description}
        variant="dark"
      />
    </div>
  );
}
