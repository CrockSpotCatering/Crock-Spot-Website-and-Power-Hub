'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

const faqs = [
  {
    question: "What makes The Crock Spot different from other caterers?",
    answer: "Our food truck advantage means your food is cooked fresh on-site and never has to be bagged, boxed, or reheated. Plus, our quick-serve concept means guests are served in 25 seconds or less! With 15+ years of experience, we bring the full restaurant experience directly to your event."
  },
  {
    question: "What areas do you serve?",
    answer: "We serve the entire Denver Metro area, the Front Range from Fort Collins to Colorado Springs, and mountain regions including Vail, Breckenridge, and Aspen. Contact us to discuss your specific location!"
  },
  {
    question: "Do you accommodate dietary restrictions?",
    answer: "Absolutely! We offer extensive gluten-free, vegetarian, and vegan options. Our build-your-own bowl concept allows guests to customize their meal to their dietary needs. We mark all dietary options clearly on our menus."
  },
  {
    question: "How far in advance should I book?",
    answer: "We recommend booking at least 2-4 weeks in advance for corporate events and 3-6 months for weddings. However, we can sometimes accommodate last-minute requests depending on our schedule!"
  },
  {
    question: "What is your pricing structure?",
    answer: "Our pricing ranges from $14-22 per person depending on the service style. Food truck service starts at $16-18/person, buffet style at $18-20/person, and themed bars (taco, chili, mac & cheese) at $19-22/person. We offer custom quotes for all events."
  },
  {
    question: "Do you provide everything needed for service?",
    answer: "Yes! We provide all serving equipment, utensils, plates, and napkins. For food truck service, we bring the entire kitchen on wheels. For buffet service, we set up everything needed for a seamless experience."
  },
  {
    question: "Can you create custom menus?",
    answer: "We love creating custom menus! Whether it's a specialty bowl for your wedding or a themed menu for a corporate event, we work with you to design the perfect spread. We pride ourselves on flexibility and creativity."
  },
  {
    question: "What types of events do you cater?",
    answer: "We cater everything from corporate lunches and team-building events to weddings, birthday parties, graduations, family reunions, and large festivals. If there's food involved, we can Crock it!"
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-20 bg-crock-gray-light/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-crock-dark mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-crock-gray">
            Everything you need to know about working with The Crock Spot
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-crock-orange/5 transition-colors"
              >
                <span className="font-semibold text-crock-dark pr-4">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-crock-orange flex-shrink-0"
                >
                  <FaChevronDown />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-crock-gray">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
