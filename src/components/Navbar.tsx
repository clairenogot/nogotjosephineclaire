import React, { useEffect, useState } from 'react'
import { PawPrint, Moon, Sun } from 'phosphor-react'
import { playClick, playMeow } from '../utils/sounds'

const sections = ['home','about','skills','education','projects','cat-game','contact']

export default function Navbar(){
  const [scrolled, setScrolled] = useState(false)
  const [dark, setDark] = useState(false)
  const soundOn = true // always enabled, no UI toggle

  useEffect(()=>{
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return ()=> window.removeEventListener('scroll', onScroll)
  },[])

  useEffect(()=>{
    document.documentElement.classList.toggle('dark', dark)
  },[dark])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    el?.scrollIntoView({behavior:'smooth', block:'start'})
    playClick(soundOn)
    // randomly meow on some clicks
    if(Math.random() < 0.12) playMeow(soundOn)
  }



  

  return (
    <header className={`fixed w-full z-30 top-0 transition-colors ${scrolled ? 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <PawPrint className="text-cozy-600" size={28} />
          <div className="font-medium">Josephine Claire</div>
        </div>
        <ul className="hidden md:flex items-center gap-4">
          {['Home','About','Skills','Education','Projects','Cat Game','Contact'].map((s, i)=> (
            <li key={s}>
              <button onClick={()=> scrollTo(sections[i])} className="px-3 py-1 rounded-lg hover:bg-cozy-100/60 dark:hover:bg-gray-700/50 transition">{s}</button>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <button onClick={()=>setDark(d=>!d)} title="Toggle theme" className="p-2 rounded-lg hover:bg-cozy-100/50 transition">
            {dark ? <Sun size={18}/> : <Moon size={18}/>} 
          </button>
        </div>
      </nav>
    </header>
  )
}
