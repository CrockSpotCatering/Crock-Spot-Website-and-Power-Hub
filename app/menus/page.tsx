'use client';

import { motion } from 'framer-motion';
import { FaLeaf, FaBreadSlice, FaStar, FaSnowflake, FaGlassWhiskey, FaCookie } from 'react-icons/fa';
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
    softDrinksSection,
    softDrinks,
    dessertsSection,
    desserts,
    dessertNote,
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

  const HeatBadge = ({ heat }: { heat: string }) => {
    const getColor = () => {
      if (heat === 'Mild') return 'text-crock-green';
      if (heat === 'Medium' || heat === 'Mild/Medium') return 'text-crock-orange';
      return 'text-red-500';
    };
    return (
      <span className={`text-xs font-medium ${getColor()}`}>
        🌶️ {heat}
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
              Our <span className="text-crock-orange">Menus</span>
            </h1>
            <p className="text-xl text-crock-gray-light mb-8 max-w-3xl mx-auto">
              {hero.subheadline}
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm">
              <span className="flex items-center gap-1 sm:gap-2 bg-crock-green/20 text-crock-green px-3 sm:px-4 py-2 rounded-full">
                <FaBreadSlice className="text-xs sm:text-sm" /> GF = {dietaryLegend.GF}
              </span>
              <span className="flex items-center gap-1 sm:gap-2 bg-crock-purple/20 text-crock-purple-light px-3 sm:px-4 py-2 rounded-full">
                <FaLeaf className="text-xs sm:text-sm" /> V = {dietaryLegend.V}
              </span>
              <span className="flex items-center gap-1 sm:gap-2 bg-crock-maroon/20 text-crock-maroon px-3 sm:px-4 py-2 rounded-full">
                <FaLeaf className="text-xs sm:text-sm" /> VG = {dietaryLegend.VG}
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
            <p className="text-xl text-crock-gray mb-6">
              {buildYourBowl.subheadline}
            </p>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-crock-gray mb-4">
                {buildYourBowl.intro}
              </p>
              <p className="text-lg text-crock-gray bg-crock-orange/10 p-4 rounded-xl border-l-4 border-crock-orange">
                {buildYourBowl.customNote}
              </p>
            </div>
          </motion.div>

          {/* Bases */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-crock-dark mb-6 text-center">
              {basesSection.emoji} {basesSection.title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {bases.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-crock-gray-light/30 p-4 rounded-lg"
                >
                  <p className="font-bold text-crock-dark text-sm sm:text-base">{item.name}</p>
                  <p className="text-xs sm:text-sm text-crock-gray mt-1">{item.description}</p>
                  <div className="flex gap-1 mt-2">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {proteins.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  className={`bg-crock-gray-light/30 p-4 rounded-lg ${item.premium ? 'ring-2 ring-crock-orange' : ''} ${item.seasonal ? 'ring-2 ring-crock-purple' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <p className="font-bold text-crock-dark">{item.name}</p>
                    <div className="flex gap-1">
                      {item.premium && (
                        <span className="text-crock-orange text-xs flex items-center gap-1" title="Premium">
                          <FaStar /> Premium
                        </span>
                      )}
                      {item.seasonal && (
                        <span className="text-crock-purple text-xs flex items-center gap-1" title="Seasonal">
                          <FaSnowflake /> Seasonal
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-crock-gray mt-1">{item.description}</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sauces.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  className="bg-crock-gray-light/30 p-4 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-bold text-crock-dark">{item.name}</p>
                    <HeatBadge heat={item.heat} />
                  </div>
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

          {/* Toppers */}
          <div>
            <h3 className="text-2xl font-bold text-crock-dark mb-2 text-center">
              {toppersSection.emoji} {toppersSection.title}
            </h3>
            <p className="text-center text-crock-gray mb-6">{toppersSection.note}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {toppers.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-crock-gray-light/30 p-4 rounded-lg"
                >
                  <p className="font-bold text-crock-dark">{item.name}</p>
                  <p className="text-sm text-crock-gray mt-1">{item.description}</p>
                  <div className="flex gap-1 mt-2">
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
            <h2 className="text-4xl font-bold text-crock-dark mb-2">
              <span className="text-crock-orange">{appetizersSection.headline}</span>
            </h2>
            <p className="text-xl text-crock-orange font-semibold mb-4">{appetizersSection.subheadline}</p>
            <p className="text-lg text-crock-gray max-w-3xl mx-auto">{appetizersSection.intro}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appetizers.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative overflow-hidden rounded-xl shadow-md min-h-[200px]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${item.image})`,
                    opacity: 0.5,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="relative p-6 h-full flex flex-col justify-end">
                  <h3 className="font-bold text-white text-lg mb-2 drop-shadow-lg">{item.name}</h3>
                  <p className="text-white/90 text-sm drop-shadow">{item.description}</p>
                </div>
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
                <p className="text-crock-gray-light text-sm mt-1">{item.description}</p>
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
                className="relative overflow-hidden rounded-xl shadow-md min-h-[180px]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${item.image})`,
                    opacity: 0.5,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="relative p-6 h-full flex flex-col justify-end">
                  <h3 className="font-bold text-white text-lg mb-2 drop-shadow-lg">{item.name}</h3>
                  <p className="text-white/90 text-sm drop-shadow">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Soft Drinks & Desserts */}
      <section className="py-20 bg-crock-gray-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Soft Drinks */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <FaGlassWhiskey className="text-crock-orange text-3xl" />
                <h2 className="text-3xl font-bold text-crock-dark">
                  {softDrinksSection.headline}
                </h2>
              </div>
              <p className="text-crock-gray mb-6">{softDrinksSection.intro}</p>
              <div className="space-y-4">
                {softDrinks.map((item, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-bold text-crock-dark">{item.name}</h3>
                    <p className="text-crock-gray text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Desserts */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <FaCookie className="text-crock-orange text-3xl" />
                <h2 className="text-3xl font-bold text-crock-dark">
                  {dessertsSection.headline}
                </h2>
              </div>
              <p className="text-crock-gray mb-6">{dessertsSection.intro}</p>
              <div className="grid grid-cols-2 gap-3">
                {desserts.map((item, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-bold text-crock-dark">{item.name}</h3>
                    <p className="text-crock-gray text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
              <p className="text-crock-orange font-medium mt-4 text-center italic">
                {dessertNote}
              </p>
            </motion.div>
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
            <h2 className="text-4xl font-bold text-crock-dark mb-4">
              Request a <span className="text-crock-orange">Custom Menu</span>
            </h2>
            <p className="text-xl text-crock-gray">
              {cta.description}
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

      <CTASection
        title={finalCta.headline}
        subtitle={finalCta.description}
        variant="orange"
      />
    </div>
  );
}
