'use client';

import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaClock } from 'react-icons/fa';
import ContactForm from '@/components/ContactForm';
import CTASection from '@/components/CTASection';

// Import content from JSON
import contactContent from '@/content/contact.json';

// Icon mapping for contact info
const contactIcons: Record<string, React.ReactNode> = {
  'email': <FaEnvelope size={24} />,
  'location': <FaMapMarkerAlt size={24} />,
  'clock': <FaClock size={24} />,
};

export default function Contact() {
  const { hero, contactInfo, formSection, contactInfoSection, social, quickFacts, faqSection, cta } = contactContent;

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
              {hero.headline.includes('Connect') ? (
                <>Let&apos;s <span className="text-crock-orange">Connect</span></>
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

      {/* Contact Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-crock-dark mb-6">
                {formSection.headline.includes('Free Quote') ? (
                  <>Get Your <span className="text-crock-orange">Free Quote</span></>
                ) : (
                  formSection.headline
                )}
              </h2>
              <p className="text-crock-gray mb-8">
                {formSection.description}
              </p>
              <div className="bg-crock-gray-light/20 p-8 rounded-2xl shadow-lg">
                <ContactForm />
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-crock-dark mb-6">
                {contactInfoSection.headline.includes('Information') ? (
                  <>Contact <span className="text-crock-orange">Information</span></>
                ) : (
                  contactInfoSection.headline
                )}
              </h2>
              <p className="text-crock-gray mb-8">
                {contactInfoSection.description}
              </p>

              <div className="space-y-6 mb-10">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="bg-crock-orange/10 p-4 rounded-full text-crock-orange">
                      {contactIcons[item.icon] || <FaEnvelope size={24} />}
                    </div>
                    <div>
                      <h3 className="font-bold text-crock-dark">{item.title}</h3>
                      {item.link ? (
                        <a href={item.link} className="text-crock-orange hover:underline">
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-crock-gray">{item.content}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="bg-crock-dark p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4">{social.headline}</h3>
                <p className="text-crock-gray-light mb-6">
                  {social.description}
                </p>
                <div className="flex gap-4">
                  <a
                    href={social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-crock-orange/20 p-4 rounded-full text-crock-orange hover:bg-crock-orange hover:text-white transition-all"
                  >
                    <FaFacebook size={24} />
                  </a>
                  <a
                    href={social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-crock-orange/20 p-4 rounded-full text-crock-orange hover:bg-crock-orange hover:text-white transition-all"
                  >
                    <FaInstagram size={24} />
                  </a>
                </div>
              </div>

              {/* Quick Facts */}
              <div className="mt-10 bg-crock-orange/10 p-6 rounded-xl border border-crock-orange/30">
                <h3 className="font-bold text-crock-dark mb-4">{quickFacts.headline}</h3>
                <ul className="space-y-2 text-crock-gray">
                  {quickFacts.items.map((item, index) => (
                    <li key={index}>✓ {item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20 bg-crock-gray-light/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-crock-dark mb-4">
              {faqSection.headline}
            </h2>
            <p className="text-xl text-crock-gray mb-8">
              {faqSection.description}
            </p>
            <a
              href={faqSection.buttonLink}
              className="inline-block bg-crock-orange text-white px-8 py-4 rounded-full font-semibold hover:bg-crock-orange-dark transition-all"
            >
              {faqSection.buttonText}
            </a>
          </motion.div>
        </div>
      </section>

      <CTASection
        title={cta.headline}
        subtitle={cta.description}
        variant="dark"
      />
    </div>
  );
}
