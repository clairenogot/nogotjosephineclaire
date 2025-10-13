import React from 'react'
import { Briefcase } from 'phosphor-react'
import { motion } from 'framer-motion'

const projects = [
  {title: 'Visual Branding & Logo Design', desc: 'Designed a vintage-themed logo for CNIMedia, a film agency representing nostalgia, Filipino culture, and creativity.'},
  {title: 'Web Development', desc: 'Exploring web technologies like Node.js, Vite, and React while developing a personal portfolio website.'},
  {title: 'Virtual Assistance & Professional Growth', desc: 'Building skills in virtual assistance, customer service, and web design through continuous learning via YouTube tutorials.'},
  {title: 'Printing Staff Experience', desc: 'Assisted in layout design and production tasks at a local print shop, ensuring quality and timely output.'},
]

export default function Projects(){
  return (
    <section id="projects" className="py-20">
      <div className="mx-auto max-w-5xl">
        <motion.h2 
          className="text-2xl font-semibold mb-6 flex items-center gap-2 dark:text-white"
          initial={{opacity: 0, x: -20}}
          whileInView={{opacity: 1, x: 0}}
          viewport={{once: true}}
          transition={{duration: 0.5}}
        >
          <Briefcase size={28} className="text-cozy-600 dark:text-cozy-300" /> Projects & Experience
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p, idx)=> (
          <motion.div 
            key={p.title} 
            initial={{opacity:0, y:20, scale:0.95}} 
            whileInView={{opacity:1, y:0, scale:1}} 
            viewport={{once:true, margin:"-60px"}}
            transition={{duration:0.5, delay:idx * 0.1, ease:[0.4, 0, 0.2, 1]}}
            whileHover={{y:-4, scale:1.02}}
            className="p-6 rounded-xl bg-white/70 dark:bg-gray-800/60 shadow-md hover:shadow-lg interactive-card"
          >
            <div className="font-medium text-lg dark:text-white mb-2">{p.title}</div>
            <div className="text-sm text-cozy-700 dark:text-gray-300 leading-relaxed">{p.desc}</div>
          </motion.div>
        ))}
        </div>
      </div>
    </section>
  )
}
