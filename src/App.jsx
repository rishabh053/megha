import { useState, useEffect } from 'react'
import './App.css'
import LockScreen from './components/LockScreen'
import DaySelection from './components/DaySelection'
import RoseDay from './components/days/RoseDay'
import ProposeDay from './components/days/ProposeDay'
import ChocolateDay from './components/days/ChocolateDay'
import TeddyDay from './components/days/TeddyDay'
import HugDay from './components/days/HugDay'
import KissDay from './components/days/KissDay'
import ValentineDay from './components/days/ValentineDay'

// Floating Hearts Background Component
function FloatingHearts() {
  const hearts = ['💕', '❤️', '💖', '💗', '💝', '💘']
  const positions = []
  
  for (let i = 0; i < 15; i++) {
    positions.push({
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 15}s`,
      animationDuration: `${15 + Math.random() * 10}s`,
      heart: hearts[Math.floor(Math.random() * hearts.length)]
    })
  }
  
  return (
    <div className="floating-hearts">
      {positions.map((pos, i) => (
        <div
          key={i}
          className="floating-heart"
          style={{
            left: pos.left,
            animationDelay: pos.animationDelay,
            animationDuration: pos.animationDuration
          }}
        >
          {pos.heart}
        </div>
      ))}
    </div>
  )
}

// Footer Component
function Footer() {
  return (
    <div className="footer-container">
      <div className="footer">
        Made with <span className="heart">❤️</span> for Megha
      </div>
    </div>
  )
}

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [selectedDay, setSelectedDay] = useState(null)

  useEffect(() => {
    const unlocked = localStorage.getItem('valentine-unlocked')
    if (unlocked === 'true') {
      setIsUnlocked(true)
    }
  }, [])

  const handleUnlock = () => {
    localStorage.setItem('valentine-unlocked', 'true')
    setIsUnlocked(true)
  }

  const handleBack = () => {
    setSelectedDay(null)
  }

  if (!isUnlocked) {
    return (
      <>
        <FloatingHearts />
        <LockScreen onUnlock={handleUnlock} />
        <Footer />
      </>
    )
  }

  if (selectedDay === 'rose') {
    return (
      <>
        <FloatingHearts />
        <RoseDay onBack={handleBack} />
        <Footer />
      </>
    )
  }
  if (selectedDay === 'propose') {
    return (
      <>
        <FloatingHearts />
        <ProposeDay onBack={handleBack} />
        <Footer />
      </>
    )
  }
  if (selectedDay === 'chocolate') {
    return (
      <>
        <FloatingHearts />
        <ChocolateDay onBack={handleBack} />
        <Footer />
      </>
    )
  }
  if (selectedDay === 'teddy') {
    return (
      <>
        <FloatingHearts />
        <TeddyDay onBack={handleBack} />
        <Footer />
      </>
    )
  }
  if (selectedDay === 'hug') {
    return (
      <>
        <FloatingHearts />
        <HugDay onBack={handleBack} />
        <Footer />
      </>
    )
  }
  if (selectedDay === 'kiss') {
    return (
      <>
        <FloatingHearts />
        <KissDay onBack={handleBack} />
        <Footer />
      </>
    )
  }
  if (selectedDay === 'valentine') {
    return (
      <>
        <FloatingHearts />
        <ValentineDay onBack={handleBack} />
        <Footer />
      </>
    )
  }

  return (
    <>
      <FloatingHearts />
      <DaySelection onSelectDay={setSelectedDay} />
      <Footer />
    </>
  )
}

export default App
