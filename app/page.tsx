'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FaTruck,
  FaUtensils,
  FaUsers,
  FaArrowRight,
  FaCheckCircle,
  FaClock,
  FaLeaf,
  FaAward,
  FaHeart,
  FaStar
} from 'react-icons/fa';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import CTASection from '@/components/CTASection';
import ContactForm from '@/components/ContactForm';

// Import content from JSON
import homeContent from '@/content/home.json';

// Icon mapping for services
const serviceIcons: Record<string, React.ReactNode> = {
  'Food Truck Catering': <FaTruck size={40} />,
  'Buffet Style Service': <FaUtensils size={40} />,
  'Corporate Events': <FaUsers size={40} />,
};

// Icon mapping for event types
const eventTypeIcons: Record<string, React.ReactNode> = {
  'Corporate Events': <FaUsers />,
  'Weddings': <FaHeart />,
  'Private Parties': <FaStar />,
  'Festivals': <FaTruck />,
};

// Emoji mapping for build your bowl steps
const bowlStepEmojis: Record<string, string> = {
  'bowl': '🍚',
  'meat': '🍖',
  'sauce': '🥣',
  'salad': '🥗',
};

// Icon mapping for quick service stats
const quickStatIcons: Record<string, React.ReactNode> = {
  'clock': <FaClock className="text-5xl" />,
  'leaf': <FaLeaf className="text-5xl" />,
  'users': <FaUsers className="text-5xl" />,
};

export default function Home() {
  const { hero, eventTypes, services, benefits, whyChooseUs, stats, buildYourBowl, quickServiceStats, cta, finalCta } = homeContent;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-crock-dark overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${hero.backgroundImage})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-crock-dark/80 via-crock-dark/60 to-crock-dark/90"></div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-crock-orange rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-crock-purple rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Award Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-crock-orange/20 border border-crock-orange/40 text-crock-orange px-4 py-2 rounded-full mb-6"
            >
              <FaAward /> {hero.badge}
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              {hero.headline.split('Crock')[0]}
              <span className="text-crock-orange">Crock</span>
              {hero.headline.split('Crock')[1]}
            </h1>
            <p className="text-xl md:text-2xl text-crock-gray-light mb-4 max-w-3xl mx-auto">
              {hero.subheadline}
            </p>
            <p className="text-lg text-crock-orange mb-8 font-semibold">
              {hero.tagline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={hero.ctaPrimaryLink}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-crock-orange text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-crock-orange-dark transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                >
                  {hero.ctaPrimary} <FaArrowRight />
                </motion.button>
              </Link>
              <Link href={hero.ctaSecondaryLink}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-crock-dark transition-all duration-300"
                >
                  {hero.ctaSecondary}
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-crock-orange rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-crock-orange rounded-full mt-2"
            ></motion.div>
          </div>
        </motion.div>
      </section>

      {/* Event Types Bar */}
      <section className="bg-crock-orange py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 text-white">
            {eventTypes.map((eventType, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 text-lg font-medium"
              >
                {eventTypeIcons[eventType] || <FaStar />}
                <span>{eventType}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-crock-dark mb-4">
              Our Catering Services
            </h2>
            <p className="text-xl text-crock-gray max-w-2xl mx-auto">
              From food trucks to full-service buffets, we bring gourmet cuisine to any event
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-crock-dark to-crock-purple p-8 rounded-2xl shadow-xl text-white"
              >
                <div className="text-crock-orange mb-4">
                  {serviceIcons[service.title] || <FaUtensils size={40} />}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-crock-gray-light mb-4">{service.description}</p>
                <p className="text-crock-orange font-bold text-lg">{service.price}</p>
                <Link href="/catering" className="text-crock-orange hover:text-white transition-colors inline-flex items-center gap-2 mt-4">
                  Learn More <FaArrowRight />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-crock-gray-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-crock-dark mb-6">
                {whyChooseUs.headline.split('The Crock Spot')[0]}
                <span className="text-crock-orange">The Crock Spot?</span>
              </h2>
              <p className="text-lg text-crock-gray mb-8">
                {whyChooseUs.description}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <FaCheckCircle className="text-crock-orange flex-shrink-0" />
                    <span className="text-crock-dark font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Image with stats */}
              <div
                className="rounded-2xl shadow-2xl aspect-[4/3] bg-cover bg-center relative overflow-hidden"
                style={{
                  backgroundImage: `url(${whyChooseUs.image})`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-crock-dark/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="grid grid-cols-3 gap-4 text-white text-center">
                    <div>
                      <p className="text-3xl font-bold text-crock-orange">{stats.years}</p>
                      <p className="text-sm">{stats.yearsLabel}</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-crock-orange">{stats.events}</p>
                      <p className="text-sm">{stats.eventsLabel}</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-crock-orange">{stats.serviceTime}</p>
                      <p className="text-sm">{stats.serviceTimeLabel}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Build Your Bowl Section */}
      <section className="py-20 bg-crock-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-crock-orange rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {buildYourBowl.headline.split('Bowl')[0]}<span className="text-crock-orange">Bowl</span>
            </h2>
            <p className="text-xl text-crock-gray-light max-w-2xl mx-auto">
              {buildYourBowl.subheadline}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {buildYourBowl.steps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="text-center"
              >
                <div className="text-5xl mb-4">{bowlStepEmojis[item.icon] || '🍽️'}</div>
                <div className="bg-crock-orange text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-crock-gray-light text-sm">{item.items}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/menus">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-crock-orange text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-crock-orange-dark transition-all"
              >
                View Full Menu <FaArrowRight className="inline ml-2" />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Service Highlight */}
      <section className="py-16 bg-crock-orange text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {quickServiceStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4"
              >
                {quickStatIcons[stat.icon] || <FaStar className="text-5xl" />}
                <div>
                  <h3 className="text-3xl font-bold">{stat.value}</h3>
                  <p className="text-white/80">{stat.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-crock-dark mb-4">
              {cta.headline.split('Crock')[0]}<span className="text-crock-orange">Crock</span>{cta.headline.split('Crock')[1]}
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

      {/* Final CTA */}
      <CTASection
        title={finalCta.headline}
        subtitle={finalCta.description}
        buttonText={finalCta.buttonText}
        variant="dark"
      />
    </div>
  );
}
