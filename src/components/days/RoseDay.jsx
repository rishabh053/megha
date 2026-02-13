import { useState } from 'react'

function RoseDay({ onBack }) {
  const [showMessage, setShowMessage] = useState(false)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })

  const handleYes = () => {
    setShowMessage(true)
    localStorage.setItem('day-rose-completed', 'true')
  }

  const handleNoHover = () => {
    const randomX = Math.random() * 100 - 50
    const randomY = Math.random() * 20 - 10
    setNoButtonPosition({ x: randomX, y: randomY })
  }

  if (showMessage) {
    return (
      <div className="container">
        <div className="card">
          <span className="emoji">🌹</span>
          <h1 className="title">For You, Megha</h1>
          <div className="message">
            This rose represents all the beauty and grace you bring into my life. 
            Just like this flower, you make everything around you bloom with happiness. 
            Thank you for being you. ❤️
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
      <div className="card">
        <span className="emoji">🌹</span>
        <h1 className="title">Rose Day</h1>
        <p className="subtitle">
          Hey Megha, I have something for you...
        </p>

        <p style={{ fontSize: '1.2rem', margin: '30px 0', fontWeight: '500' }}>
          Can I give you this rose? 🌹
        </p>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="button" onClick={handleYes}>
            Yes! 💕
          </button>
          <button
            className="button-secondary button"
            onMouseEnter={handleNoHover}
            style={{
              transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
              transition: 'transform 0.3s ease',
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

export default RoseDay
