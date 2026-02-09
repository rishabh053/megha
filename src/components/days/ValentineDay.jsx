import { useState } from 'react'

function ValentineDay({ onBack }) {
  const [stage, setStage] = useState('envelope') // envelope → timeline → lovejar → final
  const [envelopeOpened, setEnvelopeOpened] = useState(false)
  const [timelineIndex, setTimelineIndex] = useState(0)
  const [collectedNotes, setCollectedNotes] = useState([])
  const [showConfetti, setShowConfetti] = useState(false)

  const timelineMemories = [
    {
      title: 'First Meeting',
      date: 'The Day It All Began',
      emoji: '✨',
      note: 'The moment I first saw you, time stood still. I knew right then that you were someone extraordinary, someone who would change my life forever.',
      imagePlaceholder: true
    },
    {
      title: 'First Date',
      date: 'Our Beautiful Beginning',
      emoji: '💕',
      note: 'Every moment of our first date is etched in my memory. Your laugh, your smile, the way you made me feel - it was perfect. I went home that night knowing I was falling for you.',
      imagePlaceholder: true
    },
    {
      title: 'First Kiss',
      date: 'When Time Stopped',
      emoji: '💋',
      note: 'Our first kiss took my breath away. In that moment, everything felt right in the world. I realized that your lips are my favorite place to be.',
      imagePlaceholder: true
    },
    {
      title: 'First "I Love You"',
      date: 'Three Words, Infinite Meaning',
      emoji: '❤️',
      note: 'Saying "I love you" for the first time was both scary and liberating. But with you, it felt like the most natural thing in the world. Because I do, Megha. I love you so much.',
      imagePlaceholder: true
    },
    {
      title: 'Our Adventures Together',
      date: 'Making Memories',
      emoji: '🌟',
      note: 'From spontaneous trips to quiet nights in, every adventure with you is my favorite. You turn ordinary moments into extraordinary memories.',
      imagePlaceholder: true
    }
  ]

  const loveNotes = [
    'Your smile lights up my entire world ☀️',
    'The way you laugh makes my heart skip beats 💓',
    'Your kindness to everyone inspires me daily 🌸',
    'How you believe in me even when I doubt myself 💪',
    'The way you understand me without words 🤝',
    'Your hugs feel like coming home 🏡',
    'How you make ordinary days extraordinary ✨',
    'Your strength amazes me every single day 💎',
    'The way you care for the people you love 💝',
    'How your eyes sparkle when you\'re excited 🌟',
    'Your intelligence and the way you think 🧠',
    'How you make me want to be a better person 🌱',
    'The comfort I feel just being near you 🤗',
    'Your beautiful soul that shines through 🌈',
    'How you\'re my best friend and my love 👫'
  ]

  const handleEnvelopeClick = () => {
    setEnvelopeOpened(true)
    setTimeout(() => {
      setStage('timeline')
    }, 1000)
  }

  const handleTimelineNext = () => {
    if (timelineIndex < timelineMemories.length - 1) {
      setTimelineIndex(timelineIndex + 1)
    } else {
      setStage('lovejar')
    }
  }

  const handleTimelinePrevious = () => {
    if (timelineIndex > 0) {
      setTimelineIndex(timelineIndex - 1)
    }
  }

  const handlePullNote = () => {
    if (collectedNotes.length < loveNotes.length) {
      // Random note that hasn't been collected
      const availableNotes = loveNotes.filter((_, index) => !collectedNotes.includes(index))
      const randomIndex = Math.floor(Math.random() * availableNotes.length)
      const noteIndex = loveNotes.findIndex((note, i) => note === availableNotes[randomIndex] && !collectedNotes.includes(i))
      
      setCollectedNotes([...collectedNotes, noteIndex])

      if (collectedNotes.length + 1 === loveNotes.length) {
        setTimeout(() => {
          setShowConfetti(true)
          setStage('final')
          localStorage.setItem('day-valentine-completed', 'true')
        }, 1500)
      }
    }
  }

  const Confetti = () => {
    const colors = ['#ff6b9d', '#ffb3d9', '#e5d4ff', '#ffd4c4', '#d4f4dd', '#ffd700']
    const pieces = []
    
    for (let i = 0; i < 100; i++) {
      const style = {
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        animationDuration: `${2 + Math.random() * 2}s`,
      }
      pieces.push(<div key={i} className="confetti" style={style} />)
    }
    
    return <div className="confetti-container">{pieces}</div>
  }

  // Envelope Stage
  if (stage === 'envelope') {
    return (
      <div className="container">
        <div className="card">
          <h1 className="title">Valentine's Day 💕</h1>
          <p className="subtitle">
            Megha, I have something very special for you...
          </p>

          {/* Envelope */}
          <div
            onClick={handleEnvelopeClick}
            style={{
              width: '280px',
              height: '180px',
              margin: '40px auto',
              position: 'relative',
              cursor: 'pointer',
              transform: envelopeOpened ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.5s ease'
            }}
          >
            {/* Envelope body */}
            <div style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #ffe0f0 0%, #ffd4e0 100%)',
              borderRadius: '10px',
              position: 'relative',
              boxShadow: '0 10px 30px rgba(255, 107, 157, 0.3)',
              border: '3px solid #ff99cc'
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '4rem'
              }}>
                💌
              </div>
            </div>

            {/* Envelope flap */}
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '50%',
              background: 'linear-gradient(135deg, #ffb3d9 0%, #ff99cc 100%)',
              clipPath: 'polygon(0 0, 50% 70%, 100% 0)',
              transformOrigin: 'top',
              transform: envelopeOpened ? 'rotateX(180deg)' : 'rotateX(0deg)',
              transition: 'transform 0.8s ease',
              boxShadow: envelopeOpened ? 'none' : '0 5px 15px rgba(255, 107, 157, 0.3)',
              border: '3px solid #ff6b9d',
              borderBottom: 'none'
            }} />

            {/* Seal */}
            {!envelopeOpened && (
              <div style={{
                position: 'absolute',
                top: '23%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '60px',
                height: '60px',
                background: '#ffd700',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                boxShadow: '0 4px 12px rgba(255, 215, 0, 0.4)',
                border: '3px solid #ffed4e',
                zIndex: 10
              }}>
                ❤️
              </div>
            )}
          </div>

          <p style={{ 
            fontSize: '1.15rem', 
            color: '#ff6b9d', 
            fontWeight: '600', 
            marginTop: '20px',
            fontFamily: 'var(--text-font)'
          }}>
            {envelopeOpened ? 'Opening...' : 'Click the envelope to open'}
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

  // Timeline Stage
  if (stage === 'timeline') {
    const currentMemory = timelineMemories[timelineIndex]
    
    return (
      <div className="container">
        <div className="card">
          <h1 className="title">Our Love Story 💕</h1>
          <p className="subtitle">
            Every moment with you is a treasure
          </p>

          {/* Progress indicator */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            margin: '20px 0'
          }}>
            {timelineMemories.map((_, index) => (
              <div
                key={index}
                style={{
                  width: '40px',
                  height: '6px',
                  background: index <= timelineIndex 
                    ? 'linear-gradient(90deg, #ff6b9d, #ff99cc)' 
                    : '#e0e0e0',
                  borderRadius: '3px',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>

          {/* Memory card */}
          <div style={{
            background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
            padding: '25px',
            borderRadius: '20px',
            margin: '25px 0',
            animation: 'slideUp 0.5s ease',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.06)',
            border: '1px solid rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '12px' }}>
              {currentMemory.emoji}
            </div>
            
            <h2 style={{ 
              fontSize: '1.8rem', 
              color: '#5a4a5f', 
              marginBottom: '8px', 
              fontWeight: '500',
              fontFamily: 'var(--subheader-font)'
            }}>
              {currentMemory.title}
            </h2>
            
            <p style={{ 
              fontSize: '1.1rem', 
              color: '#8a7a8f', 
              marginBottom: '15px', 
              fontStyle: 'italic',
              fontFamily: 'var(--text-font)'
            }}>
              {currentMemory.date}
            </p>

            <p style={{ 
              fontSize: '1.2rem', 
              lineHeight: '1.8', 
              color: '#5a4a5f',
              fontFamily: 'var(--text-font)'
            }}>
              {currentMemory.note}
            </p>
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {timelineIndex > 0 && (
              <button className="button-secondary button" onClick={handleTimelinePrevious}>
                ← Previous
              </button>
            )}
            <button className="button" onClick={handleTimelineNext}>
              {timelineIndex < timelineMemories.length - 1 ? 'Next Memory →' : 'Continue to Love Jar 💕'}
            </button>
          </div>

          <button
            className="button-secondary button"
            onClick={onBack}
            style={{ marginTop: '20px' }}
          >
            ← Back to Days
          </button>
        </div>
      </div>
    )
  }

  // Love Jar Stage
  if (stage === 'lovejar') {
    return (
      <div className="container">
        <div className="card">
          <h1 className="title">Why I Love You 💕</h1>
          <p className="subtitle">
            Pull out each note to discover all the reasons...
          </p>

          {/* Jar */}
          <div style={{
            width: '250px',
            height: '320px',
            margin: '30px auto',
            position: 'relative'
          }}>
            {/* Jar lid */}
            <div style={{
              width: '270px',
              height: '30px',
              background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
              borderRadius: '15px 15px 5px 5px',
              position: 'absolute',
              top: '-10px',
              left: '-10px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
              border: '3px solid #654321'
            }} />

            {/* Jar body */}
            <div style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 240, 245, 0.9) 100%)',
              borderRadius: '15px',
              position: 'relative',
              boxShadow: 'inset 0 0 30px rgba(255, 182, 193, 0.3), 0 8px 25px rgba(0, 0, 0, 0.15)',
              border: '4px solid rgba(255, 255, 255, 0.8)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '20px'
            }}>
              {/* Notes in jar */}
              {collectedNotes.length < loveNotes.length && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '8px',
                  marginTop: '10px'
                }}>
                  {Array.from({ length: Math.min(12, loveNotes.length - collectedNotes.length) }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: '50px',
                        height: '40px',
                        background: ['#ffb3d9', '#ffd4c4', '#e5d4ff', '#d4f4dd'][i % 4],
                        borderRadius: '5px',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                        transform: `rotate(${Math.random() * 20 - 10}deg)`
                      }}
                    />
                  ))}
                </div>
              )}

              {collectedNotes.length === loveNotes.length && (
                <div style={{
                  fontSize: '4rem',
                  marginTop: '80px'
                }}>
                  ❤️
                </div>
              )}
            </div>

            {/* Label */}
            <div style={{
              position: 'absolute',
              bottom: '40px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '8px 15px',
              borderRadius: '10px',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: '#5a4a5f',
              border: '2px solid #ff99cc',
              whiteSpace: 'nowrap'
            }}>
              💕 Love Notes 💕
            </div>
          </div>

          {/* Current note display */}
          {collectedNotes.length > 0 && (
            <div style={{
              background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
              padding: '20px',
              borderRadius: '15px',
              margin: '20px 0',
              animation: 'slideUp 0.5s ease',
              minHeight: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(0, 0, 0, 0.05)'
            }}>
              <p style={{ 
                fontSize: '1.2rem', 
                color: '#5a4a5f', 
                fontWeight: '500', 
                textAlign: 'center',
                fontFamily: 'var(--text-font)'
              }}>
                {loveNotes[collectedNotes[collectedNotes.length - 1]]}
              </p>
            </div>
          )}

          {/* Pull note button */}
          <button
            className="button"
            onClick={handlePullNote}
            disabled={collectedNotes.length === loveNotes.length}
            style={{
              marginTop: '15px',
              opacity: collectedNotes.length === loveNotes.length ? 0.6 : 1
            }}
          >
            {collectedNotes.length === loveNotes.length 
              ? 'All Notes Collected! 💕' 
              : `Pull a Note (${collectedNotes.length}/${loveNotes.length})`}
          </button>

          {collectedNotes.length === loveNotes.length && (
            <p style={{ 
              fontSize: '1.1rem', 
              color: '#ff6b9d', 
              marginTop: '15px', 
              fontStyle: 'italic',
              fontFamily: 'var(--text-font)'
            }}>
              Opening final surprise... 🎉
            </p>
          )}

          <button
            className="button-secondary button"
            onClick={onBack}
            style={{ marginTop: '20px' }}
          >
            ← Back to Days
          </button>
        </div>
      </div>
    )
  }

  // Final Message
  return (
    <div className="container">
      {showConfetti && <Confetti />}
      <div className="card">
        <span className="emoji">❤️</span>
        <h1 className="title">Forever & Always</h1>
        <div className="message">
          My Dearest Megha,
          <br /><br />
          If you're reading this, you've journeyed through our love story, 
          discovered all the reasons why I love you, and hopefully felt even a fraction 
          of the love I feel for you every single day.
          <br /><br />
          This Valentine's Day marks another beautiful chapter in our story. 
          You are my heart, my soul, my everything. Every day with you feels like Valentine's Day 
          because you fill my life with so much love, joy, and happiness.
          <br /><br />
          Thank you for being my partner, my best friend, and my greatest adventure. 
          Thank you for your patience, your kindness, your laughter, and your love.
          <br /><br />
          I promise to love you fiercely, support you endlessly, and cherish you always. 
          I promise to be your safe place, your biggest cheerleader, and your partner in all of life's adventures.
          <br /><br />
          Here's to us, to our love, and to forever together. 
          I love you more than words could ever express, more than any website could show, 
          and more than you'll ever know. ❤️
          <br /><br />
          <strong style={{ fontSize: '1.4rem' }}>Happy Valentine's Day, my beautiful Megha! 🌹💕</strong>
          <br /><br />
          Forever and always yours,
          <br />
          Rishabh 💖
        </div>
        <button className="button" onClick={onBack} style={{ marginTop: '20px' }}>
          Back to Days
        </button>
      </div>
    </div>
  )
}

export default ValentineDay
