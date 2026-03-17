'use client';

import { motion } from 'framer-motion';
import {
  FaHandshake,
  FaHeart,
  FaUsers,
  FaMapMarkerAlt,
  FaCalendar,
} from 'react-icons/fa';
import CTASection from '@/components/CTASection';
import ContactForm from '@/components/ContactForm';

// Import content from JSON - editable via Power Hub CMS
import content from '@/content/community-partners.json';

// Icon mapping for partnership types
const partnershipIcons: Record<string, React.ReactNode> = {
  'map-marker': <FaMapMarkerAlt size={32} />,
  'users': <FaUsers size={32} />,
  'heart': <FaHeart size={32} />,
  'calendar': <FaCalendar size={32} />,
  'handshake': <FaHandshake size={32} />,
};

// Icon mapping for become partner section (smaller)
const becomePartnerIcons: Record<string, React.ReactNode> = {
  'handshake': <FaHandshake className="text-crock-orange mt-1 flex-shrink-0" />,
  'users': <FaUsers className="text-crock-orange mt-1 flex-shrink-0" />,
  'heart': <FaHeart className="text-crock-orange mt-1 flex-shrink-0" />,
};

export default function CommunityPartners() {
  const {
    hero,
    partnershipTypes,
    featuredPartners,
    communityInvolvement,
    becomePartner,
    testimonial,
    cta
  } = content;

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section
        className="relative py-32 bg-crock-dark overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${hero.backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-crock-dark/70"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-crock-orange/20 border border-crock-orange/40 text-crock-orange px-4 py-2 rounded-full mb-6">
              <FaHandshake /> {hero.badge}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Community <span className="text-crock-orange">Partners</span>
            </h1>
            <p className="text-xl text-crock-gray-light mb-8 max-w-3xl mx-auto">
              {hero.subheadline}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-crock-dark mb-4">
              How We <span className="text-crock-orange">Partner</span>
            </h2>
            <p className="text-xl text-crock-gray">
              {partnershipTypes.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnershipTypes.types.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-crock-dark to-crock-purple p-8 rounded-2xl text-white text-center shadow-xl"
              >
                <div className="text-crock-orange mb-4 flex justify-center">
                  {partnershipIcons[item.icon] || <FaHandshake size={32} />}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.type}</h3>
                <p className="text-crock-gray-light text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Partners */}
      <section className="py-20 bg-crock-gray-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-crock-dark mb-4">
              Featured <span className="text-crock-orange">Partners</span>
            </h2>
            <p className="text-xl text-crock-gray">
              {featuredPartners.subtitle}
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6">
            {featuredPartners.partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white px-8 py-6 rounded-xl shadow-md text-center"
              >
                <h3 className="font-bold text-crock-dark">{partner.name}</h3>
                <p className="text-sm text-crock-orange">{partner.type}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Involvement */}
      <section className="py-20 bg-crock-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Giving <span className="text-crock-orange">Back</span>
            </h2>
            <p className="text-xl text-crock-gray-light">
              {communityInvolvement.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {communityInvolvement.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-crock-purple/30 p-6 rounded-xl border border-crock-orange/20"
              >
                <h3 className="text-xl font-bold text-crock-orange mb-2">{item.title}</h3>
                <p className="text-crock-gray-light">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Partner */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-crock-dark mb-6">
                Become a <span className="text-crock-orange">Partner</span>
              </h2>
              <p className="text-lg text-crock-gray mb-6">
                {becomePartner.description}
              </p>
              <div className="space-y-4">
                {becomePartner.partnershipTypes.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    {becomePartnerIcons[item.icon] || <FaHandshake className="text-crock-orange mt-1 flex-shrink-0" />}
                    <div>
                      <h4 className="font-bold text-crock-dark">{item.title}</h4>
                      <p className="text-crock-gray text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-crock-gray-light/20 p-8 rounded-2xl shadow-lg"
            >
              <h3 className="text-2xl font-bold text-crock-dark mb-6 text-center">
                {becomePartner.formTitle}
              </h3>
              <ContactForm variant="compact" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-crock-orange text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-2xl md:text-3xl italic mb-6">
              &quot;{testimonial.quote}&quot;
            </p>
            <p className="font-bold">— {testimonial.author}</p>
          </motion.div>
        </div>
      </section>

      <CTASection
        title={cta.title}
        subtitle={cta.subtitle}
        variant="purple"
      />
    </div>
  );
}
