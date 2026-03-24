'use client';

import { motion } from 'framer-motion';

export default function Privacy() {
  return (
    <div className="min-h-screen pt-20">
      <section className="py-20 bg-crock-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Privacy <span className="text-crock-orange">Policy</span>
            </h1>
            <p className="text-crock-gray-light">Last updated: March 2026</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-crock-dark">Information We Collect</h2>
              <p className="text-crock-gray">
                When you submit a catering inquiry through our website, we collect your name, email address, phone number, event details, and any other information you choose to provide. This information is used solely to respond to your inquiry and provide our catering services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-crock-dark">How We Use Your Information</h2>
              <p className="text-crock-gray">
                We use the information you provide to:
              </p>
              <ul className="list-disc pl-6 text-crock-gray space-y-2">
                <li>Respond to your catering inquiries</li>
                <li>Provide quotes and event planning assistance</li>
                <li>Communicate about your events</li>
                <li>Send occasional updates about our services (with your consent)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-crock-dark">Information Sharing</h2>
              <p className="text-crock-gray">
                We do not sell, trade, or otherwise transfer your personal information to third parties. Your information is kept confidential and is only used for the purposes stated above.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-crock-dark">Data Security</h2>
              <p className="text-crock-gray">
                We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-crock-dark">Contact Us</h2>
              <p className="text-crock-gray">
                If you have questions about this privacy policy, please contact us at{' '}
                <a href="mailto:steven@thecrockspot.com" target="_blank" rel="noopener noreferrer" className="text-crock-orange hover:underline">
                  steven@thecrockspot.com
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
