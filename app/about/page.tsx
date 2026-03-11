'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FaAward,
  FaUsers,
  FaHeart,
  FaTruck,
  FaArrowRight,
  FaQuoteLeft,
} from 'react-icons/fa';
import CTASection from '@/components/CTASection';
import ContactForm from '@/components/ContactForm';

export default function About() {
  const milestones = [
    { year: '2010', title: 'The Beginning', desc: 'Started at Cherry Creek Farmers Market with a 10x10 tent and a dream.' },
    { year: '2011', title: 'First Food Truck', desc: 'Expanded to our first gourmet food truck, bringing mobile cuisine to Denver.' },
    { year: '2015', title: 'Award Winners', desc: 'Named Best Food Truck in Denver by 5280 Magazine.' },
    { year: '2017', title: 'Growing Team', desc: 'Peter joins as co-partner, expanding our multi-truck operation.' },
    { year: '2020', title: 'National Recognition', desc: 'Featured in Business Insider\'s 50 Coolest Small Businesses in America.' },
    { year: '2025', title: 'Today', desc: '15+ years strong, serving thousands of events across Colorado.' },
  ];

  const values = [
    {
      icon: <FaHeart size={40} />,
      title: 'People First',
      desc: 'Our mission is simple: make people happy with amazing food — and have a blast doing it!',
    },
    {
      icon: <FaUsers size={40} />,
      title: 'Team Spirit',
      desc: 'Our Crock Stars are a tight-knit, dynamic, loyal, and downright fun group.',
    },
    {
      icon: <FaTruck size={40} />,
      title: 'Fresh Always',
      desc: 'Food truck advantage means fresh cooking on-site. Never bagged, boxed, or reheated.',
    },
    {
      icon: <FaAward size={40} />,
      title: 'Excellence',
      desc: 'Award-winning cuisine and service that makes every event memorable.',
    },
  ];

  const awards = [
    { title: 'Best Food Truck in Denver', source: '5280 Magazine' },
    { title: 'Best Meals on Wheels', source: 'Westword Magazine' },
    { title: '50 Coolest Small Businesses in America', source: 'Business Insider' },
  ];

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
              Our <span className="text-crock-orange">Story</span>
            </h1>
            <p className="text-xl text-crock-gray-light mb-8 max-w-3xl mx-auto">
              From a humble 10x10 tent at Cherry Creek Farmers Market to Denver&apos;s award-winning catering company — this is The Crock Spot story.
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
                  backgroundImage: 'url(https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
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
                In May 2010, Steven and Mandy set up a humble 10x10 tent at the Cherry Creek Farmers Market with one mission: <strong>deliver gourmet, fast-casual meals that are 100% customizable to every guest&apos;s taste.</strong>
              </p>
              <p className="text-lg text-crock-gray mb-6">
                What started as a weekend passion project quickly grew into something bigger. By 2011, they had their first food truck. By 2017, they welcomed co-partner Peter and expanded to a multi-truck operation serving events across Colorado.
              </p>
              <div className="bg-crock-orange/10 p-6 rounded-xl border-l-4 border-crock-orange">
                <FaQuoteLeft className="text-crock-orange mb-2" />
                <p className="text-crock-dark italic">
                  &quot;Our guiding principle has remained the same since day one: make people happy with amazing food — and have a blast doing it!&quot;
                </p>
                <p className="text-crock-orange font-semibold mt-2">— Steven & Mandy, Founders</p>
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
              Our Journey
            </h2>
            <p className="text-xl text-crock-gray">15+ years of serving Denver with love</p>
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
                      <p className="text-crock-gray">{milestone.desc}</p>
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
                <div className="text-crock-orange mb-4 flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-bold text-crock-dark mb-2">{value.title}</h3>
                <p className="text-crock-gray">{value.desc}</p>
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
              Awards & <span className="text-crock-orange">Recognition</span>
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
              Let&apos;s <span className="text-crock-orange">Connect</span>
            </h2>
            <p className="text-xl text-crock-gray">
              Ready to work with Denver&apos;s favorite catering team?
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
        title="I Wanna Crock!"
        subtitle="Join our family of satisfied customers and let us crock your next event."
        variant="purple"
      />
    </div>
  );
}
