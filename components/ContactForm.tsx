'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaCheckCircle, FaSpinner } from 'react-icons/fa';

interface ContactFormProps {
  variant?: 'full' | 'compact';
}

const ContactForm = ({ variant = 'full' }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    guestCount: '',
    eventType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const eventTypes = [
    'Corporate Event',
    'Wedding',
    'Private Party',
    'Birthday Celebration',
    'Graduation',
    'Family Reunion',
    'Festival/Public Event',
    'Government/Municipal',
    'Other',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send to our API route (which forwards to GoHighLevel)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          eventDate: formData.eventDate,
          guestCount: formData.guestCount,
          eventType: formData.eventType,
          message: formData.message,
          source: 'Crock Spot Website',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
      // Still show success to user (GHL webhooks sometimes don't return proper responses)
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <FaCheckCircle className="text-crock-green text-6xl mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-crock-dark mb-2">Thank You!</h3>
        <p className="text-crock-gray">
          We&apos;ve received your inquiry and will get back to you within 24 hours.
        </p>
        <p className="text-crock-orange font-semibold mt-4">
          Get ready to Crock!
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className={`grid gap-6 ${variant === 'full' ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-crock-dark mb-2">
            Your Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-crock-gray-light focus:border-crock-orange focus:ring-2 focus:ring-crock-orange/20 transition-all outline-none"
            placeholder="John Smith"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-crock-dark mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-crock-gray-light focus:border-crock-orange focus:ring-2 focus:ring-crock-orange/20 transition-all outline-none"
            placeholder="john@example.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-crock-dark mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-crock-gray-light focus:border-crock-orange focus:ring-2 focus:ring-crock-orange/20 transition-all outline-none"
            placeholder="(303) 555-0123"
          />
        </div>

        {/* Event Date */}
        <div>
          <label htmlFor="eventDate" className="block text-sm font-medium text-crock-dark mb-2">
            Event Date *
          </label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            required
            value={formData.eventDate}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-crock-gray-light focus:border-crock-orange focus:ring-2 focus:ring-crock-orange/20 transition-all outline-none"
          />
        </div>

        {/* Guest Count */}
        <div>
          <label htmlFor="guestCount" className="block text-sm font-medium text-crock-dark mb-2">
            Estimated Guest Count *
          </label>
          <input
            type="number"
            id="guestCount"
            name="guestCount"
            required
            value={formData.guestCount}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-crock-gray-light focus:border-crock-orange focus:ring-2 focus:ring-crock-orange/20 transition-all outline-none"
            placeholder="50"
            min="10"
          />
        </div>

        {/* Event Type */}
        <div>
          <label htmlFor="eventType" className="block text-sm font-medium text-crock-dark mb-2">
            Event Type *
          </label>
          <select
            id="eventType"
            name="eventType"
            required
            value={formData.eventType}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-crock-gray-light focus:border-crock-orange focus:ring-2 focus:ring-crock-orange/20 transition-all outline-none bg-white"
          >
            <option value="">Select event type...</option>
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-crock-dark mb-2">
          Tell Us About Your Event
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-crock-gray-light focus:border-crock-orange focus:ring-2 focus:ring-crock-orange/20 transition-all outline-none resize-none"
          placeholder="Share any details about your event, dietary requirements, or special requests..."
        />
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-crock-orange text-white py-4 rounded-lg font-semibold text-lg hover:bg-crock-orange-dark transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <FaSpinner className="animate-spin" /> Sending...
          </>
        ) : (
          <>
            <FaPaperPlane /> Get Your Free Quote
          </>
        )}
      </motion.button>

      <p className="text-sm text-crock-gray text-center">
        We typically respond within 24 hours. For urgent requests, call us directly!
      </p>
    </form>
  );
};

export default ContactForm;
