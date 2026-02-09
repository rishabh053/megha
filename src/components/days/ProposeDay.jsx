import { useState, useRef } from 'react'

function ProposeDay({ onBack }) {
  const [showMessage, setShowMessage] = useState(false)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)

  const handleYes = () => {
    setShowMessage(true)
    localStorage.setItem('day-propose-completed', 'true')
  }

  const handleNoHover = (e) => {
    const container = containerRef.current
    if (container) {
      const rect = container.getBoundingClientRect()
      const maxX = rect.width - 150
      const maxY = rect.height - 100
      
      const randomX = Math.random() * maxX - maxX / 2
      const randomY = Math.random() * maxY - maxY / 2
      
      setNoButtonPosition({ x: randomX, y: randomY })
    }
  }

  if (showMessage) {
    return (
      <div className="container">
        <div className="card">
          <span className="emoji">💍</span>
          <h1 className="title">You Said Yes!</h1>
          <div className="message">
            Megha, you've made me the happiest person alive. 
            Every moment with you is a treasure, and I promise to cherish you today, 
            tomorrow, and forever. You're my best friend, my love, my everything. 
            <br /><br />
            - Forever yours, Rishabh 💕
          </div>
          <button className="button" onClick={onBack}>
            Back to Days
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container" ref={containerRef}>
      <div className="card">
        <span className="emoji">💍</span>
        <h1 className="title">Propose Day</h1>
        <p className="subtitle">
          Megha, I have the most important question...
        </p>

        <p style={{ fontSize: '1.3rem', margin: '30px 0', fontWeight: '600', color: '#ff6b9d' }}>
          Will you be mine? ❤️
        </p>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', position: 'relative', minHeight: '120px' }}>
          <button className="button" onClick={handleYes}>
            Yes, Forever! 💕
          </button>
          <button
            className="button-secondary button"
            onMouseEnter={handleNoHover}
            style={{
              transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
              transition: 'transform 0.2s ease',
              position: noButtonPosition.x !== 0 ? 'absolute' : 'relative',
            }}
          >
            No
          </button>
        </div>

        <button
          className="button-secondary button"
          onClick={onBack}
          style={{ marginTop: '30px' }}
        >
          ← Back
        </button>
      </div>
    </div>
  )
}

export default ProposeDay
