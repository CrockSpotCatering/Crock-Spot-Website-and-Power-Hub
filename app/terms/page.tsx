'use client';

import { motion } from 'framer-motion';

export default function Terms() {
  return (
    <div className="min-h-screen pt-20">
      <section className="py-20 bg-crock-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Terms of <span className="text-crock-orange">Service</span>
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
              <h2 className="text-2xl font-bold text-crock-dark">Catering Services</h2>
              <p className="text-crock-gray">
                The Crock Spot provides food truck catering, buffet-style catering, and related food services for events throughout the Denver metro area and Colorado. All services are subject to availability and confirmation.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-crock-dark">Booking & Deposits</h2>
              <p className="text-crock-gray">
                A deposit may be required to secure your event date. Specific deposit amounts and payment terms will be outlined in your catering agreement.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-crock-dark">Cancellation Policy</h2>
              <p className="text-crock-gray">
                Cancellation policies vary based on event size and timing. Please refer to your catering agreement for specific terms. We recommend notifying us as soon as possible if you need to cancel or reschedule.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-crock-dark">Guest Count</h2>
              <p className="text-crock-gray">
                Final guest counts are typically due 5-7 days before your event. You may be charged for the guaranteed minimum if actual attendance is lower.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-crock-dark">Dietary Accommodations</h2>
              <p className="text-crock-gray">
                We offer gluten-free, vegetarian, and vegan options. Please inform us of any allergies or dietary restrictions when booking. While we take precautions, we cannot guarantee a completely allergen-free environment.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-crock-dark">Liability</h2>
              <p className="text-crock-gray">
                The Crock Spot carries comprehensive liability insurance. However, we are not responsible for injuries or damages caused by third parties, venue conditions, or circumstances beyond our control.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-crock-dark">Contact</h2>
              <p className="text-crock-gray">
                For questions about these terms, please contact us at{' '}
                <a href="mailto:steven@thecrockspot.com" className="text-crock-orange hover:underline">
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
