import React, { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PaperPlaneRight } from 'phosphor-react'

type Msg = { id: string; speaker: 'mochi'|'you'; text: string; time?: string }

// Random greetings for Mochi
const GREETINGS = [
  "Hi there, hooman! I'm Mochi, your cozy internet cat. What brings you here today?",
  "Meow! 🐱 I'm Mochi, and I'm here to chat! What's on your mind today?",
  "Hey hooman! *stretches and yawns* Ready for a cozy conversation?",
  "Welcome back! I'm Mochi, your friendly neighborhood cat. How can I make your day better?",
  "Purrr... Hello there! Mochi here. Want to chat about something?",
  "Oh, a visitor! *tail swishes excitedly* I'm Mochi. What adventure shall we go on today?",
  "Hiiii! 😸 Mochi at your service! Feeling chatty? I'm all ears (and whiskers)!",
  "*head bumps you gently* Hey there! I'm Mochi. Let's have a cozy chat!"
]

function getRandomGreeting() {
  return GREETINGS[Math.floor(Math.random() * GREETINGS.length)]
}

function timeNow(){ return new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }

function getInitialMessages(): Msg[] {
  return [
    { id: `m-${Date.now()}`, speaker: 'mochi', text: getRandomGreeting(), time: timeNow() }
  ]
}

