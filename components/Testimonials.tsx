'use client';

import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    quote: "The Crock Spot made our corporate event unforgettable. The food was incredible, and our team couldn't stop raving about the build-your-own bowl concept. Served 200+ people in under an hour!",
    author: "Sarah M.",
    title: "Event Coordinator, Tech Startup",
    rating: 5,
  },
  {
    quote: "We hired The Crock Spot for our wedding reception and it was the best decision we made. The food truck added such a unique touch, and guests are STILL talking about those rice bowls!",
    author: "Jake & Emily",
    title: "Wedding Clients",
    rating: 5,
  },
  {
    quote: "As someone with dietary restrictions, I was blown away by how accommodating they were. Gluten-free, vegan-friendly, and absolutely delicious. Best catering experience I've ever had!",
    author: "Michael R.",
    title: "Corporate Client",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-crock-dark mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-crock-gray">
            Don&apos;t just take our word for it - hear from our happy customers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-crock-gray-light/30 p-6 md:p-8 rounded-2xl shadow-lg relative"
            >
              <FaQuoteLeft className="text-crock-orange/30 text-4xl absolute top-4 left-4" />
              <div className="flex mb-4 pt-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-crock-orange" />
                ))}
              </div>
              <p className="text-crock-dark mb-6 italic">&quot;{testimonial.quote}&quot;</p>
              <div className="border-t border-crock-gray-light pt-4">
                <p className="font-semibold text-crock-dark">{testimonial.author}</p>
                <p className="text-sm text-crock-gray">{testimonial.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
