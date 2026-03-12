'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaLeaf, FaBreadSlice, FaArrowRight } from 'react-icons/fa';
import CTASection from '@/components/CTASection';
import ContactForm from '@/components/ContactForm';

// Import content from JSON
import menusContent from '@/content/menus.json';

export default function Menus() {
  const {
    hero,
    buildYourBowl,
    basesSection,
    bases,
    proteinsSection,
    proteins,
    saucesSection,
    sauces,
    toppersSection,
    toppers,
    appetizersSection,
    appetizers,
    themedBarsSection,
    themedBars,
    breakfastSection,
    breakfast,
    dietaryLegend,
    cta,
    finalCta
  } = menusContent;

  const TagBadge = ({ tag }: { tag: string }) => {
    const colors: Record<string, string> = {
      GF: 'bg-crock-green text-white',
      V: 'bg-crock-purple text-white',
      VG: 'bg-crock-maroon text-white',
    };
    return (
      <span className={`text-xs px-2 py-0.5 rounded-full ${colors[tag]} font-medium`} title={dietaryLegend[tag as keyof typeof dietaryLegend]}>
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
            backgroundImage: `url(${hero.backgroundImage})`,
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {hero.headline.includes('Menus') ? (
                <>Our <span className="text-crock-orange">Menus</span></>
              ) : (
                hero.headline
              )}
            </h1>
            <p className="text-xl text-crock-gray-light mb-8 max-w-3xl mx-auto">
              {hero.subheadline}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="flex items-center gap-2 bg-crock-green/20 text-crock-green px-4 py-2 rounded-full">
                <FaBreadSlice /> GF = {dietaryLegend.GF}
              </span>
              <span className="flex items-center gap-2 bg-crock-purple/20 text-crock-purple-light px-4 py-2 rounded-full">
                <FaLeaf /> V = {dietaryLegend.V}
              </span>
              <span className="flex items-center gap-2 bg-crock-maroon/20 text-crock-maroon px-4 py-2 rounded-full">
                <FaLeaf /> VG = {dietaryLegend.VG}
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
              {buildYourBowl.headline.includes('Bowl') ? (
                <>Build Your Own <span className="text-crock-orange">Bowl</span></>
              ) : (
                buildYourBowl.headline
              )}
            </h2>
            <p className="text-xl text-crock-gray">
              {buildYourBowl.subheadline}
            </p>
          </motion.div>

          {/* Bases */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-crock-dark mb-6 text-center">
              {basesSection.emoji} {basesSection.title}
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
              {proteinsSection.emoji} {proteinsSection.title}
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
                  <p className="text-sm text-crock-gray">{item.description}</p>
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
              {saucesSection.emoji} {saucesSection.title}
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
              {toppersSection.emoji} {toppersSection.title}
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
              {appetizersSection.headline.includes('Small Bites') ? (
                <>Appetizers & <span className="text-crock-orange">Small Bites</span></>
              ) : (
                appetizersSection.headline
              )}
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
                <p className="text-crock-gray text-sm">{item.description}</p>
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
              {themedBarsSection.headline.includes('Themed Bars') ? (
                <>BYO <span className="text-crock-orange">Themed Bars</span></>
              ) : (
                themedBarsSection.headline
              )}
            </h2>
            <p className="text-crock-gray-light">{themedBarsSection.subheadline}</p>
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
              {breakfastSection.headline.includes('Options') ? (
                <>Breakfast <span className="text-crock-orange">Options</span></>
              ) : (
                breakfastSection.headline
              )}
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
                <p className="text-crock-gray text-sm">{item.description}</p>
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
              {cta.headline.includes('Custom Menu') ? (
                <>Request a <span className="text-crock-orange">Custom Menu</span></>
              ) : (
                cta.headline
              )}
            </h2>
            <p className="text-xl text-crock-gray">
              {cta.description}
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
        title={finalCta.headline}
        subtitle={finalCta.description}
        variant="orange"
      />
    </div>
  );
}
