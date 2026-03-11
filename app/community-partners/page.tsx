'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FaHandshake,
  FaHeart,
  FaUsers,
  FaMapMarkerAlt,
  FaCalendar,
  FaArrowRight,
} from 'react-icons/fa';
import CTASection from '@/components/CTASection';
import ContactForm from '@/components/ContactForm';

export default function CommunityPartners() {
  const partnerships = [
    {
      type: 'Event Venues',
      desc: 'We partner with event centers, breweries, and unique venues throughout Colorado.',
      icon: <FaMapMarkerAlt size={32} />,
    },
    {
      type: 'Corporate Clients',
      desc: 'Recurring partnerships with businesses for employee appreciation and client events.',
      icon: <FaUsers size={32} />,
    },
    {
      type: 'Non-Profits',
      desc: 'Supporting local charities and community organizations with special pricing.',
      icon: <FaHeart size={32} />,
    },
    {
      type: 'Farmers Markets',
      desc: 'Where it all began! Still serving our community at local markets.',
      icon: <FaCalendar size={32} />,
    },
  ];

  const featuredPartners = [
    { name: 'Church Ranch Event Center', type: 'Venue Partner' },
    { name: 'Table Mountain Event Center', type: 'Venue Partner' },
    { name: 'Cherry Creek Farmers Market', type: 'Market Partner' },
    { name: 'Local Breweries', type: 'Beverage Partners' },
    { name: 'New Terrain Brewing', type: 'Event Partner' },
  ];

  const communityInvolvement = [
    {
      title: 'Local Sourcing',
      desc: 'We partner with local farms and vendors whenever possible to support our community.',
    },
    {
      title: 'Charity Events',
      desc: 'Discounted catering for non-profit fundraisers and community benefit events.',
    },
    {
      title: 'Food Donations',
      desc: 'Excess food from events is donated to local shelters and food banks.',
    },
    {
      title: 'Youth Employment',
      desc: 'Providing job opportunities and training for young people in our community.',
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-crock-dark overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-crock-orange rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-crock-green rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-crock-orange/20 border border-crock-orange/40 text-crock-orange px-4 py-2 rounded-full mb-6">
              <FaHandshake /> Community & Partnerships
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Community <span className="text-crock-orange">Partners</span>
            </h1>
            <p className="text-xl text-crock-gray-light mb-8 max-w-3xl mx-auto">
              We believe in the power of community. From our humble beginnings at Cherry Creek Farmers Market to today, partnerships have been at the heart of everything we do.
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
              Building relationships that strengthen our community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnerships.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-crock-dark to-crock-purple p-8 rounded-2xl text-white text-center shadow-xl"
              >
                <div className="text-crock-orange mb-4 flex justify-center">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.type}</h3>
                <p className="text-crock-gray-light text-sm">{item.desc}</p>
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
              Some of the amazing organizations we work with
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6">
            {featuredPartners.map((partner, index) => (
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
              Our commitment to making Denver a better place
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {communityInvolvement.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-crock-purple/30 p-6 rounded-xl border border-crock-orange/20"
              >
                <h3 className="text-xl font-bold text-crock-orange mb-2">{item.title}</h3>
                <p className="text-crock-gray-light">{item.desc}</p>
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
                We&apos;re always looking for great partners who share our values of quality, community, and exceptional service. Whether you&apos;re a venue, business, or organization, let&apos;s explore how we can work together.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FaHandshake className="text-crock-orange mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-crock-dark">Venue Partnerships</h4>
                    <p className="text-crock-gray text-sm">Preferred catering arrangements for your events</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaUsers className="text-crock-orange mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-crock-dark">Corporate Programs</h4>
                    <p className="text-crock-gray text-sm">Recurring catering with volume benefits</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaHeart className="text-crock-orange mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-crock-dark">Non-Profit Support</h4>
                    <p className="text-crock-gray text-sm">Special pricing for charitable organizations</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-crock-gray-light/20 p-8 rounded-2xl shadow-lg"
            >
              <h3 className="text-2xl font-bold text-crock-dark mb-6 text-center">
                Partner With Us
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
              &quot;The Crock Spot has been our go-to catering partner for years. Their food is consistently amazing, and they truly care about our community.&quot;
            </p>
            <p className="font-bold">— Local Event Partner</p>
          </motion.div>
        </div>
      </section>

      <CTASection
        title="Let's Crock Together"
        subtitle="Join our community of partners and let's create something special."
        variant="purple"
      />
    </div>
  );
}
