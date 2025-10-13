import React from 'react'
import Navbar from './components/Navbar'
import DecorativeAccents from './components/DecorativeAccents'
import Home from './sections/Home'
import About from './sections/About'
import Skills from './sections/Skills'
import Education from './sections/Education'
import Projects from './sections/Projects'
import CatGame from './sections/CatGame'
import Contact from './sections/Contact'

export default function App(){
  return (
    <div className="font-sans min-h-screen text-cozy-800 dark:text-gray-100 transition-colors duration-500 bg-site-light dark:bg-site-dark relative gradient-sweep">
      <DecorativeAccents />
      <Navbar />
      <main className="container mx-auto px-4">
        <Home />
        <About />
        <Skills />
        <Education />
        <Projects />
        <CatGame />
        <Contact />
      </main>
    </div>
  )
}
