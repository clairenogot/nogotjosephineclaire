import React from 'react'
import { motion } from 'framer-motion'

const skills = [
  { title: 'Graphic Design', desc: 'Canva, layout and template creation', img: '/assets/graphic-icon.png' },
  { title: 'Copywriting & Content Creation', desc: 'Engaging captions and ad copy', img: '/assets/content-icon.png' },
  { title: 'Social Media Management', desc: 'Content planning and scheduling', img: '/assets/socialmedia-icon.png' },
  { title: 'Virtual Assistance & Organization', desc: 'Email and calendar management, file organization and task tracking', img: '/assets/calendar-icon.png' },
  { title: 'Web Design & Branding', desc: 'Landing page and portfolio design', img: '/assets/webdesign-icon.png' },
  { title: 'Time Management & Problem-Solving', desc: 'Adapting quickly to new tools and challenges', img: '/assets/time-icon.png' },
]

export default function Skills() {
  return (
    <section id="skills" className="py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-5xl">
        <motion.h2 
          className="text-2xl font-semibold mb-6 flex items-center gap-2 dark:text-white"
          initial={{opacity: 0, x: -20}}
          whileInView={{opacity: 1, x: 0}}
          viewport={{once: true}}
          transition={{duration: 0.5}}
        >
          Skills
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((s) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="p-4 rounded-xl bg-white/70 dark:bg-gray-800/60 shadow-md hover:shadow-lg interactive-card"
              >
                <div className="flex items-center gap-3">
                  <img src={s.img} alt={`${s.title} Icon`} className="w-7 h-7 object-contain icon-img" />
                  <div>
                    <div className="font-medium dark:text-white">{s.title}</div>
                    {s.desc && <div className="text-sm text-cozy-700 dark:text-gray-300">{s.desc}</div>}
                  </div>
                </div>
              </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
