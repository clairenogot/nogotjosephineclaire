import React from 'react'
import { GraduationCap } from 'phosphor-react'
import { motion } from 'framer-motion'

const education = [
  {
    title: 'Bachelor of Science in Information Technology', 
    school: 'Polytechnic University of the Philippines', 
    location: 'San Juan City',
    years: '2022 – Present',
    image: '/assets/PUP-logo.png'
  },
  {
    title: 'Senior High School (Grade 11–12)', 
    school: 'Gateways Institute of Science and Technology', 
    location: 'Antipolo City',
    years: '2020 – 2022',
    image: '/assets/GIST-logo.png'
  },
  {
    title: 'Junior High School (Grade 7–10)', 
    school: 'Antipolo National High School', 
    location: 'Antipolo City',
    years: '2016 – 2020',
    image: '/assets/ANHS-logo.png'
  },
]

export default function Education() {
  return (
    <section id="education" className="py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl font-semibold mb-8 flex items-center gap-2 dark:text-white">
          <GraduationCap size={28} className="text-cozy-600 dark:text-cozy-300" /> 
          Education
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {education.map((e) => (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              whileHover={{ y: -6, scale: 1.03 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="relative p-6 rounded-2xl bg-white/80 dark:bg-gray-800/70 shadow-lg hover:shadow-2xl interactive-card overflow-hidden"
            >
              {/* Decorative top gradient bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cozy-400 via-cozy-500 to-cozy-600" />
              
              {/* School Logo */}
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cozy-200 to-cozy-300 dark:from-gray-700 dark:to-gray-700 flex items-center justify-center shadow-md overflow-hidden">
                  {e.image ? (
                    <img
                      src={e.image}
                      alt={`${e.school} Logo`}
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <GraduationCap
                      size={36}
                      className="text-cozy-600 dark:text-gray-300"
                      weight="fill"
                    />
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-base text-cozy-900 dark:text-white leading-snug">
                  {e.title}
                </h3>
                <p className="text-sm text-cozy-700 dark:text-gray-300 font-medium">
                  {e.school}
                </p>
                <p className="text-xs text-cozy-600 dark:text-gray-400">
                  {e.location}
                </p>
                <div className="pt-2 mt-2 border-t border-cozy-200 dark:border-gray-600">
                  <p className="text-xs text-cozy-500 dark:text-gray-400 font-medium">
                    {e.years}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
