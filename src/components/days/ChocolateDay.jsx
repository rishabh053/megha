import { useState } from 'react'

function ChocolateDay({ onBack }) {
  const [showMessage, setShowMessage] = useState(false)
  const [noButtonText, setNoButtonText] = useState('No')

  const handleYes = () => {
    setShowMessage(true)
    localStorage.setItem('day-chocolate-completed', 'true')
  }

  const handleNoHover = () => {
    if (noButtonText === 'No') {
      setNoButtonText('Maybe...')
    } else if (noButtonText === 'Maybe...') {
      setNoButtonText('Okay yes 🍫')
    }
  }

  const handleNoClick = () => {
    if (noButtonText === 'Okay yes 🍫') {
      setShowMessage(true)
      localStorage.setItem('day-chocolate-completed', 'true')
    }
  }

  if (showMessage) {
    return (
      <div className="container">
        <div className="card">
          <span className="emoji">🍫</span>
          <h1 className="title">Sweet Like You</h1>
          <div className="message">
            Just like chocolate is sweet and comforting, you bring sweetness and warmth to my life. 
            You make every day feel like a celebration. Here's to all the sweet moments we've shared 
            and all the ones yet to come, Megha! 🍫❤️
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
        <span className="emoji">🍫</span>
        <h1 className="title">Chocolate Day</h1>
        <p className="subtitle">
          Because every sweet moment deserves chocolate...
        </p>

        <p style={{ fontSize: '1.2rem', margin: '30px 0', fontWeight: '500' }}>
          Do you want some chocolate? 🍫
        </p>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="button" onClick={handleYes}>
            Yes please! 💕
          </button>
          <button
            className="button-secondary button"
            onMouseEnter={handleNoHover}
            onClick={handleNoClick}
          >
            {noButtonText}
          </button>
        </div>

        <p style={{ marginTop: '20px', fontSize: '0.85rem', color: '#8a7a8f', fontStyle: 'italic' }}>
          (Hover over "No" if you're unsure 😉)
        </p>

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

export default ChocolateDay
