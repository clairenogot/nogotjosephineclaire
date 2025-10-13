import React from 'react'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="p-6 rounded-2xl bg-white/70 dark:bg-gray-800/60 backdrop-blur-md shadow-lg hover:shadow-xl interactive-card"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2 dark:text-white">
            <img src="/assets/about-icon.png" alt="About Icon" className="w-6 h-6 rounded-md icon-img" /> 
            About Me
          </h2>
          <p className="mt-4 text-cozy-700 dark:text-gray-200">
            Hi! I’m Claire, an aspiring Web Designer, Customer Service Representative, and Virtual Assistant from the Philippines. 
            I’m currently pursuing my degree while exploring the world of digital creation and online work. 
            I’ve always loved expressing ideas through design and writing. Over time, I’ve developed skills in copywriting, design, and social media management, 
            which helped me discover how creativity can make a real difference. 
            Now, I’m diving deeper into web design and virtual assistance, where I can blend creativity, organization, and purpose.
          </p>
          <p className="mt-4 text-cozy-700 dark:text-gray-200">
            As a future Virtual Assistant, my goal is to help clients bring their ideas to life and support them in growing their businesses. 
            I enjoy creating meaningful connections, keeping things organized, and making each task a little brighter and more efficient. 
            When I’m not working or studying, I love reading, watching Korean dramas or movies, and coming up with new business ideas that spark my curiosity. 
            I’m also a proud cat lover, which you can probably tell from the little details around my website that add a cozy and playful touch.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
