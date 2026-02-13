import { useState } from 'react'

function KissDay({ onBack }) {
  const [showMessage, setShowMessage] = useState(false)
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [spinsLeft, setSpinsLeft] = useState(3)
  const [collectedKisses, setCollectedKisses] = useState([])
  const [currentKiss, setCurrentKiss] = useState(null)

  const kissTypes = [
    { type: 'Forehead Kiss', emoji: '💋', message: 'A gentle forehead kiss to remind you that you\'re cherished and protected. You mean the world to me, Megha.' },
    { type: 'Cheek Kiss', emoji: '😘', message: 'A sweet cheek kiss just because you\'re adorable! Your smile makes my heart skip a beat every time.' },
    { type: 'Surprise Kiss', emoji: '💕', message: 'A surprise kiss when you least expect it! I love catching you off guard with my affection.' },
    { type: 'Eskimo Kiss', emoji: '🥰', message: 'A playful Eskimo kiss! Rubbing noses with you is one of my favorite things - so cute and intimate.' },
    { type: 'Butterfly Kiss', emoji: '🦋', message: 'Soft butterfly kisses with our eyelashes! Every little moment with you is magical.' },
    { type: 'Hand Kiss', emoji: '👑', message: 'A chivalrous hand kiss! You\'re my queen, and I\'ll always treat you like royalty.' }
  ]

  const handleSpin = () => {
    if (spinning || spinsLeft === 0) return

    setSpinning(true)
    setCurrentKiss(null)

    // Random rotation between 3-5 full spins plus random angle
    const spins = 3 + Math.floor(Math.random() * 3)
    const extraRotation = Math.floor(Math.random() * 360)
    const totalRotation = rotation + (spins * 360) + extraRotation

    setRotation(totalRotation)

    setTimeout(() => {
      // Calculate which kiss we landed on
      const normalizedRotation = totalRotation % 360
      const kissIndex = Math.floor(normalizedRotation / 60)
      const selectedKiss = kissTypes[kissIndex]
      
      setCurrentKiss(selectedKiss)
      setCollectedKisses([...collectedKisses, selectedKiss])
      setSpinning(false)
      setSpinsLeft(spinsLeft - 1)

      // After 3 spins, show final message
      if (spinsLeft === 1) {
        setTimeout(() => {
          setShowMessage(true)
          localStorage.setItem('day-kiss-completed', 'true')
        }, 2500)
      }
    }, 3000)
  }

  if (showMessage) {
    return (
      <div className="container">
        <div className="card">
          <span className="emoji">💋</span>
          <h1 className="title">All My Kisses for You!</h1>
          <div className="message">
            You collected: {collectedKisses.map(k => k.emoji).join(' ')}
            <br /><br />
            But here's the truth, Megha - every type of kiss, every moment, 
            every touch... they all mean the same thing: I love you.
            <br /><br />
            Your kisses are my favorite thing in the world. They make my heart race, 
            my worries disappear, and remind me that I'm exactly where I belong.
            <br /><br />
            Here's to a million more kisses - forehead kisses when you're sleepy, 
            surprise kisses just because, and all the sweet moments in between! 😘
            <br /><br />
            - Love and kisses, Rishabh 💋💕
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
        <span className="emoji">💋</span>
        <h1 className="title">Kiss Day</h1>
        <p className="subtitle">
          Spin the wheel to discover different types of kisses! 💋
        </p>

        {/* Elegant Spinning Wheel */}
        <div style={{
          width: '300px',
          height: '300px',
          margin: '30px auto',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Wheel segments */}
          <div style={{
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            position: 'relative',
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? 'transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
            background: 'conic-gradient(from 0deg, ' +
              '#ffd4e5 0deg 60deg, ' +      // Soft pink
              '#e5d4ff 60deg 120deg, ' +    // Lavender
              '#d4f4dd 120deg 180deg, ' +   // Mint
              '#ffd4c4 180deg 240deg, ' +   // Peach
              '#ffe0f0 240deg 300deg, ' +   // Light pink
              '#f0e5ff 300deg 360deg)',      // Soft purple
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12), inset 0 0 0 8px rgba(255, 255, 255, 0.6)',
            border: '3px solid white',
            filter: 'drop-shadow(0 4px 15px rgba(255, 107, 157, 0.15))'
          }}>
            {/* Elegant segment dividers */}
            {kissTypes.map((_, index) => {
              const angle = index * 60
              return (
                <div key={`divider-${index}`} style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '2px',
                  height: '50%',
                  background: 'rgba(255, 255, 255, 0.5)',
                  transformOrigin: 'top center',
                  transform: `translate(-50%, 0) rotate(${angle}deg)`
                }} />
              )
            })}

            {/* Kiss type labels - elegant positioning */}
            {kissTypes.map((kiss, index) => {
              const angle = (index * 60) + 30 // Center of each segment
              const radian = (angle * Math.PI) / 180
              const radius = 100
              const x = Math.cos(radian) * radius
              const y = Math.sin(radian) * radius

              return (
                <div key={index} style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle + 90}deg)`,
                  fontSize: '2rem',
                  pointerEvents: 'none',
                  filter: 'drop-shadow(0 2px 4px rgba(255, 255, 255, 0.8))'
                }}>
                  {kiss.emoji}
                </div>
              )
            })}
          </div>

          {/* Elegant pointer at top */}
          <div style={{
            position: 'absolute',
            top: '-25px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10
          }}>
            <div style={{
              width: '0',
              height: '0',
              borderLeft: '15px solid transparent',
              borderRight: '15px solid transparent',
              borderTop: '25px solid #ff6b9d',
              filter: 'drop-shadow(0 4px 8px rgba(255, 107, 157, 0.3))'
            }} />
          </div>

          {/* Center circle with elegant styling */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'linear-gradient(135deg, #fff 0%, #fafafa 100%)',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15), inset 0 2px 4px rgba(255, 255, 255, 0.9)',
            border: '4px solid #ff6b9d',
            zIndex: 5
          }}>
            💋
          </div>
        </div>

        {/* Current kiss result */}
        {currentKiss && !spinning && (
          <div style={{
            background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
            padding: '20px',
            borderRadius: '20px',
            margin: '20px 0',
            animation: 'slideUp 0.5s ease',
            border: '1px solid rgba(0, 0, 0, 0.05)'
          }}>
            <h3 style={{ 
              fontSize: '1.5rem', 
              marginBottom: '10px', 
              color: '#5a4a5f',
              fontFamily: 'var(--subheader-font)'
            }}>
              {currentKiss.emoji} {currentKiss.type}
            </h3>
            <p style={{ 
              fontSize: '1.15rem', 
              color: '#5a4a5f', 
              lineHeight: '1.7',
              fontFamily: 'var(--text-font)'
            }}>
              {currentKiss.message}
            </p>
          </div>
        )}

        {/* Spin button and counter */}
        <div style={{ marginTop: '20px' }}>
          <button
            className="button"
            onClick={handleSpin}
            disabled={spinning || spinsLeft === 0}
            style={{
              opacity: spinning || spinsLeft === 0 ? 0.6 : 1,
              cursor: spinning || spinsLeft === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            {spinning ? 'Spinning... 💫' : spinsLeft > 0 ? `Spin the Wheel! 🎡` : 'All Spins Used! 💕'}
          </button>
          
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#8a7a8f', 
            marginTop: '15px', 
            fontWeight: '500',
            fontFamily: 'var(--text-font)'
          }}>
            Spins remaining: {spinsLeft} / 3
          </p>

          {spinsLeft === 0 && !showMessage && (
            <p style={{ 
              fontSize: '1rem', 
              color: '#ff6b9d', 
              marginTop: '10px', 
              fontStyle: 'italic',
              fontFamily: 'var(--text-font)'
            }}>
              Opening your final surprise... 💋
            </p>
          )}
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

export default KissDay
