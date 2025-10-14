import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { EnvelopeSimple, LinkedinLogo, EnvelopeOpen } from 'phosphor-react'
import { playClick, playPurr, playSend, playSuccess } from '../utils/sounds'

export default function Contact(){
  const form = useRef<HTMLFormElement | null>(null)
  const [sent, setSent] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [hoverFooter, setHoverFooter] = useState(false)
  const [formData, setFormData] = useState({
    from_name: '',
    reply_to: '',
    message: ''
  })
  const [errors, setErrors] = useState({
    from_name: '',
    reply_to: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Email validation regex
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error for this field when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
    // Clear success message when user starts typing again
    if (sent) {
      setSent(false)
    }
  }

  // Validate form
  const validateForm = (): boolean => {
    const newErrors = {
      from_name: '',
      reply_to: '',
      message: ''
    }
    let isValid = true

    if (!formData.from_name.trim()) {
      newErrors.from_name = 'Please enter your name'
      isValid = false
    }

    if (!formData.reply_to.trim()) {
      newErrors.reply_to = 'Please enter your email'
      isValid = false
    } else if (!validateEmail(formData.reply_to)) {
      newErrors.reply_to = 'Please enter a valid email address'
      isValid = false
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter a message'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form before submission
    if (!validateForm()) {
      playClick(true)
      return
    }

    setIsSubmitting(true)
    
    try {
      // Create FormData for submission
      const formDataToSubmit = new FormData()
      formDataToSubmit.append('from_name', formData.from_name)
      formDataToSubmit.append('reply_to', formData.reply_to)
      formDataToSubmit.append('message', formData.message)
      formDataToSubmit.append('to_email', 'nogotjosephineclaire@gmail.com')
      
      // Use Formspree (free alternative) or similar service
      // For now, we'll use mailto as a fallback but with better UX
      const subject = encodeURIComponent(`Portfolio Contact from ${formData.from_name}`)
      const body = encodeURIComponent(
        `Name: ${formData.from_name}\n` +
        `Email: ${formData.reply_to}\n` +
        `\n` +
        `Message:\n` +
        `${formData.message}\n` +
        `\n` +
        `---\n` +
        `This message was sent via your portfolio website.`
      )
      
      // Create a temporary link and trigger it
      const mailtoLink = `mailto:nogotjosephineclaire@gmail.com?subject=${subject}&body=${body}`
      const tempLink = document.createElement('a')
      tempLink.href = mailtoLink
      tempLink.target = '_blank'
      tempLink.click()
      
      // Show success message
      setSent(true)
      playSuccess(true) // Play the cozy success sound
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({ from_name: '', reply_to: '', message: '' })
        setIsSubmitting(false)
      }, 2000)
    } catch (err) {
      console.error('Failed to send message', err)
      setErrors(prev => ({ 
        ...prev, 
        message: 'Unable to send message. Please email nogotjosephineclaire@gmail.com directly.' 
      }))
      setIsSubmitting(false)
    }
  }

  // Check if form is valid for button state
  const isFormValid = formData.from_name.trim() && 
                      formData.reply_to.trim() && 
                      validateEmail(formData.reply_to) && 
                      formData.message.trim()

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      {/* Let's Connect section above the message form */}
  <motion.section onHoverStart={()=>setHoverFooter(true)} onHoverEnd={()=>setHoverFooter(false)} className="mb-8 py-6 sm:py-8 md:py-10 px-4 sm:px-6 rounded-xl mx-auto max-w-6xl bg-gradient-to-br from-[#fff6ec] via-[#f6d7c7] to-[#f4c6c0] dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-800/70 dark:to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage: `url('/assets/paw-small.svg')`, backgroundRepeat: 'repeat', backgroundPosition: '0 0'}} />
        <div className="w-full">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-semibold dark:text-white">Let's Connect 🐾</h3>
              <p className="mt-2 text-sm sm:text-base text-cozy-700 dark:text-gray-300">"Every great story starts with a hello — let's create something wonderful together. 🧡"</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <div className="text-xs sm:text-sm text-cozy-700 dark:text-gray-300">Mochi is sleeping now... but Claire will reply soon 💤</div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cozy-200 dark:bg-gray-700 flex items-center justify-center text-lg sm:text-xl">😴</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.a 
              initial={{opacity:0, y:15}}
              whileInView={{opacity:1, y:0}}
              viewport={{once:true}}
              transition={{duration:0.4, delay:0.1}}
              whileHover={{ y: -6, scale: 1.02 }} 
              onMouseEnter={()=>playClick(true)} 
              href={`mailto:nogotjosephineclaire@gmail.com`} 
              className="p-6 rounded-xl bg-white/80 dark:bg-gray-800/60 shadow-md hover:shadow-lg interactive-card flex flex-col gap-3 items-start break-words max-w-full overflow-hidden"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-cozy-50 dark:bg-gray-700"><EnvelopeSimple size={24} className="text-cozy-700 dark:text-gray-100" /></div>
                <div>
                  <div className="font-semibold dark:text-white">Email Me</div>
                  <div className="text-sm text-cozy-700 dark:text-gray-300 break-all whitespace-normal max-w-[16rem] md:max-w-full">nogotjosephineclaire@gmail.com</div>
                </div>
              </div>
              <div className="text-sm text-cozy-600 dark:text-gray-400">Drop me a message — I’d love to collaborate or chat about creative ideas.</div>
            </motion.a>

            <motion.a 
              initial={{opacity:0, y:15}}
              whileInView={{opacity:1, y:0}}
              viewport={{once:true}}
              transition={{duration:0.4, delay:0.2}}
              whileHover={{ y: -6, scale: 1.02 }} 
              onMouseEnter={()=>playClick(true)} 
              href={`mailto:josephineclairegnogot@iskolarngbayan.pup.edu.ph`} 
              className="p-6 rounded-xl bg-white/80 dark:bg-gray-800/60 shadow-md hover:shadow-lg interactive-card flex flex-col gap-3 items-start break-words max-w-full overflow-hidden"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-cozy-50 dark:bg-gray-700"><EnvelopeOpen size={24} className="text-cozy-700 dark:text-gray-100" /></div>
                <div>
                  <div className="font-semibold dark:text-white">Webmail</div>
                  <div className="text-sm text-cozy-700 dark:text-gray-300 break-all whitespace-normal max-w-[16rem] md:max-w-full">josephineclairegnogot@iskolarngbayan.pup.edu.ph</div>
                </div>
              </div>
              <div className="text-sm text-cozy-600 dark:text-gray-400">Let’s connect through my university mailbox for academic or project-based inquiries.</div>
            </motion.a>

            <motion.a 
              initial={{opacity:0, y:15}}
              whileInView={{opacity:1, y:0}}
              viewport={{once:true}}
              transition={{duration:0.4, delay:0.3}}
              whileHover={{ y: -6, scale: 1.02 }} 
              onMouseEnter={()=>playClick(true)} 
              href="https://linkedin.com/in/jclairenogot" 
              target="_blank" 
              rel="noreferrer" 
              className="p-6 rounded-xl bg-white/80 dark:bg-gray-800/60 shadow-md hover:shadow-lg interactive-card flex flex-col gap-3 items-start break-words max-w-full overflow-hidden"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-cozy-50 dark:bg-gray-700"><LinkedinLogo size={24} className="text-cozy-700 dark:text-gray-100" /></div>
                <div>
                  <div className="font-semibold dark:text-white">LinkedIn</div>
                  <div className="text-sm text-cozy-700 dark:text-gray-300">linkedin.com/in/jclairenogot</div>
                </div>
              </div>
              <div className="text-sm text-cozy-600 dark:text-gray-400">Come say hi on LinkedIn — let’s grow and share ideas together!</div>
            </motion.a>
          </div>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <motion.button 
              onClick={()=>{ 
                playPurr(true); // Special purr sound for this button
                document.getElementById('contact-form')?.scrollIntoView({behavior:'smooth'}) 
              }} 
              className="px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-full bg-cozy-200 dark:bg-cozy-700 dark:text-white font-medium shadow-md hover:shadow-lg transition-all w-full sm:w-auto"
              whileHover={{scale:1.05, y:-2}}
              whileTap={{scale:0.98}}
            >
              Say Hello!
            </motion.button>
            <motion.div 
              initial={{opacity:0}} 
              animate={{opacity: 1}} 
              transition={{duration:0.4}} 
              className="text-xs sm:text-sm text-cozy-700 dark:text-gray-300 text-center sm:text-right sm:hidden"
            >
              Thanks for visiting my cozy corner of the web. Stay inspired and take care, hooman! 🐾
            </motion.div>
            <motion.div 
              initial={{opacity:0}} 
              animate={{opacity: hoverFooter ? 1 : 0}} 
              transition={{duration:0.4}} 
              className="text-xs sm:text-sm text-cozy-700 dark:text-gray-300 text-center sm:text-right hidden sm:block"
            >
              Thanks for visiting my cozy corner of the web. Stay inspired and take care, hooman! 🐾
            </motion.div>
          </div>
        </div>
      </motion.section>

      <div className="mx-auto max-w-4xl px-4 sm:px-0">
        <motion.h2 
          className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 dark:text-white"
          initial={{opacity:0, x:-20}}
          whileInView={{opacity:1, x:0}}
          viewport={{once:true}}
          transition={{duration:0.5}}
        >
          Contact
        </motion.h2>
        <motion.div 
          className="p-4 sm:p-6 rounded-xl bg-white/70 dark:bg-gray-800/60 shadow-lg hover:shadow-xl interactive-card"
          initial={{opacity:0, y:20}}
          whileInView={{opacity:1, y:0}}
          viewport={{once:true}}
          transition={{duration:0.5}}
        >
        <form id="contact-form" ref={form} onSubmit={sendEmail} className="space-y-4">
          <div>
            <input 
              name="from_name"
              value={formData.from_name}
              onChange={handleChange}
              placeholder="Your name" 
              className={`w-full p-3 rounded-lg border ${errors.from_name ? 'border-red-400 dark:border-red-500' : 'border-cozy-200 dark:border-gray-600'} bg-white dark:bg-gray-700 dark:text-white focus:border-cozy-400 dark:focus:border-cozy-500 focus:ring-2 focus:ring-cozy-200 dark:focus:ring-cozy-600 transition-all`}
            />
            {errors.from_name && (
              <motion.p 
                initial={{opacity:0, y:-5}}
                animate={{opacity:1, y:0}}
                className="mt-1 text-sm text-red-500 dark:text-red-400"
              >
                {errors.from_name}
              </motion.p>
            )}
          </div>
          
          <div>
            <input 
              name="reply_to"
              value={formData.reply_to}
              onChange={handleChange}
              placeholder="Your email" 
              type="email"
              className={`w-full p-3 rounded-lg border ${errors.reply_to ? 'border-red-400 dark:border-red-500' : 'border-cozy-200 dark:border-gray-600'} bg-white dark:bg-gray-700 dark:text-white focus:border-cozy-400 dark:focus:border-cozy-500 focus:ring-2 focus:ring-cozy-200 dark:focus:ring-cozy-600 transition-all`}
            />
            {errors.reply_to && (
              <motion.p 
                initial={{opacity:0, y:-5}}
                animate={{opacity:1, y:0}}
                className="mt-1 text-sm text-red-500 dark:text-red-400"
              >
                {errors.reply_to}
              </motion.p>
            )}
          </div>
          
          <div>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message" 
              className={`w-full p-3 rounded-lg border ${errors.message ? 'border-red-400 dark:border-red-500' : 'border-cozy-200 dark:border-gray-600'} bg-white dark:bg-gray-700 dark:text-white focus:border-cozy-400 dark:focus:border-cozy-500 focus:ring-2 focus:ring-cozy-200 dark:focus:ring-cozy-600 h-32 transition-all resize-none`}
            />
            {errors.message && (
              <motion.p 
                initial={{opacity:0, y:-5}}
                animate={{opacity:1, y:0}}
                className="mt-1 text-sm text-red-500 dark:text-red-400"
              >
                {errors.message}
              </motion.p>
            )}
          </div>

          {sent && (
            <motion.div 
              initial={{opacity:0, scale:0.95}}
              animate={{opacity:1, scale:1}}
              className="p-4 rounded-lg bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700"
            >
              <div className="flex items-center gap-2">
                <div>
                  <p className="text-green-700 dark:text-green-300 font-medium">Your message has been sent successfully!</p>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">Thank you for reaching out. I'll get back to you soon! 🐾</p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <motion.button 
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`px-6 py-3 rounded-lg font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-cozy-300 transition-all ${
                isFormValid && !isSubmitting
                  ? 'bg-cozy-200 hover:bg-cozy-300 dark:bg-cozy-700 dark:hover:bg-cozy-600 text-cozy-900 dark:text-white hover:shadow-lg cursor-pointer'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-60'
              }`}
              whileHover={isFormValid && !isSubmitting ? {scale:1.02, y:-1} : {}}
              whileTap={isFormValid && !isSubmitting ? {scale:0.98} : {}}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
            <motion.a 
              href="/assets/NOGOT - CV.pdf" 
              download="Josephine_Claire_Nogot_CV.pdf"
              onClick={(e) => {
                e.preventDefault()
                // Create a temporary link for download (click sound handled globally)
                const link = document.createElement('a')
                link.href = '/assets/NOGOT - CV.pdf'
                link.download = 'Josephine_Claire_Nogot_CV.pdf'
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
              }}
              className="px-6 py-3 rounded-lg border-2 border-cozy-300 dark:border-gray-600 bg-transparent hover:bg-cozy-50 dark:hover:bg-gray-700 dark:text-white font-medium transition-all text-center cursor-pointer"
              whileHover={{scale:1.02, y:-1}}
              whileTap={{scale:0.98}}
            >
              Download CV
            </motion.a>
          </div>
        </form>
        </motion.div>
      </div>
    </section>
  )
}
