'use client';

import { motion } from 'framer-motion';
import {
  FaAward,
  FaUsers,
  FaHeart,
  FaTruck,
  FaQuoteLeft,
} from 'react-icons/fa';
import CTASection from '@/components/CTASection';
import ContactForm from '@/components/ContactForm';

// Import content from JSON
import aboutContent from '@/content/about.json';

// Icon mapping for values
const valueIcons: Record<string, React.ReactNode> = {
  'heart': <FaHeart size={40} />,
  'users': <FaUsers size={40} />,
  'truck': <FaTruck size={40} />,
  'award': <FaAward size={40} />,
};

export default function About() {
  const { hero, founders, timeline, milestones, valuesSection, values, awardsSection, awards, cta, finalCta } = aboutContent;

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-crock-dark overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-crock-orange rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-crock-purple rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {hero.headline.includes('Story') ? (
                <>Our <span className="text-crock-orange">Story</span></>
              ) : (
                hero.headline
              )}
            </h1>
            <p className="text-xl text-crock-gray-light mb-8 max-w-3xl mx-auto">
              {hero.subheadline}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founders Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div
                className="rounded-2xl shadow-xl aspect-[4/3] bg-cover bg-center"
                style={{
                  backgroundImage: `url(${founders.image})`,
                }}
              ></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-crock-dark mb-6">
                {founders.headline.includes('Founders') ? (
                  <>Meet the <span className="text-crock-orange">Founders</span></>
                ) : (
                  founders.headline
                )}
              </h2>
              <p className="text-lg text-crock-gray mb-6">
                <strong>{founders.description.split(':')[0]}:</strong>{founders.description.split(':')[1]}
              </p>
              <p className="text-lg text-crock-gray mb-6">
                {founders.story}
              </p>
              <div className="bg-crock-orange/10 p-6 rounded-xl border-l-4 border-crock-orange">
                <FaQuoteLeft className="text-crock-orange mb-2" />
                <p className="text-crock-dark italic">
                  &quot;{founders.quote}&quot;
                </p>
                <p className="text-crock-orange font-semibold mt-2">— {founders.quoteAuthor}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-crock-gray-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-crock-dark mb-4">
              {timeline.headline}
            </h2>
            <p className="text-xl text-crock-gray">{timeline.subheadline}</p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-crock-orange/30"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-center gap-6 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-md inline-block">
                      <span className="text-crock-orange font-bold text-2xl">{milestone.year}</span>
                      <h3 className="text-xl font-bold text-crock-dark mt-2">{milestone.title}</h3>
                      <p className="text-crock-gray">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex w-4 h-4 bg-crock-orange rounded-full z-10"></div>
                  <div className="md:w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-crock-dark mb-4">
              {valuesSection.headline.includes('Stand For') ? (
                <>What We <span className="text-crock-orange">Stand For</span></>
              ) : (
                valuesSection.headline
              )}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center p-6"
              >
                <div className="text-crock-orange mb-4 flex justify-center">
                  {valueIcons[value.icon] || <FaAward size={40} />}
                </div>
                <h3 className="text-xl font-bold text-crock-dark mb-2">{value.title}</h3>
                <p className="text-crock-gray">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 bg-crock-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {awardsSection.headline.includes('Recognition') ? (
                <>Awards & <span className="text-crock-orange">Recognition</span></>
              ) : (
                awardsSection.headline
              )}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {awards.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-crock-purple/30 p-8 rounded-2xl text-center border border-crock-orange/30"
              >
                <FaAward className="text-crock-orange text-5xl mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{award.title}</h3>
                <p className="text-crock-orange">{award.source}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-crock-dark mb-4">
              {cta.headline.includes('Connect') ? (
                <>Let&apos;s <span className="text-crock-orange">Connect</span></>
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
        variant="purple"
      />
    </div>
  );
}
