import React, { useState } from 'react'
import { PawPrint, MusicNotes } from 'phosphor-react'
import { motion } from 'framer-motion'
import TalkToCat from '../games/TalkToCat'

export default function CatGame(){
  return (
    <section id="cat-game" className="py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-4xl">
        <motion.h2 
          initial={{opacity:0, x:-20}} 
          whileInView={{opacity:1, x:0}} 
          viewport={{once:true, margin:"-50px"}} 
          transition={{duration:0.5, ease:[0.4, 0, 0.2, 1]}} 
          className="text-2xl font-semibold mb-6"
        >
          Cozy Chat — Talk to Mochi 🐾
        </motion.h2>
        <motion.div 
          initial={{opacity:0, y:20, scale:0.95}} 
          whileInView={{opacity:1, y:0, scale:1}} 
          viewport={{once:true, margin:"-50px"}} 
          transition={{duration:0.5, ease:[0.4, 0, 0.2, 1]}} 
          className="p-6 rounded-xl bg-white/70 dark:bg-gray-800/60 shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <motion.div 
            initial={{opacity:0, y:10}} 
            whileInView={{opacity:1, y:0}} 
            viewport={{once:true}} 
            transition={{delay:0.2, duration:0.4}} 
            className="p-4 rounded-lg bg-cozy-50/60 dark:bg-gray-700/50"
          >
            <h3 className="font-medium">Talk to Mochi <span className="ml-2 text-cozy-600">🐱</span></h3>
            <p className="text-sm mt-2 text-cozy-700 dark:text-gray-300">A short, branching chat with Mochi the Cat — pick responses and follow cozy paths.</p>
          </motion.div>

          <div className="mt-6">
            <TalkToCat />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
