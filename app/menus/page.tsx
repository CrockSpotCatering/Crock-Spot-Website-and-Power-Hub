'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaLeaf, FaBreadSlice, FaArrowRight } from 'react-icons/fa';
import CTASection from '@/components/CTASection';
import ContactForm from '@/components/ContactForm';

export default function Menus() {
  const bases = [
    { name: 'Steamed Sesame Rice', tags: ['GF', 'V'] },
    { name: 'Fluffy Couscous', tags: [] },
    { name: 'Hearty Pearled Barley', tags: [] },
    { name: 'Quinoa', tags: ['GF', 'V'] },
    { name: 'Cilantro Lime Rice', tags: ['GF', 'V'] },
    { name: 'Caraway Roasted Potatoes', tags: ['GF', 'V'] },
    { name: 'Healthy Grain Combo', tags: [] },
  ];

  const proteins = [
    { name: 'Southwest Chicken', tags: ['GF'], desc: 'Tender chicken with southwest spices' },
    { name: 'Salt-N-Pepa Chicken', tags: ['GF'], desc: 'Classic seasoned chicken' },
    { name: 'Tuscan Chicken', tags: ['GF'], desc: 'Italian herb-marinated chicken' },
    { name: 'Savory Pulled Pork', tags: ['GF'], desc: 'Slow-cooked to perfection' },
    { name: 'Apple Braised Pork', tags: ['GF'], desc: 'Sweet and savory pork' },
    { name: 'Jalapeño Shredded Beef', tags: ['GF'], desc: 'Bold and flavorful beef' },
    { name: 'Turkey Cardamom Meatballs', tags: [], desc: 'Aromatic turkey meatballs' },
    { name: 'Herb Roasted Lamb', tags: ['GF'], desc: '+$4 upgrade' },
    { name: 'Duck Confit', tags: ['GF'], desc: '+$5 upgrade' },
    { name: 'Irish Corned Beef', tags: ['GF'], desc: '+$4 upgrade' },
    { name: 'Coconut Root Veggie Curry', tags: ['GF', 'V', 'VG'], desc: 'Rich coconut curry with root vegetables' },
    { name: 'Curried Lentils with Hominy', tags: ['GF', 'V', 'VG'], desc: 'Hearty plant-based protein' },
    { name: 'Southwestern Bean Medley', tags: ['GF', 'V', 'VG'], desc: 'Flavorful bean mix' },
    { name: 'Beet Nut Balls', tags: ['V', 'VG'], desc: 'Creative vegan meatball alternative' },
    { name: 'Celtic White Bean Stew', tags: ['GF', 'V', 'VG'], desc: 'Comforting bean stew' },
    { name: 'Sautéed Tofu with Bok Choy', tags: ['GF', 'V', 'VG'], desc: 'Asian-inspired tofu dish' },
  ];

  const sauces = [
    { name: 'Chimichurri', heat: 'Mild', tags: ['GF', 'V'] },
    { name: 'Fresh Basil Tzatziki', heat: 'Mild', tags: ['GF', 'V'] },
    { name: 'Avocado Velvet', heat: 'Mild', tags: ['GF', 'V', 'VG'] },
    { name: 'Cuban Mojo', heat: 'Mild', tags: ['GF', 'V'] },
    { name: 'Boursin Cheese', heat: 'Mild', tags: ['GF', 'V'] },
    { name: 'Tangy Herb Mustard', heat: 'Mild', tags: ['GF', 'V'] },
    { name: 'Cranberry Wasabi', heat: 'Medium', tags: ['GF', 'V'] },
    { name: 'Gado Gado', heat: 'Medium', tags: ['GF', 'V', 'VG'] },
    { name: 'Miso Honey', heat: 'Medium', tags: ['GF', 'V'] },
    { name: 'Sriracha Sour Cream', heat: 'Medium', tags: ['GF', 'V'] },
    { name: 'Playa Fire', heat: 'Hot', tags: ['GF', 'V', 'VG'] },
    { name: "Esteban's Yucatan Fire", heat: 'Hot', tags: ['GF', 'V', 'VG'] },
  ];

  const toppers = [
    { name: 'Fresh Basil Corn Salad', tags: ['GF', 'V', 'VG'] },
    { name: 'Asian Slaw', tags: ['GF', 'V', 'VG'] },
    { name: 'Garden Gravy', tags: ['GF', 'V'] },
    { name: 'Summer Slaw', tags: ['GF', 'V', 'VG'] },
    { name: 'Sweet Corn Salad', tags: ['GF', 'V', 'VG'] },
    { name: 'Sautéed Veggies', tags: ['GF', 'V', 'VG'] },
    { name: 'Mixed Green Salad', tags: ['GF', 'V', 'VG'] },
    { name: 'Roasted Sweet Potatoes', tags: ['GF', 'V', 'VG'] },
  ];

  const appetizers = [
    { name: 'Artisan Grazing Table', price: '$13.75-$20.25/person', desc: 'Cheese, fruits, vegetables, crackers, dips, nuts' },
    { name: 'Caprese Skewers', price: '$5/person', desc: 'Fresh mozzarella, grape tomato, basil (2 per guest)' },
    { name: 'Meatballs in Carolina BBQ', price: '$5/person', desc: 'Beef and pork in tangy BBQ sauce (2 per guest)' },
    { name: 'Potato Cheddar Pierogies', price: '$6/person', desc: 'Locally made, fried, with crema dips (2 per guest)' },
    { name: 'Sliders', price: '$6/person', desc: 'Pulled pork or meatballs on Hawaiian buns' },
    { name: 'Crudité & Hummus', price: '$4-6/person', desc: 'Fresh cut veggies with hummus or spicy ranch' },
  ];

  const themedBars = [
    { name: 'Taco Bar', price: '$19/person' },
    { name: 'Tostada Bar', price: '$19/person' },
    { name: 'Nacho Bar', price: '$19/person' },
    { name: 'Chili Bar', price: '$19/person' },
    { name: 'Mac n Cheese Bar', price: '$22/person' },
  ];

  const breakfast = [
    { name: 'English Style Buffet', price: '$15-17/person', desc: 'Eggs, sausage, roasted potatoes, beans, mushrooms' },
    { name: 'Colorado Style Buffet', price: '$15-17/person', desc: 'Cheesy eggs, sausage, green chili potatoes, tortillas' },
    { name: 'Continental Board', price: '$14-16/person', desc: 'Croissants, egg bites, fruits, yogurts, pastries' },
    { name: 'Bagel Board', price: '$14-16/person', desc: 'Bagels, cream cheeses, peanut butter, jam, ham' },
    { name: 'Breakfast Burrito Board', price: '$14-16/person', desc: 'Meat and vegetarian burritos, salsa, sour cream' },
  ];

  const TagBadge = ({ tag }: { tag: string }) => {
    const colors: Record<string, string> = {
      GF: 'bg-crock-green text-white',
      V: 'bg-crock-purple text-white',
      VG: 'bg-crock-maroon text-white',
    };
    const labels: Record<string, string> = {
      GF: 'Gluten-Free',
      V: 'Vegetarian',
      VG: 'Vegan',
    };
    return (
      <span className={`text-xs px-2 py-0.5 rounded-full ${colors[tag]} font-medium`} title={labels[tag]}>
        {tag}
      </span>
    );
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-crock-dark overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80)',
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our <span className="text-crock-orange">Menus</span>
            </h1>
            <p className="text-xl text-crock-gray-light mb-8 max-w-3xl mx-auto">
              Build your own bowl with our signature bases, proteins, sauces, and toppers. Everything made fresh, never reheated.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="flex items-center gap-2 bg-crock-green/20 text-crock-green px-4 py-2 rounded-full">
                <FaBreadSlice /> GF = Gluten-Free
              </span>
              <span className="flex items-center gap-2 bg-crock-purple/20 text-crock-purple-light px-4 py-2 rounded-full">
                <FaLeaf /> V = Vegetarian
              </span>
              <span className="flex items-center gap-2 bg-crock-maroon/20 text-crock-maroon px-4 py-2 rounded-full">
                <FaLeaf /> VG = Vegan
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Build Your Bowl */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-crock-dark mb-4">
              Build Your Own <span className="text-crock-orange">Bowl</span>
            </h2>
            <p className="text-xl text-crock-gray">
              Food Truck Service: $16-18/person | Buffet Style: $18-20/person
            </p>
          </motion.div>

          {/* Bases */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-crock-dark mb-6 text-center">
              🍚 Step 1: Choose Your Base
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {bases.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-crock-gray-light/30 p-4 rounded-lg text-center"
                >
                  <p className="font-medium text-crock-dark">{item.name}</p>
                  <div className="flex gap-1 justify-center mt-2">
                    {item.tags.map((tag) => (
                      <TagBadge key={tag} tag={tag} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Proteins */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-crock-dark mb-6 text-center">
              🍖 Step 2: Pick Your Protein
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {proteins.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  className="bg-crock-gray-light/30 p-4 rounded-lg"
                >
                  <p className="font-bold text-crock-dark">{item.name}</p>
                  <p className="text-sm text-crock-gray">{item.desc}</p>
                  <div className="flex gap-1 mt-2">
                    {item.tags.map((tag) => (
                      <TagBadge key={tag} tag={tag} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sauces */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-crock-dark mb-6 text-center">
              🥣 Step 3: Add Your Sauce
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {sauces.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  className="bg-crock-gray-light/30 p-4 rounded-lg"
                >
                  <p className="font-bold text-crock-dark">{item.name}</p>
                  <p className={`text-sm ${
                    item.heat === 'Mild' ? 'text-crock-green' :
                    item.heat === 'Medium' ? 'text-crock-orange' :
                    'text-crock-maroon'
                  }`}>
                    🌶️ {item.heat}
                  </p>
                  <div className="flex gap-1 mt-2">
                    {item.tags.map((tag) => (
                      <TagBadge key={tag} tag={tag} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Toppers */}
          <div>
            <h3 className="text-2xl font-bold text-crock-dark mb-6 text-center">
              🥗 Step 4: Top It Off
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {toppers.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-crock-gray-light/30 p-4 rounded-lg text-center"
                >
                  <p className="font-medium text-crock-dark">{item.name}</p>
                  <div className="flex gap-1 justify-center mt-2">
                    {item.tags.map((tag) => (
                      <TagBadge key={tag} tag={tag} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Appetizers */}
      <section className="py-20 bg-crock-gray-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-crock-dark mb-4">
              Appetizers & <span className="text-crock-orange">Small Bites</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appetizers.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-crock-dark">{item.name}</h3>
                  <span className="text-crock-orange font-bold">{item.price}</span>
                </div>
                <p className="text-crock-gray text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Themed Bars */}
      <section className="py-20 bg-crock-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              BYO <span className="text-crock-orange">Themed Bars</span>
            </h2>
            <p className="text-crock-gray-light">Interactive food stations for your guests</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6">
            {themedBars.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-crock-purple/30 px-8 py-6 rounded-xl border border-crock-orange/30 text-center"
              >
                <h3 className="text-xl font-bold">{item.name}</h3>
                <p className="text-crock-orange text-lg">{item.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Breakfast */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-crock-dark mb-4">
              Breakfast <span className="text-crock-orange">Options</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {breakfast.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-crock-gray-light/30 p-6 rounded-xl"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-crock-dark">{item.name}</h3>
                  <span className="text-crock-orange font-bold">{item.price}</span>
                </div>
                <p className="text-crock-gray text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-crock-gray-light/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-crock-dark mb-4">
              Request a <span className="text-crock-orange">Custom Menu</span>
            </h2>
            <p className="text-xl text-crock-gray">
              Let us design the perfect menu for your event
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>

      <CTASection
        title="Crock Hard & Crock Often"
        subtitle="Ready to build the perfect menu for your event? Let's talk!"
        variant="orange"
      />
    </div>
  );
}
