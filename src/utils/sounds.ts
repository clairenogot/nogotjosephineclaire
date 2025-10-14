let audioCtx: AudioContext | null = null

function getCtx(){
  if(!audioCtx) audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
  return audioCtx
}

export function playClick(enabled = true){
  if(!enabled) return
  const ctx = getCtx()
  const o = ctx.createOscillator()
  const g = ctx.createGain()
  o.type = 'sine'
  o.frequency.value = 800 // Softer, warmer frequency
  g.gain.value = 0.0018 // Slightly quieter
  o.connect(g)
  g.connect(ctx.destination)
  o.start()
  o.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.05) // Gentle pitch drop for cozy feel
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15)
  o.stop(ctx.currentTime + 0.16)
}

// Success sound - gentle, uplifting chime
export function playSuccess(enabled = true){
  if(!enabled) return
  const ctx = getCtx()
  
  // Create a pleasant three-note chord
  const frequencies = [523.25, 659.25, 783.99] // C5, E5, G5 - major chord
  const oscillators: OscillatorNode[] = []
  const gains: GainNode[] = []
  
  frequencies.forEach((freq, i) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    
    osc.type = 'sine'
    osc.frequency.value = freq
    gain.gain.value = 0.0015 // Gentle volume
    
    osc.connect(gain)
    gain.connect(ctx.destination)
    
    osc.start(ctx.currentTime + i * 0.05) // Stagger notes slightly
    gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.6)
    osc.stop(ctx.currentTime + 0.65)
    
    oscillators.push(osc)
    gains.push(gain)
  })
}

// Simple synthesized 'meow' using pitch sweep
export function playMeow(enabled = true){
  if(!enabled) return
  const ctx = getCtx()
  const carrier = ctx.createOscillator()
  const gain = ctx.createGain()
  const bandpass = ctx.createBiquadFilter()

  carrier.type = 'triangle'
  carrier.frequency.value = 400

  bandpass.type = 'bandpass'
  bandpass.frequency.value = 800
  bandpass.Q.value = 6

  // body of meow
  gain.gain.value = 0.0015

  carrier.connect(bandpass)
  bandpass.connect(gain)
  gain.connect(ctx.destination)

  // pitch sweep (like a meow)
  carrier.frequency.setValueAtTime(350, ctx.currentTime)
  carrier.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.28)

  carrier.start()
  gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.5)
  carrier.stop(ctx.currentTime + 0.52)
}

// Small send/receive and purr sounds for chat
export function playSend(enabled = true){
  if(!enabled) return
  const ctx = getCtx()
  const o = ctx.createOscillator()
  const g = ctx.createGain()
  o.type = 'square'
  o.frequency.value = 1200
  g.gain.value = 0.0025
  o.connect(g)
  g.connect(ctx.destination)
  o.start()
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08)
  o.stop(ctx.currentTime + 0.1)
}

export function playPurr(enabled = true){
  if(!enabled) return
  const ctx = getCtx()
  const o = ctx.createOscillator()
  const g = ctx.createGain()
  o.type = 'sine'
  o.frequency.value = 120
  g.gain.value = 0.0012
  o.connect(g)
  g.connect(ctx.destination)
  o.start()
  g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 1.0)
  o.stop(ctx.currentTime + 1.05)
}

// Ambient background music (gentle, low-volume synth)
let ambientState: {
  running: boolean
  master?: GainNode
  oscA?: OscillatorNode
  oscB?: OscillatorNode
  lfo?: OscillatorNode
  filter?: BiquadFilterNode
  volume: number
  audioEl?: HTMLAudioElement
  sourceNode?: MediaElementAudioSourceNode
  usingFile?: boolean
} = { running: false, volume: 0.06 }

function ensureCtxResumed(){
  const ctx = getCtx()
  // Some browsers require a user gesture to resume audio
  if (ctx.state === 'suspended') ctx.resume().catch(()=>{})
}

export async function startAmbient(volume = 0.06){
  try{
    ensureCtxResumed()
    const ctx = getCtx()
    if(ambientState.running) return
    // Try to prefer a looped audio file at /assets/ambient-loop.mp3 or .ogg
    const tryFile = async () => {
      try{
        const audioEl = new Audio('/assets/ambient-loop.mp3')
        audioEl.loop = true
        audioEl.preload = 'auto'
        // connect through WebAudio for volume control
        const source = ctx.createMediaElementSource(audioEl)
        const master = ctx.createGain()
        master.gain.value = volume
        source.connect(master)
        master.connect(ctx.destination)
        // attempt to load and play
        await audioEl.play().catch(()=>{ /* may fail until user gesture */ })
        ambientState.audioEl = audioEl
        ambientState.sourceNode = source
        ambientState.master = master
        ambientState.usingFile = true
        ambientState.running = true
        ambientState.volume = volume
        return true
      }catch(e){
        return false
      }
    }

    // If file fails or not present, fall back to synth
    const fileOk = await tryFile()
    if(!fileOk){
      const master = ctx.createGain()
      master.gain.value = volume

      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.value = 900

      const oscA = ctx.createOscillator()
      const oscB = ctx.createOscillator()
      oscA.type = 'sine'
      oscB.type = 'sine'
      oscA.frequency.value = 220
      oscB.frequency.value = 220 * 1.005

      const lfo = ctx.createOscillator()
      const lfoGain = ctx.createGain()
      lfo.type = 'sine'
      lfo.frequency.value = 0.06
      lfoGain.gain.value = 350

      lfo.connect(lfoGain)
      lfoGain.connect(filter.frequency)

      oscA.connect(filter)
      oscB.connect(filter)
      filter.connect(master)
      master.connect(ctx.destination)

      oscA.start()
      oscB.start()
      lfo.start()

      ambientState = { running: true, master, oscA, oscB, lfo, filter, volume, usingFile: false }
    }
  }catch(e){
    console.warn('ambient start failed', e)
  }
}

export function stopAmbient(){
  const ctx = audioCtx
  if(!ambientState.running) return
  try{
    if(ambientState.usingFile){
      ambientState.audioEl?.pause()
      ambientState.audioEl = undefined
      try{ ambientState.sourceNode?.disconnect() }catch(e){}
      ambientState.sourceNode = undefined
    } else {
      ambientState.oscA?.stop()
      ambientState.oscB?.stop()
      ambientState.lfo?.stop()
    }
  }catch(e){/* ignore */}
  // disconnect nodes
  try{ ambientState.master?.disconnect() }catch(e){}
  try{ ambientState.filter?.disconnect() }catch(e){}
  ambientState.running = false
}

export function setAmbientVolume(v: number){
  ambientState.volume = v
  if(ambientState.master) ambientState.master.gain.value = v
  try{ localStorage.setItem('pref_music_vol', String(v)) }catch(e){}
}

export function isAmbientPlaying(){
  return ambientState.running === true
}

export function getAmbientVolume(){
  return ambientState.volume ?? 0
}

export function toggleAmbient(){
  if(ambientState.running) stopAmbient()
  else startAmbient(ambientState.volume)
}

export default { playClick, playMeow, playSend, playPurr, playSuccess, startAmbient, stopAmbient, toggleAmbient, setAmbientVolume }
