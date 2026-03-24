'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FaTruck,
  FaUtensils,
  FaArrowRight,
  FaCheckCircle,
  FaCalendar,
  FaGlassCheers,
  FaBriefcase,
  FaHeart,
  FaBirthdayCake,
  FaMountain,
  FaUsers,
  FaDove,
} from 'react-icons/fa';
import CTASection from '@/components/CTASection';
import ContactForm from '@/components/ContactForm';

// Import content from JSON
import cateringContent from '@/content/catering.json';

// Icon mapping for catering options
const optionIcons: Record<string, React.ReactNode> = {
  'truck': <FaTruck size={48} />,
  'utensils': <FaUtensils size={48} />,
  'glass': <FaGlassCheers size={48} />,
};

// Icon mapping for event types
const eventIcons: Record<string, React.ReactNode> = {
  'briefcase': <FaBriefcase />,
  'heart': <FaHeart />,
  'cake': <FaBirthdayCake />,
  'users': <FaUsers />,
  'mountain': <FaMountain />,
  'calendar': <FaCalendar />,
  'dove': <FaDove />,
};

export default function Catering() {
  const { hero, optionsSection, cateringOptions, eventsSection, eventTypes, process, cta, finalCta } = cateringContent;

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-crock-dark overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url(${hero.backgroundImage})`,
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {hero.headline.includes('Rocks') ? (
                <>Catering That <span className="text-crock-orange">Rocks</span></>
              ) : (
                hero.headline
              )}
            </h1>
            <p className="text-xl text-crock-gray-light mb-8 max-w-3xl mx-auto">
              {hero.subheadline}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={hero.ctaPrimaryLink}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-crock-orange text-white px-8 py-4 rounded-full font-semibold text-lg"
                >
                  {hero.ctaPrimary} <FaArrowRight className="inline ml-2" />
                </motion.button>
              </Link>
              <Link href={hero.ctaSecondaryLink}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-crock-dark transition-all"
                >
                  {hero.ctaSecondary}
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Catering Options */}
      <section id="options" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-crock-dark mb-4">
              {optionsSection.headline}
            </h2>
            <p className="text-xl text-crock-gray max-w-2xl mx-auto">
              {optionsSection.subheadline}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {cateringOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-crock-gray-light/50"
              >
                <div className="bg-gradient-to-r from-crock-dark to-crock-purple p-6 text-white">
                  <div className="text-crock-orange mb-4">
                    {optionIcons[option.icon] || <FaUtensils size={48} />}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{option.title}</h3>
                  <p className="text-crock-orange text-2xl font-bold">{option.price}</p>
                </div>
                <div className="p-6">
                  <p className="text-crock-gray mb-4">{option.description}</p>
                  <ul className="space-y-2 mb-6">
                    {option.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-crock-dark">
                        <FaCheckCircle className="text-crock-orange mt-1 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-crock-orange/10 p-3 rounded-lg">
                    <p className="text-sm text-crock-dark">
                      <strong>Ideal for:</strong> {option.ideal}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Types We Serve */}
      <section className="py-20 bg-crock-gray-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-crock-dark mb-4">
              {eventsSection.headline}
            </h2>
            <p className="text-xl text-crock-gray max-w-2xl mx-auto">
              {eventsSection.subheadline}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventTypes.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md flex items-start gap-4"
              >
                <div className="text-crock-orange text-3xl">
                  {eventIcons[event.icon] || <FaUsers />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-crock-dark">{event.title}</h3>
                  <p className="text-crock-gray text-sm">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-crock-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {process.headline.includes('Works') ? (
                <>How It <span className="text-crock-orange">Works</span></>
              ) : (
                process.headline
              )}
            </h2>
            <p className="text-xl text-crock-gray-light max-w-2xl mx-auto">
              {process.subheadline}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {process.steps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center"
              >
                <div className="bg-crock-orange text-white w-14 h-14 rounded-full flex items-center justify-center font-bold text-2xl mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-crock-gray-light">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section id="quote" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-crock-dark mb-4">
              {cta.headline.includes('Free Quote') ? (
                <>Get Your <span className="text-crock-orange">Free Quote</span></>
              ) : (
                cta.headline
              )}
            </h2>
            <p className="text-xl text-crock-gray">
              {cta.description}
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

      {/* CTA */}
      <CTASection
        title={finalCta.headline}
        subtitle={finalCta.description}
        variant="orange"
      />
    </div>
  );
}
