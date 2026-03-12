'use client';

import { motion } from 'framer-motion';
import {
  FaAward,
  FaUsers,
  FaHeart,
  FaTruck,
  FaQuoteLeft,
  FaStar,
  FaUtensils,
  FaNewspaper,
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
  const { hero, founders, cateringStyle, community, team, timeline, milestones, valuesSection, values, awardsSection, awards, mediaFeatures, cta, finalCta } = aboutContent;

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
            <p className="text-crock-orange font-semibold text-lg mb-4">{hero.tagline}</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our <span className="text-crock-orange">Story</span>
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
                Meet the <span className="text-crock-orange">Founders</span>
              </h2>
              <p className="text-lg text-crock-gray mb-6">
                {founders.description}
              </p>
              <p className="text-lg text-crock-gray mb-6">
                {founders.story}
              </p>
              <p className="text-lg text-crock-gray mb-6">
                {founders.expanded}
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

      {/* Signature Catering Style */}
      <section className="py-20 bg-crock-gray-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-crock-dark mb-4">
              {cateringStyle.headline.split(':')[0]}: <span className="text-crock-orange">{cateringStyle.subheadline}</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <p className="text-lg text-crock-gray mb-6 text-center">
              {cateringStyle.intro}
            </p>
            <p className="text-lg text-crock-gray mb-8 text-center">
              {cateringStyle.history}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
            {cateringStyle.styles.map((style, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-crock-orange"
              >
                <div className="text-crock-orange mb-4">
                  {index === 0 ? <FaTruck size={40} /> : <FaUtensils size={40} />}
                </div>
                <h3 className="text-2xl font-bold text-crock-dark mb-3">{style.name}</h3>
                <p className="text-crock-gray">{style.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-crock-gray text-center max-w-4xl mx-auto"
          >
            {cateringStyle.closing}
          </motion.p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-crock-dark mb-4">
              Our <span className="text-crock-orange">Journey</span>
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
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-right md:pr-4' : 'md:text-left md:pl-4'}`}>
                    <div className="relative overflow-hidden rounded-xl shadow-lg">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${milestone.image})`,
                          opacity: 0.5,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-crock-dark/80 to-crock-dark/50" />
                      <div className="relative p-6">
                        <span className="text-crock-orange font-bold text-3xl drop-shadow-lg">{milestone.year}</span>
                        <h3 className="text-xl font-bold text-white mt-2 drop-shadow">{milestone.title}</h3>
                        <p className="text-white/90 drop-shadow">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:flex w-5 h-5 bg-crock-orange rounded-full z-10 ring-4 ring-white shadow-lg"></div>
                  <div className="md:w-1/2"></div>
                </motion.div>
              ))}
            </div>
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
              Awards & <span className="text-crock-orange">Recognition</span>
            </h2>
            <p className="text-xl text-crock-gray-light">{awardsSection.intro}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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

          {/* Media Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <FaNewspaper className="text-crock-orange text-2xl" />
              <h3 className="text-xl font-bold">As Featured In</h3>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {mediaFeatures.map((feature, index) => (
                <span
                  key={index}
                  className="bg-white/10 px-4 py-2 rounded-full text-crock-gray-light"
                >
                  {feature}
                </span>
              ))}
            </div>
          </motion.div>
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
              What We <span className="text-crock-orange">Stand For</span>
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

      {/* Community */}
      <section className="py-20 bg-gradient-to-b from-crock-purple/10 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-crock-dark mb-2">
              {community.headline}
            </h2>
            <p className="text-xl text-crock-orange font-semibold">{community.subheadline}</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg text-crock-gray mb-6 text-center"
            >
              {community.description}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg text-crock-gray mb-8 text-center"
            >
              {community.future}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-crock-orange/10 p-8 rounded-2xl text-center border border-crock-orange/30"
            >
              <p className="text-lg text-crock-dark font-medium">
                {community.callToAction}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team - The Crock Stars */}
      <section className="py-20 bg-crock-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-2">
              {team.headline} – <span className="text-crock-orange">{team.subheadline}</span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg text-crock-gray-light mb-6"
            >
              {team.description}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg text-crock-gray-light mb-6"
            >
              {team.spirit}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg text-crock-gray-light mb-8"
            >
              {team.future}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xl text-crock-orange font-semibold mb-2">{team.signoff}</p>
              <p className="text-2xl font-bold text-white">{team.signature}</p>
              <div className="flex justify-center gap-2 mt-4">
                <FaStar className="text-crock-orange" />
                <FaStar className="text-crock-orange" />
                <FaStar className="text-crock-orange" />
              </div>
            </motion.div>
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
              {cta.headline}
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
