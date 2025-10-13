import React from 'react'
import { PawPrint } from 'phosphor-react'
import { motion } from 'framer-motion'

export default function Home(){
  return (
    <section id="home" className="min-h-screen flex items-center pt-24">
  <div className="w-full grid grid-cols-1 gap-6 items-center">
        <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.1}} className="relative mx-auto max-w-3xl p-8 pt-20 rounded-2xl bg-white/70 dark:bg-gray-800/60 backdrop-blur-md shadow-md overflow-visible text-center">
          <div className="absolute left-1/2 -translate-x-1/2 -top-12">
            <motion.img src="/assets/profile-pic.png" alt="Profile photo of Josephine Claire" className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-white shadow-lg dark:border-gray-800" animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }} whileHover={{ scale: 1.03 }} />
          </div>
          <h1 className="mt-8 text-3xl md:text-4xl font-semibold">Hi, I’m Josephine Claire Nogot</h1>
          <p className="mt-4 text-cozy-700 dark:text-gray-200">I’m an aspiring Virtual Assistant and Customer Service Representative with a passion for creativity and design. I love bringing ideas to life through organizing tasks, helping clients, and creating layouts for digital materials. Every project is an opportunity for me to learn, grow, and create something meaningful.</p>
        </motion.div>
        
      </div>
    </section>
  )
}
