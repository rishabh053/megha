import { useState, useRef, useEffect } from 'react'

function HugDay({ onBack }) {
  const [showMessage, setShowMessage] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isHolding, setIsHolding] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [achievement, setAchievement] = useState('')
  const intervalRef = useRef(null)
  const audioRef = useRef(null)

  useEffect(() => {
    // Create audio context for heartbeat sound
    if (soundEnabled && !audioRef.current) {
      audioRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
  }, [soundEnabled])

  const playHeartbeat = () => {
    if (!soundEnabled || !audioRef.current) return
    
    const audioContext = audioRef.current
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.value = 100
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.1)
  }

  const startHolding = () => {
    setIsHolding(true)
    let currentProgress = 0
    let heartbeatCounter = 0
    
    intervalRef.current = setInterval(() => {
      currentProgress += 2
      setProgress(currentProgress)
      
      // Play heartbeat every 800ms (simulating heartbeat rhythm)
      heartbeatCounter++
      if (heartbeatCounter % 8 === 0) {
        playHeartbeat()
      }
      
      // Update achievement levels
      if (currentProgress === 20) {
        setAchievement('Gentle Hug 🤗')
      } else if (currentProgress === 40) {
        setAchievement('Warm Hug 💕')
      } else if (currentProgress === 60) {
        setAchievement('Tight Hug 🥰')
      } else if (currentProgress === 80) {
        setAchievement('Bear Hug 🐻')
      }
      
      if (currentProgress >= 100) {
        clearInterval(intervalRef.current)
        setAchievement('🎉 Legendary Hug Achieved! 🎉')
        setTimeout(() => {
          setShowMessage(true)
          localStorage.setItem('day-hug-completed', 'true')
        }, 1000)
      }
    }, 100)
  }

  const stopHolding = () => {
    setIsHolding(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setProgress(0)
    setAchievement('')
  }

  const getBackgroundColor = () => {
    if (progress < 33) return '#e5d4ff' // lavender (cold)
    if (progress < 66) return '#ffd4c4' // peach (warm)
    return '#ffb3d9' // hot pink
  }

  const getHugDistance = () => {
    // Characters get closer as progress increases
    return Math.max(80, 220 - (progress * 1.4))
  }

  if (showMessage) {
    return (
      <div className="container">
        <div className="card">
          <span className="emoji">🤗</span>
          <h1 className="title">Virtual Hug Delivered!</h1>
          <div className="message">
            *Holds you close and never lets go* 🤗
            <br /><br />
            Megha, in my arms is where you belong. Every hug from you feels like coming home. 
            You make everything better just by being near me. Thank you for being my safe place, 
            my comfort, and my greatest joy.
            <br /><br />
            This hug is a promise - I'll always be here to hold you tight, 
            to celebrate your joys, and to comfort you through anything.
            <br /><br />
            Can't wait to give you a real one soon! 💕
            <br /><br />
            - Forever hugging you, Rishabh
          </div>
          <button className="button" onClick={onBack}>
            Back to Days
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="card" style={{ 
        background: `linear-gradient(135deg, ${getBackgroundColor()} 0%, rgba(255, 249, 240, 0.95) 100%)`,
        transition: 'background 0.5s ease'
      }}>
        <span className="emoji">🤗</span>
        <h1 className="title">Hug Day</h1>
        <p className="subtitle">
          Hold tight for a warm hug...
        </p>

        {/* Animated characters */}
        <div style={{ 
          height: '200px', 
          position: 'relative', 
          margin: '30px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Left character (Rishabh) */}
          <div style={{
            position: 'absolute',
            left: `calc(50% - ${getHugDistance()}px)`,
            fontSize: '4rem',
            transition: 'left 0.3s ease',
            transform: 'scaleX(-1)',
            filter: 'drop-shadow(0 5px 10px rgba(0, 0, 0, 0.1))'
          }}>
            🧑
          </div>

          {/* Right character (Megha) */}
          <div style={{
            position: 'absolute',
            right: `calc(50% - ${getHugDistance()}px)`,
            fontSize: '4rem',
            transition: 'right 0.3s ease',
            filter: 'drop-shadow(0 5px 10px rgba(0, 0, 0, 0.1))'
          }}>
            👩
          </div>

          {/* Hearts appear as they get closer */}
          {progress > 30 && (
            <div style={{
              position: 'absolute',
              fontSize: '2rem',
              animation: 'float 2s ease-in-out infinite',
              opacity: Math.min(1, progress / 50)
            }}>
              ❤️
            </div>
          )}
        </div>

        {achievement && (
          <p style={{ 
            fontSize: '1.3rem', 
            color: '#ff6b9d', 
            fontWeight: '700',
            marginBottom: '15px',
            animation: 'pulse 0.5s ease'
          }}>
            {achievement}
          </p>
        )}

        <div style={{ marginBottom: '20px' }}>
          <button
            className="button"
            onMouseDown={startHolding}
            onMouseUp={stopHolding}
            onMouseLeave={stopHolding}
            onTouchStart={startHolding}
            onTouchEnd={stopHolding}
            style={{
              width: '250px',
              background: progress > 0 
                ? `linear-gradient(90deg, #4ade80 ${progress}%, #ff99cc ${progress}%)`
                : 'linear-gradient(135deg, var(--pink) 0%, #ff99cc 100%)',
            }}
          >
            {isHolding ? `Hugging... ${Math.floor(progress / 20)}s ❤️` : 'Hold for Hug 🤗'}
          </button>
        </div>

        {/* Progress bar */}
        <div style={{ 
          width: '250px', 
          height: '12px', 
          background: 'rgba(240, 240, 240, 0.6)', 
          borderRadius: '10px',
          margin: '0 auto 20px',
          overflow: 'hidden',
          border: '2px solid rgba(255, 182, 193, 0.3)'
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #4ade80, #22c55e)',
            borderRadius: '10px',
            transition: 'width 0.1s linear',
            boxShadow: progress > 0 ? '0 0 10px rgba(74, 222, 128, 0.5)' : 'none'
          }} />
        </div>

        {/* Sound toggle */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          style={{
            background: 'transparent',
            border: '2px solid #ff99cc',
            borderRadius: '20px',
            padding: '8px 20px',
            fontSize: '1rem',
            cursor: 'pointer',
            color: '#8a7a8f',
            marginBottom: '15px',
            fontFamily: 'Caveat, cursive',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#ffe0f0'
            e.currentTarget.style.borderColor = '#ff6b9d'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.borderColor = '#ff99cc'
          }}
        >
          {soundEnabled ? '🔊 Sound On' : '🔇 Enable Heartbeat Sound'}
        </button>

        <p style={{ fontSize: '1rem', color: '#8a7a8f', fontStyle: 'italic', marginBottom: '20px' }}>
          Hold for 5 seconds to complete the hug 💕
        </p>

        <button
          className="button-secondary button"
          onClick={onBack}
          style={{ marginTop: '20px' }}
        >
          ← Back
        </button>

        <style>{`
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
        `}</style>
      </div>
    </div>
  )
}

export default HugDay
