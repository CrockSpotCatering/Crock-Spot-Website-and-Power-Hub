'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FaTruck,
  FaUtensils,
  FaUsers,
  FaArrowRight,
  FaCheckCircle,
  FaCalendar,
  FaGlassCheers,
  FaBriefcase,
  FaHeart,
  FaBirthdayCake,
  FaMountain,
} from 'react-icons/fa';
import CTASection from '@/components/CTASection';
import ContactForm from '@/components/ContactForm';

export default function Catering() {
  const cateringOptions = [
    {
      icon: <FaTruck size={48} />,
      title: 'Food Truck Service',
      description: 'Our gourmet food trucks bring the full kitchen experience to your event. Fresh, hot meals cooked on-site.',
      price: '$16-18 per person',
      features: [
        'On-site cooking - never reheated',
        'Serve 100+ guests per hour',
        '25-second average service time',
        'Custom menu design',
        'Professional Crock Star crew',
      ],
      ideal: 'Outdoor events, festivals, corporate gatherings',
    },
    {
      icon: <FaUtensils size={48} />,
      title: 'Buffet Style Service',
      description: 'Elegant indoor buffet setup with our full menu selection. Perfect for formal occasions.',
      price: '$18-20 per person',
      features: [
        'Full service setup',
        'Chafing dishes included',
        'Dietary labels provided',
        'Customizable menu options',
        'Staff assistance available',
      ],
      ideal: 'Weddings, corporate dinners, private parties',
    },
    {
      icon: <FaGlassCheers size={48} />,
      title: 'Themed Bars',
      description: 'Interactive food stations that let guests customize their experience. Taco bars, chili bars, and more!',
      price: '$19-22 per person',
      features: [
        'Taco Bar - $19/person',
        'Tostada Bar - $19/person',
        'Chili Bar - $19/person',
        'Mac n Cheese Bar - $22/person',
        'Nacho Bar - $19/person',
      ],
      ideal: 'Casual events, team building, celebrations',
    },
  ];

  const eventTypes = [
    { icon: <FaBriefcase />, title: 'Corporate Events', desc: 'Team lunches, company parties, client appreciation' },
    { icon: <FaHeart />, title: 'Weddings', desc: 'Rehearsal dinners, receptions, day-after brunches' },
    { icon: <FaBirthdayCake />, title: 'Private Parties', desc: 'Birthdays, graduations, family reunions' },
    { icon: <FaUsers />, title: 'Large Events', desc: 'Festivals, concerts, community gatherings' },
    { icon: <FaMountain />, title: 'Mountain Events', desc: 'Destination catering throughout Colorado' },
    { icon: <FaCalendar />, title: 'Recurring Events', desc: 'Weekly lunches, monthly meetings' },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-crock-dark overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Catering That <span className="text-crock-orange">Rocks</span>
            </h1>
            <p className="text-xl text-crock-gray-light mb-8 max-w-3xl mx-auto">
              From intimate gatherings to large-scale events, we bring award-winning cuisine and unforgettable experiences to every occasion.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="#options">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-crock-orange text-white px-8 py-4 rounded-full font-semibold text-lg"
                >
                  View Options <FaArrowRight className="inline ml-2" />
                </motion.button>
              </Link>
              <Link href="#quote">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-crock-dark transition-all"
                >
                  Get a Quote
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
              Catering Options
            </h2>
            <p className="text-xl text-crock-gray max-w-2xl mx-auto">
              Choose the service style that fits your event perfectly
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
                  <div className="text-crock-orange mb-4">{option.icon}</div>
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
              Events We Cater
            </h2>
            <p className="text-xl text-crock-gray max-w-2xl mx-auto">
              Whatever the occasion, we bring the flavor
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
                <div className="text-crock-orange text-3xl">{event.icon}</div>
                <div>
                  <h3 className="text-lg font-bold text-crock-dark">{event.title}</h3>
                  <p className="text-crock-gray text-sm">{event.desc}</p>
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
              How It <span className="text-crock-orange">Works</span>
            </h2>
            <p className="text-xl text-crock-gray-light max-w-2xl mx-auto">
              Booking your catering is simple and stress-free
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Reach Out', desc: 'Fill out our form or give us a call to discuss your event' },
              { step: '2', title: 'Custom Quote', desc: "We'll create a personalized menu and pricing for your needs" },
              { step: '3', title: 'Book & Relax', desc: 'Confirm your date and let us handle all the details' },
              { step: '4', title: 'Enjoy!', desc: "We show up, cook fresh, and rock your event!" },
            ].map((item, index) => (
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
                <p className="text-crock-gray-light">{item.desc}</p>
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
              Get Your <span className="text-crock-orange">Free Quote</span>
            </h2>
            <p className="text-xl text-crock-gray">
              Tell us about your event and we&apos;ll create a custom proposal
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
        title="We Will, We Will Crock You!"
        subtitle="Let's create an unforgettable culinary experience for your next event."
        variant="orange"
      />
    </div>
  );
}
