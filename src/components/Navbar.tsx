import React, { useEffect, useState } from 'react'
import { PawPrint, Moon, Sun, List, X } from 'phosphor-react'
import { motion, AnimatePresence } from 'framer-motion'
import { playClick, playMeow } from '../utils/sounds'

const sections = ['home','about','skills','education','projects','cat-game','contact']

export default function Navbar(){
  const [scrolled, setScrolled] = useState(false)
  const [dark, setDark] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const soundOn = true // always enabled, no UI toggle

  useEffect(()=>{
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return ()=> window.removeEventListener('scroll', onScroll)
  },[])

  useEffect(()=>{
    document.documentElement.classList.toggle('dark', dark)
  },[dark])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    el?.scrollIntoView({behavior:'smooth', block:'start'})
    playClick(soundOn)
    setMobileMenuOpen(false) // Close mobile menu after navigation
    // randomly meow on some clicks
    if(Math.random() < 0.12) playMeow(soundOn)
  }

  return (
    <>
      <header className={`fixed w-full z-30 top-0 transition-colors ${scrolled ? 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-sm' : 'bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm'}`}>
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <PawPrint className="text-cozy-600 dark:text-cozy-400" size={24} weight="fill" />
            <div className="font-medium text-sm sm:text-base">Josephine Claire</div>
          </div>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-2 lg:gap-4">
            {['Home','About','Skills','Education','Projects','Cat Game','Contact'].map((s, i)=> (
              <li key={s}>
                <button 
                  onClick={()=> scrollTo(sections[i])} 
                  className="px-2 lg:px-3 py-1 text-sm lg:text-base rounded-lg hover:bg-cozy-100/60 dark:hover:bg-gray-700/50 transition"
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <button 
              onClick={()=>setDark(d=>!d)} 
              title="Toggle theme" 
              className="p-2 rounded-lg hover:bg-cozy-100/50 dark:hover:bg-gray-700/50 transition"
            >
              {dark ? <Sun size={20}/> : <Moon size={20}/>} 
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-cozy-100/50 dark:hover:bg-gray-700/50 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Mobile Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-white dark:bg-gray-800 z-50 md:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-4 border-b border-cozy-100 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <PawPrint className="text-cozy-600 dark:text-cozy-400" size={24} weight="fill" />
                    <span className="font-medium">Menu</span>
                  </div>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-cozy-100/50 dark:hover:bg-gray-700/50 transition"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Mobile Menu Items */}
                <nav className="flex-1 overflow-y-auto py-4">
                  <ul className="space-y-1 px-2">
                    {['Home','About','Skills','Education','Projects','Cat Game','Contact'].map((s, i)=> (
                      <motion.li 
                        key={s}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <button 
                          onClick={()=> scrollTo(sections[i])} 
                          className="w-full text-left px-4 py-3 rounded-lg hover:bg-cozy-100/60 dark:hover:bg-gray-700/50 transition font-medium"
                        >
                          {s}
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Mobile Menu Footer */}
                <div className="p-4 border-t border-cozy-100 dark:border-gray-700">
                  <p className="text-xs text-cozy-600 dark:text-gray-400 text-center">
                    © 2025 Josephine Claire Nogot
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
