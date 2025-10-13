import React from 'react'
import { motion } from 'framer-motion'

export default function DecorativeAccents(){
  // Subtle bouncing animations with varied durations for organic feel
  const bounce = (duration: number, delay = 0) => ({
    y: [0, -12, 0],
    transition: { 
      duration, 
      repeat: Infinity, 
      repeatType: 'mirror' as const, 
      ease: 'easeInOut',
      delay
    }
  })

  const floatRotate = (duration: number, delay = 0) => ({
    y: [0, -8, 0],
    rotate: [0, 5, 0, -5, 0],
    transition: { 
      duration, 
      repeat: Infinity, 
      repeatType: 'mirror' as const, 
      ease: 'easeInOut',
      delay
    }
  })

  return (
    <div aria-hidden className="decorative-pattern-layer pointer-events-none fixed inset-0 overflow-hidden" style={{zIndex: 0}}>
      {/* Top left cluster */}
      <motion.img src="/assets/star.svg" alt="" className="accent small" style={{left:12, top:72}} animate={bounce(6, 0)} />
      <motion.img src="/assets/paw-small.svg" alt="" className="accent small faint" style={{left:80, top:120}} animate={floatRotate(7, 0.5)} />
      
      {/* Top right cluster */}
      <motion.img src="/assets/star.svg" alt="" className="accent small faint" style={{right:60, top:40}} animate={bounce(7, 1)} />
      <motion.img src="/assets/paw-small.svg" alt="" className="accent small faint" style={{right:20, top:140}} animate={floatRotate(8, 1.5)} />
      <motion.img src="/assets/star.svg" alt="" className="accent small" style={{right:120, top:90}} animate={bounce(6.5, 0.8)} />
      
      {/* Mid left */}
      <motion.img src="/assets/paw-small.svg" alt="" className="accent small faint" style={{left:40, top:'45%'}} animate={floatRotate(9, 2)} />
      <motion.img src="/assets/star.svg" alt="" className="accent small faint" style={{left:140, top:'38%'}} animate={bounce(7.5, 1.2)} />
      
      {/* Mid right */}
      <motion.img src="/assets/star.svg" alt="" className="accent small" style={{right:80, top:'50%'}} animate={floatRotate(8.5, 0.3)} />
      <motion.img src="/assets/paw-small.svg" alt="" className="accent small faint" style={{right:200, top:'42%'}} animate={bounce(7, 2.5)} />
      
      {/* Bottom left */}
      <motion.img src="/assets/paw-small.svg" alt="" className="accent small" style={{left:60, bottom:180}} animate={floatRotate(6.5, 1)} />
      <motion.img src="/assets/star.svg" alt="" className="accent small faint" style={{left:160, bottom:120}} animate={bounce(8, 0.5)} />
      
      {/* Bottom right */}
      <motion.img src="/assets/star.svg" alt="" className="accent small faint" style={{right:100, bottom:160}} animate={floatRotate(7.5, 2)} />
      <motion.img src="/assets/paw-small.svg" alt="" className="accent small" style={{right:40, bottom:90}} animate={bounce(9, 1.8)} />
    </div>
  )
}
