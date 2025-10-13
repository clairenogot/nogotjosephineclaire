import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PaperPlaneRight, Sparkle, PawPrint } from 'phosphor-react'
import { playClick, playSend, playPurr, playMeow } from '../utils/sounds'

type Msg = { id: string; speaker: 'mochi'|'you'; text: string; time?: string }

const initialMsgs: Msg[] = [
  { id: 'm-0', speaker: 'mochi', text: "Hi there, hooman! I'm Mochi, your cozy internet cat. What brings you here today?", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
]

function timeNow(){ return new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }

export default function TalkToCat(){
  const [messages, setMessages] = useState<Msg[]>(initialMsgs)
  const [typing, setTyping] = useState(false)
  const soundOn = true // always enabled, no UI toggle
  const [input, setInput] = useState('')
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [nodeId, setNodeId] = useState<string>('start')

  const DIALOGUE: Record<string, { text: string; choices?: Array<{ id: string; label: string; next?: string }> }> = {
    start: {
      text: "Hi there, hooman! I'm Mochi, your cozy internet cat. What brings you here today?",
      choices: [
        { id: 'chill', label: 'Just chilling 😺', next: 'chill' },
        { id: 'bored', label: "I'm bored.", next: 'bored' },
        { id: 'work', label: "I'm working hard.", next: 'work' },
        { id: 'sad', label: 'Feeling kinda down…', next: 'sad' }
      ]
    },
    chill: {
      text: 'Purrfect! Wanna hear a fun cat fact or a random cozy thought?'
      , choices: [
        { id: 'fact', label: 'Give me a cat fact!', next: 'fact' },
        { id: 'cozy', label: 'Cozy thought, please.', next: 'cozy' }
      ]
    },
    fact: {
      text: 'Did you know cats sleep for about 70% of their lives? We call it... professional napping.',
      choices: [ { id: 'cozyAfterFact', label: 'Cozy thought, please.', next: 'cozy' }, { id: 'again', label: 'Chat again', next: 'start' } ]
    },
    cozy: {
      text: 'Sometimes, doing nothing is everything. You deserve rest, hooman.',
      choices: [ { id: 'factAfterCozy', label: 'Give me a cat fact!', next: 'fact' }, { id: 'again2', label: 'Chat again', next: 'start' } ]
    },
    bored: {
      text: "Hmm... maybe I can fix that! Wanna play a tiny challenge or hear a riddle?",
      choices: [ { id: 'play', label: "Let's play!", next: 'play' }, { id: 'riddle', label: 'Hit me with a riddle.', next: 'riddle' } ]
    },
    play: {
      text: 'Name three things you love in 5 seconds! Go!',
      choices: [ { id: 'did', label: 'I did it!', next: 'playPraise' }, { id: 'againPlay', label: 'Another', next: 'play' } ]
    },
    playPraise: { text: 'Pawsome! That was lovely.', choices: [ { id: 'again3', label: 'Chat again', next: 'start' } ] },
    riddle: { text: 'I have whiskers but no secrets... who am I? 😸', choices: [ { id: 'answerCat', label: 'A cat?', next: 'riddleAnswer' }, { id: 'giveUp', label: 'Give me the answer', next: 'riddleAnswer' } ] },
    riddleAnswer: { text: "It was me! Always me. 😸", choices: [ { id: 'again4', label: 'Chat again', next: 'start' } ] },
    work: { text: 'Ooh, busy paws! Do you need a motivation boost or a quick mental break?', choices: [ { id: 'mot', label: 'Motivation, please.', next: 'motivation' }, { id: 'break', label: 'Mental break!', next: 'break' } ] },
    motivation: { text: "You're doing meow-nificent! Don't forget to stretch your paws (or arms).", choices: [ { id: 'thanks', label: 'Thanks', next: 'start' }, { id: 'stretch', label: 'Do a stretch', next: 'stretch' } ] },
    break: { text: 'Stretch complete. You are now 10% happier!', choices: [ { id: 'back', label: 'Thanks', next: 'start' } ] },
    stretch: { text: 'Nice stretch! Tiny wins. ❤️', choices: [ { id: 'back2', label: 'Chat again', next: 'start' } ] },
    sad: { text: 'Aww, come here, hooman. Wanna talk about it or want me to cheer you up instead?', choices: [ { id: 'talk', label: "Let's talk…", next: 'talk' }, { id: 'cheer', label: 'Cheer me up!', next: 'cheer' } ] },
    talk: { text: "It's okay to feel this way. Even the sun takes a break at night.", choices: [ { id: 'more', label: 'Tell me more', next: 'talkMore' }, { id: 'thanks2', label: 'Thanks', next: 'start' } ] },
    talkMore: { text: 'Small steps are wins. Try a 2-minute walk, or breathe with me.', choices: [ { id: 'hug', label: 'Virtual hug', next: 'cheer' }, { id: 'again5', label: 'Chat again', next: 'start' } ] },
    cheer: { text: "You're loved, even if you forget it sometimes. Here, a virtual head bump 🐾❤️.", choices: [ { id: 'end', label: 'Thanks', next: 'start' } ] }
  }

  useEffect(()=>{ // occasional purr for charm
    const t = setInterval(()=>{ if(Math.random() < 0.02) playPurr(soundOn) }, 8000)
    return ()=> clearInterval(t)
  },[soundOn])

  const addMessage = (m: Msg)=> setMessages(s=>[...s, m])

  const pushUser = (text: string)=>{
    if(!text.trim()) return
    playSend(soundOn)
    addMessage({ id:`u-${messages.length}`, speaker:'you', text, time: timeNow() })
    setInput('')
    scrollToBottom()
  }

  const pushMochi = (text:string, delay = 600)=>{
    setTyping(true)
    setTimeout(()=>{
      addMessage({ id:`m-${messages.length}`, speaker:'mochi', text, time: timeNow() })
      setTyping(false)
      playMeow(soundOn)
      scrollToBottom()
    }, delay + Math.random()*500)
  }

  function scrollToBottom(){
    const el = containerRef.current
    if(el) setTimeout(()=> el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' }), 60)
  }

  async function handleChoice(choiceId: string, label: string){
    // user chose an option
    pushUser(label)
    // determine next node
    const next = (DIALOGUE[nodeId] && DIALOGUE[nodeId].choices) ? DIALOGUE[nodeId].choices!.find(c=>c.id===choiceId)?.next : undefined
    if(!next){
      // fallback: echo
      pushMochi('Oh! I see.');
      setNodeId('start')
      return
    }
    // after user bubble, Mochi replies with the `next` node text
    setNodeId(next)
    const nextText = DIALOGUE[next]?.text
    if(nextText) pushMochi(nextText)
  }

  function handleSubmit(e?: React.FormEvent){
    e?.preventDefault()
    const text = input.trim()
    if(!text) return
    pushUser(text)
    if(text.toLowerCase().includes('nap')) pushMochi('Naps are sacred. I endorse this behavior.')
    else if(text.toLowerCase().includes('riddle')) pushMochi('I have whiskers but no secrets... who am I? 😸')
    else pushMochi('Ooh, tell me more!')
  }

  function reset(){ setMessages(initialMsgs); setTyping(false); setInput('') }

  // inline CSS for messenger tails and animations
  const style = `
    .bubble-tail {
      width: 12px; height: 12px; transform: rotate(45deg);
      position: absolute; bottom: 8px;
    }
    .mochi-bubble { position: relative }
    .you-bubble { position: relative }
    @keyframes blink { 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(0.2)} }
    .avatar-blink { animation: blink 4s infinite }
    .typing-dots > span { display:inline-block; width:6px; height:6px; background:#caa; margin-right:4px; border-radius:50%; opacity:0.6 }
    .typing-dots .dot1 { animation: typing 1s infinite 0s }
    .typing-dots .dot2 { animation: typing 1s infinite 0.15s }
    .typing-dots .dot3 { animation: typing 1s infinite 0.3s }
    @keyframes typing { 0%{transform:translateY(0);opacity:0.4} 50%{transform:translateY(-4px);opacity:1} 100%{transform:translateY(0);opacity:0.4} }
  `

  return (
    <div className="max-w-xl mx-auto">
      <style>{style}</style>
      <div className="rounded-lg overflow-hidden shadow-md bg-white/60 dark:bg-gray-800/50">
        <div className="flex items-center gap-3 p-3 border-b bg-gradient-to-r from-cozy-50/30 to-white/10">
          <div className="w-12 h-12 rounded-full bg-cozy-200 flex items-center justify-center avatar-blink">🐱</div>
          <div>
            <div className="font-semibold text-cozy-900 dark:text-white">Mochi</div>
            <div className="text-xs text-cozy-700 dark:text-gray-300">Your cozy internet cat</div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button onClick={reset} className="p-2 rounded">↻</button>
          </div>
        </div>

        <div ref={containerRef} className="h-72 overflow-y-auto p-4 space-y-3 bg-[radial-gradient(ellipse_at_top_left,_#fff8f3,_#fff6f2)] dark:bg-gradient-to-b dark:from-gray-900/40 dark:to-gray-800/20">
          <AnimatePresence initial={false}>
            {messages.map((m)=> (
              <motion.div key={m.id} initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} exit={{opacity:0}} className={`flex ${m.speaker==='mochi' ? 'items-start' : 'justify-end'}` }>
                {m.speaker === 'mochi' ? (
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-cozy-200 flex items-center justify-center">🐈</div>
                    <div className="relative max-w-[70%]">
                      <div className="mochi-bubble bg-white dark:bg-gray-700 p-3 rounded-xl shadow-md">
                        <div className="text-sm leading-snug text-cozy-900 dark:text-white">{m.text}</div>
                        <div className="text-xs text-gray-400 dark:text-gray-300 mt-1">{m.time}</div>
                      </div>
                      <div className="bubble-tail bg-white dark:bg-gray-700" style={{left:-6}} />
                    </div>
                  </div>
                ) : (
                  <div className="relative max-w-[70%]">
                    <div className="you-bubble bg-cozy-200 dark:bg-cozy-700 p-3 rounded-xl text-cozy-900 dark:text-white">
                      {m.text}
                      <div className="text-xs text-gray-500 dark:text-gray-300 mt-1 text-right">{m.time}</div>
                    </div>
                    <div className="bubble-tail bg-cozy-200 dark:bg-cozy-700" style={{right:-6, marginLeft:'auto'}} />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {typing && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-cozy-200 flex items-center justify-center">🐈</div>
              <div className="bg-white p-2 rounded-xl">
                <div className="typing-dots flex items-center"><span className="dot1"/><span className="dot2"/><span className="dot3"/></div>
              </div>
            </div>
          )}
        </div>

        <div className="p-3 border-t">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Say something to Mochi..." className="flex-1 p-2 rounded-full border" />
            <button type="submit" className="p-2 rounded-full bg-cozy-200 hover:bg-cozy-300 dark:bg-cozy-700 dark:hover:bg-cozy-600 text-cozy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cozy-300" onClick={()=>playClick(soundOn)} aria-label="Send message">
              <PaperPlaneRight size={18} className="text-cozy-900 dark:text-white" />
            </button>
          </form>

          <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
            {(DIALOGUE[nodeId] && DIALOGUE[nodeId].choices) ? DIALOGUE[nodeId].choices!.map(c=> (
              <button key={c.id} className="px-3 py-2 rounded bg-cozy-50 hover:bg-cozy-100 dark:bg-cozy-700 dark:hover:bg-cozy-600 dark:text-white text-cozy-900 focus:outline-none focus:ring-2 focus:ring-cozy-300" onClick={()=>handleChoice(c.id, c.label)}>{c.label}</button>
            )) : (
              <button className="px-3 py-2 rounded bg-cozy-50 hover:bg-cozy-100 dark:bg-cozy-700 dark:hover:bg-cozy-600 dark:text-white text-cozy-900 focus:outline-none focus:ring-2 focus:ring-cozy-300" onClick={()=>reset()}>Chat again</button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