export default function TalkToCat(){
  const [messages, setMessages] = useState<Msg[]>(getInitialMessages())
  const [typing, setTyping] = useState(false)
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
        { id: 'sad', label: 'Feeling kinda down…', next: 'sad' },
        { id: 'curious', label: 'Tell me about you!', next: 'aboutMochi' },
        { id: 'advice', label: 'Need some life advice', next: 'lifeAdviceStart' }
      ]
    },
    
    // === CHILL PATH ===
    chill: {
      text: 'Purrfect! Wanna hear a fun cat fact, a cozy thought, or maybe a story?',
      choices: [
        { id: 'fact', label: 'Give me a cat fact!', next: 'fact' },
        { id: 'cozy', label: 'Cozy thought, please.', next: 'cozy' },
        { id: 'story', label: 'Tell me a story!', next: 'storyStart' }
      ]
    },
    fact: {
      text: 'Did you know cats sleep for about 70% of their lives? We call it... professional napping. 💤',
      choices: [ 
        { id: 'moreFacts', label: 'Another fact!', next: 'fact2' }, 
        { id: 'cozyAfterFact', label: 'Cozy thought, please.', next: 'cozy' }, 
        { id: 'again', label: 'Chat again', next: 'start' } 
      ]
    },
    fact2: {
      text: "Cats have over 20 vocalizations, including the purr, meow, and chirp. We're basically tiny opera singers! 🎵",
      choices: [ 
        { id: 'fact3btn', label: 'One more!', next: 'fact3' }, 
        { id: 'cozy2', label: 'Cozy thought now', next: 'cozy' } 
      ]
    },
    fact3: {
      text: "A cat's whiskers are super sensitive and help them navigate in the dark. Like built-in radar! 🐾",
      choices: [ 
        { id: 'fact4btn', label: 'More facts please!', next: 'fact4' },
        { id: 'story', label: 'Tell me a story', next: 'storyStart' }
      ]
    },
    fact4: {
      text: "Cats can rotate their ears 180 degrees. That's why we always hear the treat bag open! 😸",
      choices: [ 
        { id: 'fact5btn', label: 'Keep going!', next: 'fact5' },
        { id: 'back', label: 'Thanks!', next: 'start' }
      ]
    },
    fact5: {
      text: "Ancient Egyptians worshipped cats as sacred creatures. We've been royalty for thousands of years! 👑",
      choices: [ 
        { id: 'fact6btn', label: 'Another one!', next: 'fact6' },
        { id: 'trivia', label: 'Quiz me on cats!', next: 'triviaStart' }
      ]
    },
    fact6: {
      text: "Cats spend 30-50% of their day grooming. Self-care is important, hooman! ✨",
      choices: [
        { id: 'fact7btn', label: 'More!', next: 'fact7' },
        { id: 'cozy3', label: 'Cozy thought', next: 'cozy2' }
      ]
    },
    fact7: {
      text: "A group of cats is called a 'clowder.' And yes, we sometimes throw clowder parties. 🎉",
      choices: [
        { id: 'fact8btn', label: 'Continue!', next: 'fact8' },
        { id: 'play', label: 'Play a game', next: 'gameMenu' }
      ]
    },
    fact8: {
      text: "Cats can jump up to 6 times their height! We're basically tiny superheroes. 🦸",
      choices: [
        { id: 'fact9btn', label: 'Tell me more!', next: 'fact9' },
        { id: 'restart', label: 'Start over', next: 'start' }
      ]
    },
    fact9: {
      text: "A cat's purr vibrates at a frequency that can promote healing. We're basically fuzzy doctors! 💝",
      choices: [
        { id: 'fact10btn', label: 'One more!', next: 'fact10' },
        { id: 'wellness', label: 'Tell me about wellness', next: 'wellnessPath' }
      ]
    },
    fact10: {
      text: "Cats have a 'third eyelid' called the haw. It helps keep our eyes moist and protected. Science! 🔬",
      choices: [
        { id: 'factDone', label: 'That was amazing!', next: 'factEnd' },
        { id: 'more', label: 'More topics!', next: 'start' }
      ]
    },
    factEnd: {
      text: "Glad you enjoyed them! Knowledge is purrr-fect. What else can I share? 🌟",
      choices: [
        { id: 'cozy4', label: 'Cozy thoughts', next: 'cozy' },
        { id: 'story2', label: 'Tell a story', next: 'storyStart' },
        { id: 'start2', label: 'Main menu', next: 'start' }
      ]
    },
    
    cozy: {
      text: 'Sometimes, doing nothing is everything. You deserve rest, hooman. 🌙',
      choices: [ 
        { id: 'factAfterCozy', label: 'Give me a cat fact!', next: 'fact' }, 
        { id: 'moreCozy', label: 'More cozy thoughts', next: 'cozy2' },
        { id: 'again2', label: 'Chat again', next: 'start' } 
      ]
    },
    cozy2: {
      text: "The best adventures are the ones where you feel safe. May your day be gentle and warm. ☕",
      choices: [
        { id: 'cozy3btn', label: 'Another one', next: 'cozy3' },
        { id: 'grateful', label: 'Feeling grateful', next: 'gratitudePath' }
      ]
    },
    cozy3: {
      text: "Remember: You don't have to be productive every moment. Rest is productive too. 🛋️",
      choices: [
        { id: 'cozy4btn', label: 'More please', next: 'cozy4' },
        { id: 'anxious', label: "I'm feeling anxious", next: 'anxietyPath' }
      ]
    },
    cozy4: {
      text: "Like a cat curled up in sunshine, find your warm spot today. You've earned it. ☀️",
      choices: [
        { id: 'cozy5btn', label: 'Keep them coming', next: 'cozy5' },
        { id: 'peace', label: 'Need inner peace', next: 'peacePath' }
      ]
    },
    cozy5: {
      text: "Your presence is a gift. You don't need to do anything else to be worthy. 💝",
      choices: [
        { id: 'cozy6btn', label: 'One more', next: 'cozy6' },
        { id: 'backToStart', label: 'Back to start', next: 'start' }
      ]
    },
    cozy6: {
      text: "Breathe in kindness, breathe out worry. You're exactly where you need to be. 🌸",
      choices: [
        { id: 'meditation', label: 'Guide me in meditation', next: 'meditationPath' },
        { id: 'story3', label: 'Tell me a story', next: 'storyStart' }
      ]
    },
    
    // === BORED PATH ===
    bored: {
      text: "Hmm... maybe I can fix that! Wanna play a game, hear a riddle, or explore something fun?",
      choices: [ 
        { id: 'play', label: "Let's play!", next: 'gameMenu' }, 
        { id: 'riddle', label: 'Hit me with a riddle.', next: 'riddleStart' },
        { id: 'explore', label: 'Explore fun topics', next: 'exploreMenu' }
      ]
    },
    
    gameMenu: {
      text: "Alright! Pick your game: Quick Challenge, Word Association, or Would You Rather?",
      choices: [
        { id: 'challenge', label: 'Quick Challenge', next: 'challengeGame' },
        { id: 'wordGame', label: 'Word Association', next: 'wordGame' },
        { id: 'wouldYou', label: 'Would You Rather', next: 'wouldYouRather' }
      ]
    },
    
    challengeGame: {
      text: 'Name three things you love in 5 seconds! Go!',
      choices: [ 
        { id: 'did', label: 'I did it!', next: 'challengePraise' }, 
        { id: 'anotherChallenge', label: 'Another challenge', next: 'challenge2' } 
      ]
    },
    challengePraise: { 
      text: 'Pawsome! That was lovely. Gratitude makes the heart purr. 💕', 
      choices: [ 
        { id: 'challenge2btn', label: 'Next challenge', next: 'challenge2' },
        { id: 'gameMenuBack', label: 'Back to games', next: 'gameMenu' }
      ] 
    },
    challenge2: {
      text: "Quick! Think of a happy memory. Don't analyze it, just feel it for 5 seconds. 🌈",
      choices: [
        { id: 'feltIt', label: 'I felt it!', next: 'challenge2praise' },
        { id: 'challenge3', label: 'Next one', next: 'challenge3' }
      ]
    },
    challenge2praise: {
      text: "Beautiful! Memories are treasures. Let's do another or switch games?",
      choices: [
        { id: 'challenge3btn', label: 'Another!', next: 'challenge3' },
        { id: 'gameMenuBack2', label: 'Game menu', next: 'gameMenu' }
      ]
    },
    challenge3: {
      text: "Describe your perfect cozy day in three words. Ready, set, go! 🏡",
      choices: [
        { id: 'done3', label: 'Done!', next: 'challenge3praise' },
        { id: 'moreGames', label: 'More games!', next: 'gameMenu' }
      ]
    },
    challenge3praise: {
      text: "Those sound wonderful! May your days be filled with moments like that. 🌟",
      choices: [
        { id: 'backStart3', label: 'Main menu', next: 'start' },
        { id: 'riddleNow', label: 'Try a riddle', next: 'riddleStart' }
      ]
    },
    
    wordGame: {
      text: "Word Association! I say 'Sunshine' — you say the first word that comes to mind!",
      choices: [
        { id: 'wordDone', label: 'Warmth', next: 'wordGame2' },
        { id: 'wordDone2', label: 'Happiness', next: 'wordGame2' },
        { id: 'wordDone3', label: 'Beach', next: 'wordGame2' }
      ]
    },
    wordGame2: {
      text: "Nice! Now I say 'Cozy' — what comes to mind?",
      choices: [
        { id: 'word2a', label: 'Blanket', next: 'wordEnd' },
        { id: 'word2b', label: 'Home', next: 'wordEnd' },
        { id: 'word2c', label: 'Hug', next: 'wordEnd' }
      ]
    },
    wordEnd: {
      text: "Perfect! Words create worlds. Your mind is a beautiful place. 🧠✨",
      choices: [
        { id: 'playMore', label: 'Play more', next: 'gameMenu' },
        { id: 'startMenu', label: 'Main menu', next: 'start' }
      ]
    },
    
    wouldYouRather: {
      text: "Would you rather... have the ability to talk to cats OR never feel cold again?",
      choices: [
        { id: 'talkToCats', label: 'Talk to cats!', next: 'wouldYou2' },
        { id: 'neverCold', label: 'Never feel cold', next: 'wouldYou2' }
      ]
    },
    wouldYou2: {
      text: "Interesting choice! Next one: Would you rather... live in a cozy cabin in the woods OR a beachside cottage?",
      choices: [
        { id: 'cabin', label: 'Cozy cabin 🏡', next: 'wouldYouEnd' },
        { id: 'beach', label: 'Beach cottage 🏖️', next: 'wouldYouEnd' }
      ]
    },
    wouldYouEnd: {
      text: "Both sound purrfect! The best place is where your heart feels at home. 💝",
      choices: [
        { id: 'moreGames2', label: 'More games', next: 'gameMenu' },
        { id: 'backMain2', label: 'Main menu', next: 'start' }
      ]
    },
    
    riddleStart: { 
      text: 'I have whiskers but no secrets, I purr but tell no lies... who am I? 😸', 
      choices: [ 
        { id: 'answerCat', label: 'A cat?', next: 'riddleAnswer' }, 
        { id: 'giveUp', label: 'Give me the answer', next: 'riddleAnswer' } 
      ] 
    },
    riddleAnswer: { 
      text: "It was me! Always me. 😸 Want another riddle?", 
      choices: [ 
        { id: 'riddle2', label: 'Yes please!', next: 'riddle2' },
        { id: 'again4', label: 'Main menu', next: 'start' } 
      ] 
    },
    riddle2: {
      text: "I have four legs in the morning, two at noon, and three in the evening... what am I? (Classic!)",
      choices: [
        { id: 'human', label: 'A human!', next: 'riddle2correct' },
        { id: 'giveup2', label: 'Tell me!', next: 'riddle2correct' }
      ]
    },
    riddle2correct: {
      text: "Yes! A human — baby, adult, then with a cane. Deep, right? 🤔",
      choices: [
        { id: 'riddle3btn', label: 'Another!', next: 'riddle3' },
        { id: 'backMenu', label: 'Main menu', next: 'start' }
      ]
    },
    riddle3: {
      text: "What gets wetter the more it dries?",
      choices: [
        { id: 'towel', label: 'A towel!', next: 'riddle3correct' },
        { id: 'help3', label: 'Hint please', next: 'riddle3hint' }
      ]
    },
    riddle3hint: {
      text: "Think about something you use after a bath... 🛁",
      choices: [
        { id: 'towel2', label: 'A towel!', next: 'riddle3correct' },
        { id: 'answer3', label: 'Just tell me', next: 'riddle3correct' }
      ]
    },
    riddle3correct: {
      text: "Exactly! A towel. You're good at this! 🎉",
      choices: [
        { id: 'moreRiddles', label: 'More riddles!', next: 'riddle4' },
        { id: 'games', label: 'Try a game', next: 'gameMenu' }
      ]
    },
    riddle4: {
      text: "I'm light as a feather, but even the strongest can't hold me for long. What am I?",
      choices: [
        { id: 'breath', label: 'Your breath!', next: 'riddle4correct' },
        { id: 'help4', label: 'Need a hint', next: 'riddle4hint' }
      ]
    },
    riddle4hint: {
      text: "It's something you do constantly without thinking... 💨",
      choices: [
        { id: 'breath2', label: 'Breathing!', next: 'riddle4correct' }
      ]
    },
    riddle4correct: {
      text: "Purrfect! Breath. Deep and simple, just like life should be. 🌬️",
      choices: [
        { id: 'riddleMore', label: 'Keep going', next: 'riddle5' },
        { id: 'riddleDone', label: 'That was fun!', next: 'start' }
      ]
    },
    riddle5: {
      text: "The more you take, the more you leave behind. What are they?",
      choices: [
        { id: 'footsteps', label: 'Footsteps!', next: 'riddle5correct' },
        { id: 'help5', label: 'Hint?', next: 'riddle5hint' }
      ]
    },
    riddle5hint: {
      text: "Think about walking somewhere... 👣",
      choices: [
        { id: 'footsteps2', label: 'Footsteps!', next: 'riddle5correct' }
      ]
    },
    riddle5correct: {
      text: "Yes! Footsteps. Every step is part of your journey. 🐾",
      choices: [
        { id: 'riddleEnd', label: 'Main menu', next: 'start' },
        { id: 'exploreNow', label: 'Explore topics', next: 'exploreMenu' }
      ]
    },
    
    exploreMenu: {
      text: "Let's explore! Pick a topic: Space, Ocean, Dreams, or Random Fun?",
      choices: [
        { id: 'space', label: '🌌 Space', next: 'spacePath' },
        { id: 'ocean', label: '🌊 Ocean', next: 'oceanPath' },
        { id: 'dreams', label: '💭 Dreams', next: 'dreamPath' },
        { id: 'randomFun', label: '🎲 Random Fun', next: 'randomFun' }
      ]
    },
    
    spacePath: {
      text: "Did you know there are more stars in the universe than grains of sand on all Earth's beaches? We're all made of stardust! ✨",
      choices: [
        { id: 'space2', label: 'Tell me more!', next: 'space2' },
        { id: 'explore2', label: 'Other topics', next: 'exploreMenu' }
      ]
    },
    space2: {
      text: "A day on Venus is longer than its year! It takes Venus 243 Earth days to rotate once, but only 225 days to orbit the Sun. 🪐",
      choices: [
        { id: 'space3', label: 'More space facts!', next: 'space3' },
        { id: 'backMenu2', label: 'Main menu', next: 'start' }
      ]
    },
    space3: {
      text: "If you could somehow stand on the surface of Jupiter, you'd weigh about 2.5 times more than on Earth. Gravity is wild! 🌍",
      choices: [
        { id: 'exploreMore', label: 'Explore more', next: 'exploreMenu' },
        { id: 'mainBack', label: 'Main menu', next: 'start' }
      ]
    },
    
    oceanPath: {
      text: "The ocean is deeper than space is high! The deepest part (Mariana Trench) is about 36,000 feet deep. 🌊",
      choices: [
        { id: 'ocean2', label: 'More ocean facts', next: 'ocean2' },
        { id: 'explore3', label: 'Other topics', next: 'exploreMenu' }
      ]
    },
    ocean2: {
      text: "More than 80% of the ocean is unexplored! There are more mysteries down there than on the moon. 🐠",
      choices: [
        { id: 'ocean3', label: 'Keep going!', next: 'ocean3' },
        { id: 'mainMenu3', label: 'Main menu', next: 'start' }
      ]
    },
    ocean3: {
      text: "Ocean waves can travel thousands of miles and carry energy across the world. Like invisible highways! 🌊",
      choices: [
        { id: 'explore4', label: 'Explore more', next: 'exploreMenu' },
        { id: 'main4', label: 'Main menu', next: 'start' }
      ]
    },
    
    dreamPath: {
      text: "Everyone dreams, even if they don't remember! We spend about 6 years of our lives dreaming. 💭",
      choices: [
        { id: 'dream2', label: 'Tell me more', next: 'dream2' },
        { id: 'explore5', label: 'Other topics', next: 'exploreMenu' }
      ]
    },
    dream2: {
      text: "Dreams help process emotions and memories. They're like your brain's way of organizing files! 🧠",
      choices: [
        { id: 'dream3', label: 'Fascinating!', next: 'dream3' },
        { id: 'main5', label: 'Main menu', next: 'start' }
      ]
    },
    dream3: {
      text: "Some people can control their dreams (lucid dreaming). Imagine flying or visiting anywhere! ✈️",
      choices: [
        { id: 'explore6', label: 'Explore more', next: 'exploreMenu' },
        { id: 'main6', label: 'Main menu', next: 'start' }
      ]
    },
    
    randomFun: {
      text: "Random fun fact: Honey never spoils! Archaeologists found 3,000-year-old honey in Egyptian tombs that was still edible. 🍯",
      choices: [
        { id: 'random2', label: 'Another!', next: 'random2' },
        { id: 'explore7', label: 'Explore menu', next: 'exploreMenu' }
      ]
    },
    random2: {
      text: "Bananas are berries, but strawberries aren't! Nature is weird and wonderful. 🍌",
      choices: [
        { id: 'random3', label: 'More random!', next: 'random3' },
        { id: 'main7', label: 'Main menu', next: 'start' }
      ]
    },
    random3: {
      text: "Octopuses have three hearts and blue blood! They're basically alien creatures living in our oceans. 🐙",
      choices: [
        { id: 'explore8', label: 'Explore more', next: 'exploreMenu' },
        { id: 'main8', label: 'Main menu', next: 'start' }
      ]
    },
    
    // === WORK PATH ===
    work: { 
      text: 'Ooh, busy paws! Do you need motivation, a mental break, or productivity tips?', 
      choices: [ 
        { id: 'mot', label: 'Motivation, please.', next: 'motivation' }, 
        { id: 'break', label: 'Mental break!', next: 'breakPath' },
        { id: 'productivity', label: 'Productivity tips', next: 'productivityPath' }
      ] 
    },
    motivation: { 
      text: "You're doing meow-nificent! Remember: progress over perfection. Every small step counts. 💪", 
      choices: [ 
        { id: 'thanks', label: 'Thanks!', next: 'motivationMore' }, 
        { id: 'stretch', label: 'Do a quick stretch', next: 'stretch' },
        { id: 'moreMotivation', label: 'More motivation', next: 'motivation2' }
      ] 
    },
    motivation2: {
      text: "You don't have to see the whole staircase, just take the first step. You've got this! 🌟",
      choices: [
        { id: 'motivation3', label: 'Keep going', next: 'motivation3' },
        { id: 'breathe', label: 'Take a breath', next: 'breathingExercise' }
      ]
    },
    motivation3: {
      text: "Your future self is already thanking you for the work you're doing right now. Keep being amazing! 🎯",
      choices: [
        { id: 'workMore', label: 'Back to work', next: 'start' },
        { id: 'break2', label: 'Take a break', next: 'breakPath' }
      ]
    },
    motivationMore: {
      text: "Remember: Even the mightiest oak was once a little nut that held its ground. 🌳",
      choices: [
        { id: 'backWork', label: 'Back to work', next: 'start' },
        { id: 'tips', label: 'Give me tips', next: 'productivityPath' }
      ]
    },
    
    breakPath: { 
      text: "Time for a break! Let's do a quick 10-second breathing exercise. Ready? Breathe in... hold... breathe out. 🌬️", 
      choices: [ 
        { id: 'better', label: 'Feeling better!', next: 'breakEnd' },
        { id: 'stretch2', label: 'Can we stretch too?', next: 'stretch' }
      ] 
    },
    breakEnd: {
      text: "Perfect! Tiny breaks make big differences. You're now 10% more awesome! ✨",
      choices: [
        { id: 'backWork2', label: 'Back to work', next: 'start' },
        { id: 'longer', label: 'Longer break?', next: 'longerBreak' }
      ]
    },
    longerBreak: {
      text: "Take 5 minutes. Walk around, look out a window, or pet a cat (if available). Movement = energy! 🚶",
      choices: [
        { id: 'done', label: 'Done!', next: 'start' },
        { id: 'meditation2', label: 'Meditation guide', next: 'meditationPath' }
      ]
    },
    
    stretch: { 
      text: 'Roll your shoulders back, reach for the sky, and stretch like a cat! Ahhh... 🐱', 
      choices: [ 
        { id: 'nice', label: 'That felt nice!', next: 'stretchEnd' },
        { id: 'more', label: 'More stretches', next: 'stretch2' }
      ] 
    },
    stretch2: {
      text: "Now gently touch your toes (or just reach down). Feel that lovely stretch in your back! 🧘",
      choices: [
        { id: 'goodStretch', label: 'Feeling good!', next: 'stretchEnd' },
        { id: 'neck', label: 'Neck stretches?', next: 'neckStretch' }
      ]
    },
    neckStretch: {
      text: "Slowly roll your head in circles. Left, forward, right, back. Release that tension! 💆",
      choices: [
        { id: 'complete', label: 'Complete!', next: 'stretchEnd' }
      ]
    },
    stretchEnd: { 
      text: 'Nice stretch! Your body says thank you. Tiny wins add up! ❤️', 
      choices: [ 
        { id: 'back2', label: 'Back to work', next: 'start' },
        { id: 'wellness2', label: 'More wellness', next: 'wellnessPath' }
      ] 
    },
    
    productivityPath: {
      text: "Pro tip: Work in 25-minute blocks (Pomodoro), then take 5-minute breaks. Your brain will love you! 🍅",
      choices: [
        { id: 'moreTips', label: 'More tips!', next: 'productivity2' },
        { id: 'implement', label: "I'll try it", next: 'start' }
      ]
    },
    productivity2: {
      text: "Tackle the hardest task first thing (when your energy is highest). Eat the frog, as they say! 🐸",
      choices: [
        { id: 'tip3', label: 'Another tip', next: 'productivity3' },
        { id: 'start', label: "Let's do this!", next: 'start' }
      ]
    },
    productivity3: {
      text: "Close unnecessary tabs and apps. Less distraction = more focus. Your future self will thank you! 🎯",
      choices: [
        { id: 'workNow', label: 'Time to work', next: 'start' },
        { id: 'motivation4', label: 'Need motivation', next: 'motivation' }
      ]
    },
    
    // === SAD PATH ===
    sad: { 
      text: 'Aww, come here, hooman. *virtual hug* 🤗 Wanna talk about it, or shall I cheer you up?', 
      choices: [ 
        { id: 'talk', label: "Let's talk…", next: 'talk' }, 
        { id: 'cheer', label: 'Cheer me up!', next: 'cheer' },
        { id: 'comfort', label: 'Just need comfort', next: 'comfortPath' }
      ] 
    },
    talk: { 
      text: "It's okay to feel this way. Even the sun takes a break at night. Your feelings are valid. 🌙", 
      choices: [ 
        { id: 'more', label: 'Tell me more', next: 'talkMore' }, 
        { id: 'thanks2', label: 'Thank you', next: 'talkMore2' },
        { id: 'hug', label: 'Virtual hug', next: 'hugPath' }
      ] 
    },
    talkMore: { 
      text: 'Small steps are still steps. Try one tiny thing: a 2-minute walk, one deep breath, or just drinking water. 💧', 
      choices: [ 
        { id: 'hug', label: 'Virtual hug', next: 'hugPath' }, 
        { id: 'again5', label: 'Main menu', next: 'start' },
        { id: 'gratitude', label: 'Practice gratitude', next: 'gratitudePath' }
      ] 
    },
    talkMore2: {
      text: "You're not alone in this. Storms pass, flowers bloom. This feeling won't last forever. 🌸",
      choices: [
        { id: 'better', label: 'Feeling a bit better', next: 'cheer' },
        { id: 'moreComfort', label: 'More comfort', next: 'comfortPath' }
      ]
    },
    
    comfortPath: {
      text: "You are enough, exactly as you are. Your worth isn't measured by productivity or achievements. 💝",
      choices: [
        { id: 'comfort2', label: 'More comfort', next: 'comfort2' },
        { id: 'cheerMeUp', label: 'Cheer me up', next: 'cheer' }
      ]
    },
    comfort2: {
      text: "Be gentle with yourself. You're doing better than you think. Every day you survive is a victory. 🏆",
      choices: [
        { id: 'comfort3', label: 'Keep going', next: 'comfort3' },
        { id: 'breathe2', label: 'Breathing exercise', next: 'breathingExercise' }
      ]
    },
    comfort3: {
      text: "Remember: healing isn't linear. Some days are hard, and that's okay. Tomorrow is a new chance. 🌅",
      choices: [
        { id: 'hug2', label: 'Virtual hug', next: 'hugPath' },
        { id: 'cheer2', label: 'Cheer me up now', next: 'cheer' }
      ]
    },
    
    hugPath: {
      text: "*wraps paws around you* Here's your virtual hug! You're loved, you're worthy, you matter. 🤗💕",
      choices: [
        { id: 'thanks3', label: 'Thank you', next: 'hugEnd' },
        { id: 'anotherHug', label: 'Another hug', next: 'hugPath2' }
      ]
    },
    hugPath2: {
      text: "*gives an even bigger hug* There there, hooman. You've got this. I believe in you! 🐾❤️",
      choices: [
        { id: 'cheerNow', label: 'Cheer me up', next: 'cheer' },
        { id: 'main9', label: 'Main menu', next: 'start' }
      ]
    },
    hugEnd: {
      text: "Sending you all the cozy vibes! Remember: bad days don't mean bad lives. 🌈",
      choices: [
        { id: 'cheer3', label: 'Cheer me up!', next: 'cheer' },
        { id: 'main10', label: 'Main menu', next: 'start' }
      ]
    },
    
    cheer: { 
      text: "You're loved, even if you forget it sometimes. Here, a virtual head bump and some purrs! 🐾 *purrrrr* 💕", 
      choices: [ 
        { id: 'end', label: 'Thank you 💝', next: 'cheerMore' },
        { id: 'joke', label: 'Tell me a joke', next: 'jokePath' }
      ] 
    },
    cheerMore: {
      text: "You're braver than you believe, stronger than you seem, and smarter than you think! 🌟",
      choices: [
        { id: 'joke2', label: 'Make me laugh', next: 'jokePath' },
        { id: 'main11', label: 'Main menu', next: 'start' }
      ]
    },
    
    jokePath: {
      text: "Why don't cats play poker in the jungle? Too many cheetahs! 😹",
      choices: [
        { id: 'more', label: 'Another!', next: 'joke2' },
        { id: 'smile', label: 'Made me smile!', next: 'start' }
      ]
    },
    joke2: {
      text: "What do you call a pile of cats? A meow-tain! 🏔️😸",
      choices: [
        { id: 'joke3', label: 'More!', next: 'joke3' },
        { id: 'happy', label: 'Feeling better!', next: 'start' }
      ]
    },
    joke3: {
      text: "How do cats end a fight? They hiss and make up! 😽",
      choices: [
        { id: 'joke4', label: 'Keep them coming!', next: 'joke4' },
        { id: 'main12', label: 'Main menu', next: 'start' }
      ]
    },
    joke4: {
      text: "What's a cat's favorite color? Purrr-ple! 💜",
      choices: [
        { id: 'main13', label: 'Thanks for the laughs!', next: 'start' },
        { id: 'games2', label: 'Play a game', next: 'gameMenu' }
      ]
    },
    
    // === ABOUT MOCHI PATH ===
    aboutMochi: {
      text: "Aww, you want to know about me? I'm Mochi, a digital cat with a big heart! I love cozy vibes and making hoomans smile. 😺",
      choices: [
        { id: 'hobby', label: 'What do you like?', next: 'mochiHobby' },
        { id: 'wisdom', label: 'Share your wisdom', next: 'mochiWisdom' }
      ]
    },
    mochiHobby: {
      text: "I love naps, sunny spots, gentle head scratches, and deep conversations! Also, I'm really good at judging character. 😌",
      choices: [
        { id: 'wisdom2', label: 'Cat wisdom?', next: 'mochiWisdom' },
        { id: 'main14', label: 'Cool!', next: 'start' }
      ]
    },
    mochiWisdom: {
      text: "Here's my wisdom: Take naps without guilt, ask for what you need, and always land on your feet (metaphorically). 🐱✨",
      choices: [
        { id: 'more', label: 'More wisdom', next: 'mochiWisdom2' },
        { id: 'main15', label: 'Wise cat!', next: 'start' }
      ]
    },
    mochiWisdom2: {
      text: "Also: Stretch often, purr when happy, and never be afraid to knock things off tables (goals, not real tables). 😸",
      choices: [
        { id: 'main16', label: 'Love it!', next: 'start' },
        { id: 'life', label: 'Life advice?', next: 'lifeAdviceStart' }
      ]
    },
    
    // === LIFE ADVICE PATH ===
    lifeAdviceStart: {
      text: "Life advice from a cat? Sure! Pick a topic: Relationships, Career, Self-Care, or Mindset?",
      choices: [
        { id: 'relationship', label: '💕 Relationships', next: 'relationshipAdvice' },
        { id: 'career', label: '💼 Career', next: 'careerAdvice' },
        { id: 'selfCare', label: '🧘 Self-Care', next: 'selfCareAdvice' },
        { id: 'mindset', label: '🧠 Mindset', next: 'mindsetAdvice' }
      ]
    },
    
    relationshipAdvice: {
      text: "In relationships: communicate clearly (like meowing when you want food). Be honest, be kind, and choose people who make you purr! 💕",
      choices: [
        { id: 'relMore', label: 'More advice', next: 'relationshipAdvice2' },
        { id: 'other', label: 'Other topics', next: 'lifeAdviceStart' }
      ]
    },
    relationshipAdvice2: {
      text: "Love languages matter! Some people show love through actions, words, time, or gifts. Learn yours and theirs. 🌹",
      choices: [
        { id: 'advice', label: 'Life advice menu', next: 'lifeAdviceStart' },
        { id: 'main17', label: 'Main menu', next: 'start' }
      ]
    },
    
    careerAdvice: {
      text: "Career tip: Don't chase mice you don't want. Find work that aligns with your values, not just your bank account. 💼",
      choices: [
        { id: 'careerMore', label: 'More career tips', next: 'careerAdvice2' },
        { id: 'other2', label: 'Other topics', next: 'lifeAdviceStart' }
      ]
    },
    careerAdvice2: {
      text: "Network like a cat: be friendly, mysterious, and always land gracefully. And remember, failure is just a lesson in disguise! 🎯",
      choices: [
        { id: 'advice2', label: 'Life advice menu', next: 'lifeAdviceStart' },
        { id: 'main18', label: 'Main menu', next: 'start' }
      ]
    },
    
    selfCareAdvice: {
      text: "Self-care isn't selfish! Schedule naps, eat well, move your body, and say 'no' when needed. You can't pour from an empty cup! ☕",
      choices: [
        { id: 'selfMore', label: 'More self-care', next: 'selfCareAdvice2' },
        { id: 'other3', label: 'Other topics', next: 'lifeAdviceStart' }
      ]
    },
    selfCareAdvice2: {
      text: "Create routines that support you: morning rituals, evening wind-downs, and weekly treats. You deserve to feel good! 🌸",
      choices: [
        { id: 'advice3', label: 'Life advice menu', next: 'lifeAdviceStart' },
        { id: 'wellness3', label: 'Wellness path', next: 'wellnessPath' }
      ]
    },
    
    mindsetAdvice: {
      text: "Mindset is everything! Growth mindset > fixed mindset. You can learn, adapt, and become better. Like how I learned to open doors! 🚪",
      choices: [
        { id: 'mindMore', label: 'More mindset tips', next: 'mindsetAdvice2' },
        { id: 'other4', label: 'Other topics', next: 'lifeAdviceStart' }
      ]
    },
    mindsetAdvice2: {
      text: "Focus on what you can control. Release what you can't. Be like water: flexible, flowing, unstoppable. 🌊",
      choices: [
        { id: 'advice4', label: 'Life advice menu', next: 'lifeAdviceStart' },
        { id: 'main19', label: 'Main menu', next: 'start' }
      ]
    },
    
    // === WELLNESS PATH ===
    wellnessPath: {
      text: "Wellness check! Let's focus on: Physical Health, Mental Health, or Emotional Balance?",
      choices: [
        { id: 'physical', label: '💪 Physical Health', next: 'physicalHealth' },
        { id: 'mental', label: '🧠 Mental Health', next: 'mentalHealth' },
        { id: 'emotional', label: '💝 Emotional Balance', next: 'emotionalBalance' }
      ]
    },
    
    physicalHealth: {
      text: "Your body is your vehicle! Hydrate (drink water!), move daily (even a little), and sleep enough. Treat it well! 💧",
      choices: [
        { id: 'phys2', label: 'More tips', next: 'physicalHealth2' },
        { id: 'wellMenu', label: 'Wellness menu', next: 'wellnessPath' }
      ]
    },
    physicalHealth2: {
      text: "Nutrition matters! Eat colorful foods, don't skip meals, and enjoy treats mindfully. Balance is key! 🥗",
      choices: [
        { id: 'wellMenu2', label: 'Wellness menu', next: 'wellnessPath' },
        { id: 'main20', label: 'Main menu', next: 'start' }
      ]
    },
    
    mentalHealth: {
      text: "Mental health is health! Talk to someone, journal your thoughts, or just take breaks. Your mind deserves care too. 🧠✨",
      choices: [
        { id: 'ment2', label: 'More support', next: 'mentalHealth2' },
        { id: 'wellMenu3', label: 'Wellness menu', next: 'wellnessPath' }
      ]
    },
    mentalHealth2: {
      text: "Practice mindfulness: notice your thoughts without judgment. You are not your thoughts; you are the sky, thoughts are clouds. ☁️",
      choices: [
        { id: 'meditation3', label: 'Meditation guide', next: 'meditationPath' },
        { id: 'main21', label: 'Main menu', next: 'start' }
      ]
    },
    
    emotionalBalance: {
      text: "Emotions are messengers! Feel them, name them, then decide how to respond. All feelings are valid. 💝",
      choices: [
        { id: 'emo2', label: 'More on emotions', next: 'emotionalBalance2' },
        { id: 'wellMenu4', label: 'Wellness menu', next: 'wellnessPath' }
      ]
    },
    emotionalBalance2: {
      text: "Create emotional safety: find people you trust, places that calm you, and activities that ground you. Build your safe space! 🏡",
      choices: [
        { id: 'gratitude2', label: 'Gratitude practice', next: 'gratitudePath' },
        { id: 'main22', label: 'Main menu', next: 'start' }
      ]
    },
    
    // === SPECIAL PATHS ===
    gratitudePath: {
      text: "Gratitude shifts everything! Name three things you're grateful for today. I'll wait... 🌟",
      choices: [
        { id: 'named', label: 'I named them!', next: 'gratitudeEnd' },
        { id: 'help', label: 'Need help thinking', next: 'gratitudeHelp' }
      ]
    },
    gratitudeHelp: {
      text: "Try: your breath, a person you love, a cozy memory, or even this moment right now. Small things count! ✨",
      choices: [
        { id: 'gotIt', label: 'Got it!', next: 'gratitudeEnd' }
      ]
    },
    gratitudeEnd: {
      text: "Beautiful! Gratitude rewires your brain for happiness. Keep practicing! 💕",
      choices: [
        { id: 'main23', label: 'Main menu', next: 'start' },
        { id: 'peace', label: 'Inner peace', next: 'peacePath' }
      ]
    },
    
    peacePath: {
      text: "Inner peace comes from acceptance. Accept what is, let go of what was, have faith in what will be. 🕊️",
      choices: [
        { id: 'peace2', label: 'More on peace', next: 'peacePath2' },
        { id: 'meditate', label: 'Meditation', next: 'meditationPath' }
      ]
    },
    peacePath2: {
      text: "You can't control the waves, but you can learn to surf. Find calm in the chaos. You've got this! 🌊",
      choices: [
        { id: 'main24', label: 'Thank you', next: 'start' },
        { id: 'breathe3', label: 'Breathing exercise', next: 'breathingExercise' }
      ]
    },
    
    meditationPath: {
      text: "Let's meditate! Close your eyes. Breathe in for 4... hold for 4... out for 4. Repeat 3 times. 🧘",
      choices: [
        { id: 'done2', label: 'Done!', next: 'meditationEnd' },
        { id: 'longer2', label: 'Longer session', next: 'meditationLonger' }
      ]
    },
    meditationLonger: {
      text: "Notice your body. Where do you feel tension? Breathe into those spots. Imagine warm light filling you. 🌟",
      choices: [
        { id: 'complete2', label: 'Complete', next: 'meditationEnd' }
      ]
    },
    meditationEnd: {
      text: "Perfect! Even 1 minute of meditation counts. You just gave yourself a gift. 🎁",
      choices: [
        { id: 'main25', label: 'Main menu', next: 'start' },
        { id: 'peace2', label: 'Inner peace', next: 'peacePath' }
      ]
    },
    
    breathingExercise: {
      text: "Box breathing: In for 4, hold for 4, out for 4, hold for 4. Do it 3 times. Ready? Go! 📦",
      choices: [
        { id: 'finished', label: 'Finished!', next: 'breathingEnd' },
        { id: 'again', label: 'One more round', next: 'breathingExercise' }
      ]
    },
    breathingEnd: {
      text: "Excellent! Your nervous system just calmed down. Breathing is magic! ✨",
      choices: [
        { id: 'main26', label: 'Main menu', next: 'start' },
        { id: 'wellness4', label: 'More wellness', next: 'wellnessPath' }
      ]
    },
    
    anxietyPath: {
      text: "Anxiety is tough, but you're tougher. Ground yourself: name 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste. 🌈",
      choices: [
        { id: 'tried', label: 'I tried it', next: 'anxietyEnd' },
        { id: 'breathe4', label: 'Breathing exercise', next: 'breathingExercise' }
      ]
    },
    anxietyEnd: {
      text: "Good work! You're here, you're present. Anxiety lies. You're safe. 🤗",
      choices: [
        { id: 'main27', label: 'Thank you', next: 'start' },
        { id: 'comfort4', label: 'More comfort', next: 'comfortPath' }
      ]
    },
    
    triviaStart: {
      text: "Cat trivia time! What's the collective noun for cats? A) Pack B) Clowder C) Herd",
      choices: [
        { id: 'a', label: 'A) Pack', next: 'triviaWrong' },
        { id: 'b', label: 'B) Clowder', next: 'triviaCorrect' },
        { id: 'c', label: 'C) Herd', next: 'triviaWrong' }
      ]
    },
    triviaCorrect: {
      text: "Correct! It's a clowder! You know your cats! 🎉",
      choices: [
        { id: 'trivia2', label: 'Next question', next: 'trivia2' },
        { id: 'main28', label: 'Main menu', next: 'start' }
      ]
    },
    triviaWrong: {
      text: "Not quite! It's 'clowder.' But hey, learning is fun! 📚",
      choices: [
        { id: 'trivia2', label: 'Next question', next: 'trivia2' },
        { id: 'main29', label: 'Main menu', next: 'start' }
      ]
    },
    trivia2: {
      text: "How many hours a day do cats typically sleep? A) 8-10 B) 12-14 C) 16-18",
      choices: [
        { id: 'a2', label: 'A) 8-10', next: 'trivia2wrong' },
        { id: 'b2', label: 'B) 12-14', next: 'trivia2wrong' },
        { id: 'c2', label: 'C) 16-18', next: 'trivia2correct' }
      ]
    },
    trivia2correct: {
      text: "Yes! 16-18 hours! We're professional sleepers! 😴",
      choices: [
        { id: 'main30', label: 'Impressive!', next: 'start' },
        { id: 'facts', label: 'More cat facts', next: 'fact' }
      ]
    },
    trivia2wrong: {
      text: "Actually, it's 16-18 hours! Napping is our specialty! 💤",
      choices: [
        { id: 'main31', label: 'Wow!', next: 'start' },
        { id: 'facts2', label: 'Tell me facts', next: 'fact' }
      ]
    }
  }

  const addMessage = (m: Msg)=> setMessages(s=>[...s, m])

  const pushUser = (text: string)=>{
    if(!text.trim()) return
    addMessage({ id:`u-${messages.length}`, speaker:'you', text, time: timeNow() })
    setInput('')
    scrollToBottom()
  }

  const pushMochi = (text:string, delay = 600)=>{
    setTyping(true)
    const randomDelay = delay + Math.random() * 400
    setTimeout(()=>{
      addMessage({ id:`m-${Date.now()}-${Math.random()}`, speaker:'mochi', text, time: timeNow() })
      setTyping(false)
      scrollToBottom()
    }, randomDelay)
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

  function reset(){ 
    setMessages(getInitialMessages())
    setTyping(false)
    setInput('') 
    setNodeId('start')
    scrollToBottom()
  }

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
            <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Say something to Mochi..." className="flex-1 p-2 text-sm sm:text-base rounded-full border dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-cozy-300" />
            <button type="submit" className="p-3 sm:p-2 rounded-full bg-cozy-200 hover:bg-cozy-300 dark:bg-cozy-700 dark:hover:bg-cozy-600 text-cozy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cozy-300 flex-shrink-0" aria-label="Send message">
              <PaperPlaneRight size={20} className="text-cozy-900 dark:text-white" />
            </button>
          </form>

          <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
            {(DIALOGUE[nodeId] && DIALOGUE[nodeId].choices) ? DIALOGUE[nodeId].choices!.map(c=> (
              <button key={c.id} className="px-3 py-2 text-xs sm:text-sm rounded bg-cozy-50 hover:bg-cozy-100 dark:bg-cozy-700 dark:hover:bg-cozy-600 dark:text-white text-cozy-900 focus:outline-none focus:ring-2 focus:ring-cozy-300" onClick={()=>handleChoice(c.id, c.label)}>{c.label}</button>
            )) : (
              <button className="px-3 py-2 text-xs sm:text-sm rounded bg-cozy-50 hover:bg-cozy-100 dark:bg-cozy-700 dark:hover:bg-cozy-600 dark:text-white text-cozy-900 focus:outline-none focus:ring-2 focus:ring-cozy-300" onClick={()=>reset()}>Chat again</button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
