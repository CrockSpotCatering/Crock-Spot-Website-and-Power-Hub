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
} from 'react-icons/fa';
import CTASection from '@/components/CTASection';
import ContactForm from '@/components/ContactForm';

export default function GovernmentCapabilities() {
  const capabilities = [
    {
      icon: <FaUsers size={40} />,
      title: 'Large-Scale Events',
      desc: 'Serve 100+ guests per hour with our efficient quick-serve concept.',
    },
    {
      icon: <FaClock size={40} />,
      title: 'Flexible Scheduling',
      desc: 'Available for recurring events, one-time gatherings, or multi-day conferences.',
    },
    {
      icon: <FaLeaf size={40} />,
      title: 'Dietary Compliance',
      desc: 'Extensive gluten-free, vegetarian, and vegan options clearly labeled.',
    },
    {
      icon: <FaShieldAlt size={40} />,
      title: 'Fully Insured',
      desc: 'Comprehensive liability coverage for peace of mind.',
    },
    {
      icon: <FaFileContract size={40} />,
      title: 'Contract Ready',
      desc: 'Experience working with government purchasing requirements.',
    },
    {
      icon: <FaAward size={40} />,
      title: 'Proven Track Record',
      desc: '15+ years serving Denver with award-winning service.',
    },
  ];

  const serviceTypes = [
    'Municipal Employee Appreciation Events',
    'City Council & Board Meetings',
    'Government Training Sessions',
    'Public Works Crew Meals',
    'First Responder Appreciation',
    'Community Outreach Events',
    'Multi-Day Conferences',
    'Emergency Response Support',
    'Holiday Celebrations',
    'Retirement Parties',
  ];

  const pricingTiers = [
    {
      name: 'Food Truck Service',
      price: '$16-18/person',
      features: [
        'On-site fresh cooking',
        'Full menu customization',
        'Quick 25-second service',
        'All equipment included',
        'Professional crew',
      ],
    },
    {
      name: 'Buffet Style',
      price: '$18-20/person',
      features: [
        'Elegant setup',
        'Chafing dishes included',
        'Dietary labels',
        'Staff assistance',
        'Indoor/outdoor options',
      ],
    },
    {
      name: 'Boxed Meals',
      price: '$17.50/person',
      features: [
        'Individual portions',
        'Easy distribution',
        'No service staff needed',
        'Grab-and-go friendly',
        'Great for meetings',
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-crock-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-crock-green rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-crock-purple rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-crock-green/20 border border-crock-green/40 text-crock-green px-4 py-2 rounded-full mb-6">
              <FaBuilding /> Government & Municipal Services
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Government <span className="text-crock-orange">Capabilities</span>
            </h1>
            <p className="text-xl text-crock-gray-light mb-8 max-w-3xl mx-auto">
              Trusted catering partner for government agencies, municipalities, and public sector organizations throughout Colorado.
            </p>
            <Link href="#contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-crock-orange text-white px-8 py-4 rounded-full font-semibold text-lg"
              >
                Request Government Quote
              </motion.button>
            </Link>
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
                <div className="text-crock-orange mb-4 flex justify-center">{item.icon}</div>
                <h3 className="text-xl font-bold text-crock-dark mb-2">{item.title}</h3>
                <p className="text-crock-gray">{item.desc}</p>
              </motion.div>
            ))}
          </div>
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {serviceTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-crock-purple/30 px-4 py-3 rounded-lg text-center text-sm border border-crock-orange/20"
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
            * Volume discounts available for recurring contracts and large events
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
              <h2 className="text-4xl font-bold text-crock-dark mb-6">
                Why Government Agencies <span className="text-crock-orange">Trust Us</span>
              </h2>
              <div className="space-y-4">
                {[
                  '15+ years of proven experience in Denver',
                  'Efficient service: 100+ guests per hour',
                  'Comprehensive dietary accommodations',
                  'Fully licensed, insured, and compliant',
                  'Flexible scheduling for any event type',
                  'Transparent pricing with no hidden fees',
                  'Award-winning food quality',
                  'Professional, uniformed staff',
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <FaCheckCircle className="text-crock-orange flex-shrink-0" />
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
                  <p className="text-4xl font-bold text-crock-orange">15+</p>
                  <p className="text-crock-gray-light">Years in Business</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-crock-orange">10K+</p>
                  <p className="text-crock-gray-light">Events Catered</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-crock-orange">100+</p>
                  <p className="text-crock-gray-light">Guests/Hour</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-crock-orange">25s</p>
                  <p className="text-crock-gray-light">Avg Service Time</p>
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
              We&apos;ll provide a detailed proposal tailored to your agency&apos;s needs
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
        title="Serving Those Who Serve"
        subtitle="Let us take care of the food so you can focus on your mission."
        variant="dark"
      />
    </div>
  );
}
