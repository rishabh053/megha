import { useState } from 'react'

function TeddyDay({ onBack }) {
  const [showMessage, setShowMessage] = useState(false)
  const [openedBoxes, setOpenedBoxes] = useState([])
  const [foundTeddy, setFoundTeddy] = useState(false)
  
  // Randomly assign teddy to one box (between 0-8)
  const [teddyBox] = useState(() => Math.floor(Math.random() * 9))

  // Generate box contents with teddy at the random position
  const getBoxContent = (index) => {
    if (index === teddyBox) return '🧸'
    const nonTeddyEmojis = ['💕', '🌸', '🌹', '💐', '✨', '🎀', '🌺', '💝']
    // Use a deterministic way to pick emoji for each box
    return nonTeddyEmojis[index % nonTeddyEmojis.length]
  }

  const handleBoxClick = (index) => {
    if (openedBoxes.includes(index) || foundTeddy) return

    setOpenedBoxes([...openedBoxes, index])

    if (index === teddyBox) {
      setFoundTeddy(true)
      setTimeout(() => {
        setShowMessage(true)
        localStorage.setItem('day-teddy-completed', 'true')
      }, 1000)
    }
  }

  if (showMessage) {
    return (
      <div className="container">
        <div className="card">
          <span className="emoji">🧸</span>
          <h1 className="title">You Found Me!</h1>
          <div className="message">
            This teddy is a reminder that I'm always here for you, Megha. 
            Just like a teddy bear, I want to be your comfort on tough days, 
            your warmth on cold nights, and your companion through everything. 
            Whenever you need a hug, just imagine this little guy (and me!) wrapping you in love. 
            <br /><br />
            You're my cuddle buddy forever! 🧸💕
            <br /><br />
            - Your Rishabh
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
        <span className="emoji">🧸</span>
        <h1 className="title">Teddy Day</h1>
        <p className="subtitle">
          I've hidden a special teddy bear for you! Open the gift boxes to find it...
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          margin: '25px 0',
          maxWidth: '380px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => {
            const isOpened = openedBoxes.includes(index)
            const isTeddyBox = index === teddyBox && foundTeddy
            
            return (
              <div
                key={index}
                onClick={() => handleBoxClick(index)}
                style={{
                  width: '100%',
                  aspectRatio: '1',
                  background: isOpened 
                    ? (isTeddyBox 
                        ? 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)'
                        : 'linear-gradient(135deg, #f5f5f5 0%, #efefef 100%)')
                    : 'linear-gradient(135deg, #ffb3d9 0%, #ff99cc 100%)',
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: isOpened ? '2.8rem' : '2rem',
                  cursor: isOpened ? 'default' : 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  boxShadow: isOpened 
                    ? '0 2px 8px rgba(0,0,0,0.08)' 
                    : '0 6px 18px rgba(255, 107, 157, 0.3)',
                  transform: isOpened ? 'scale(0.95)' : 'scale(1)',
                  animation: isTeddyBox ? 'bounce 0.6s ease' : 'none',
                  border: isTeddyBox ? '3px solid #ffd700' : isOpened ? '1px solid rgba(0,0,0,0.05)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isOpened) {
                    e.currentTarget.style.transform = 'scale(1.05) translateY(-5px)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isOpened) {
                    e.currentTarget.style.transform = 'scale(1)'
                  }
                }}
              >
                {isOpened ? getBoxContent(index) : '🎁'}
              </div>
            )
          })}
        </div>

        {openedBoxes.length > 0 && !foundTeddy && (
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#8a7a8f', 
            marginTop: '10px', 
            fontStyle: 'italic',
            fontFamily: 'var(--text-font)'
          }}>
            Keep looking! The teddy is waiting for you... 🧸
          </p>
        )}

        {foundTeddy && (
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#ff6b9d', 
            marginTop: '15px', 
            fontWeight: '600',
            fontFamily: 'var(--text-font)'
          }}>
            🎉 You found it! Opening your surprise... 🎉
          </p>
        )}

        <button
          className="button-secondary button"
          onClick={onBack}
          style={{ marginTop: '30px' }}
        >
          ← Back
        </button>

        <style>{`
          @keyframes bounce {
            0%, 100% { transform: scale(0.95) translateY(0); }
            25% { transform: scale(1.1) translateY(-10px); }
            50% { transform: scale(0.95) translateY(0); }
            75% { transform: scale(1.05) translateY(-5px); }
          }
        `}</style>
      </div>
    </div>
  )
}

export default TeddyDay
