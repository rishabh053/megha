import { useState, useEffect } from 'react'
import './ValentineDay.css'

function ValentineDay({ onBack }) {
  const [stage, setStage] = useState('envelope') // envelope → slideshow → lovejar → final
  const [envelopeOpened, setEnvelopeOpened] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [collectedNotes, setCollectedNotes] = useState([])
  const [showConfetti, setShowConfetti] = useState(false)
  const [loadedImages, setLoadedImages] = useState({})

  // ============================================
  // EDIT YOUR IMAGE CAPTIONS HERE
  // ============================================
  const slideshowImages = [
    {
      src: 'public/images/1.jpg',
      caption: 'Do you remember our first trip to Nandi Hills? ✨',
      title: 'Nandi Hills'
    },
    {
      src: 'public/images/2.jpg',
      caption: 'Our first trip together to Munnar 💕',
      title: 'Our First Trip Together'
    },
    {
      src: 'public/images/3.jpg',
      caption: 'This photo feels like we did pre-wedding shoot before we actually did it',
      title: 'Pre-wedding Shoot'
    },
    {
      src: 'public/images/4.jpg',
      caption: 'When I said "I love you" and meant it with all my heart ❤️',
      title: 'Munnar Trip'
    },
    {
      src: 'public/images/5.jpeg',
      caption: 'Adventures together that made beautiful memories 🌟',
      title: 'Gokarna Trip'
    },
    {
      src: 'public/images/6.jpeg',
      caption: 'Do you remember our date at Oia? 🌅',
      title: 'Oia'
    },
    {
      src: 'public/images/7.jpeg',
      caption: 'Quiet moments that spoke volumes about our love 🌙',
      title: 'Peaceful Moments'
    },
    {
      src: 'public/images/8.jpeg',
      caption: 'Celebrating your birthday with all my love 🎉',
      title: 'Happy Birthday'
    },
    {
      src: 'public/images/9.jpeg',
      caption: 'Supporting each other through thick and thin 💪',
      title: 'Together Strong'
    },
    {
      src: 'public/images/10.jpeg',
      caption: 'Looking forward to forever with you 💖',
      title: 'Our Future'
    }
  ]
  // ============================================

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

  // Preload all images when entering slideshow stage
  useEffect(() => {
    if (stage === 'slideshow') {
      slideshowImages.forEach((slide, index) => {
        const img = new Image()
        img.onload = () => {
          setLoadedImages(prev => ({ ...prev, [index]: true }))
        }
        img.onerror = () => {
          setLoadedImages(prev => ({ ...prev, [index]: true }))
        }
        img.src = slide.src
      })
    }
  }, [stage])

  // Auto-advance slideshow
  useEffect(() => {
    if (stage === 'slideshow' && isAutoPlaying) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slideshowImages.length)
      }, 4000) // Change slide every 4 seconds
      return () => clearInterval(timer)
    }
  }, [stage, isAutoPlaying, slideshowImages.length])

  const handleEnvelopeClick = () => {
    setEnvelopeOpened(true)
    setTimeout(() => {
      setStage('slideshow')
    }, 1000)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideshowImages.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length)
    setIsAutoPlaying(false)
  }

  const handlePullNote = () => {
    if (collectedNotes.length < loveNotes.length) {
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
      <div className="container liquid-glass-bg">
        <div className="card liquid-glass">
          <h1 className="title">Valentine's Day 💕</h1>
          <p className="subtitle">
            Megha, I have something very special for you...
          </p>

          {/* Envelope */}
          <div
            onClick={handleEnvelopeClick}
            className="envelope-wrapper"
            style={{
              width: '320px',
              height: '220px',
              margin: '40px auto',
              position: 'relative',
              cursor: 'pointer',
              perspective: '1000px'
            }}
          >
            {/* Envelope body */}
            <div className={`envelope-body ${envelopeOpened ? 'opened' : ''}`} style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, rgba(255, 224, 240, 0.8) 0%, rgba(255, 212, 224, 0.8) 100%)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px',
              position: 'relative',
              boxShadow: '0 15px 40px rgba(255, 107, 157, 0.4)',
              border: '2px solid rgba(255, 255, 255, 0.6)',
              transition: 'all 0.3s ease',
              transform: envelopeOpened ? 'scale(0.95)' : 'scale(1)',
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '5rem',
                animation: envelopeOpened ? 'none' : 'envelopeBounce 2s ease-in-out infinite'
              }}>
                💌
              </div>
            </div>

            {/* Envelope flap */}
            <div className={`envelope-flap ${envelopeOpened ? 'opened' : ''}`} style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '55%',
              background: 'linear-gradient(135deg, rgba(255, 179, 217, 0.9) 0%, rgba(255, 153, 204, 0.9) 100%)',
              backdropFilter: 'blur(10px)',
              clipPath: 'polygon(0 0, 50% 75%, 100% 0)',
              transformOrigin: 'top center',
              transform: envelopeOpened ? 'rotateX(180deg) translateZ(10px)' : 'rotateX(0deg)',
              transition: 'transform 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
              boxShadow: envelopeOpened ? 'none' : '0 8px 20px rgba(255, 107, 157, 0.4)',
              border: '2px solid rgba(255, 255, 255, 0.6)',
              borderBottom: 'none'
            }} />

            {/* Seal */}
            {!envelopeOpened && (
              <div className="envelope-seal" style={{
                position: 'absolute',
                top: '26%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '70px',
                height: '70px',
                background: 'linear-gradient(135deg, rgba(255, 215, 0, 1) 0%, rgba(255, 200, 0, 0.9) 100%)',
                backdropFilter: 'blur(5px)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.2rem',
                boxShadow: '0 6px 16px rgba(255, 215, 0, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.4)',
                border: '2px solid rgba(255, 255, 255, 0.7)',
                zIndex: 10,
                animation: 'sealPulse 2s ease-in-out infinite'
              }}>
                ❤️
              </div>
            )}

            {/* Inner letter glow */}
            {envelopeOpened && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '200px',
                height: '150px',
                background: 'radial-gradient(circle, rgba(255, 107, 157, 0.3) 0%, transparent 70%)',
                borderRadius: '50%',
                animation: 'letterGlow 1s ease-out'
              }} />
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
            className="button-secondary button liquid-glass-button"
            onClick={onBack}
            style={{ marginTop: '30px' }}
          >
            ← Back
          </button>
        </div>
      </div>
    )
  }

  // Slideshow Stage
  if (stage === 'slideshow') {
    return (
      <div className="container liquid-glass-bg">
        <div className="card liquid-glass slideshow-card">
          <h1 className="title">Our Love Story 💖</h1>
          <p className="subtitle">
            A beautiful journey through our memories together
          </p>

          {/* Main Slideshow Container */}
          <div className="slideshow-container">
            {/* Main Image Display */}
            <div className="slideshow-main">
              <div className="slide-wrapper">
                <div 
                  className="slide-image-container"
                  style={{
                    backgroundImage: `url(${slideshowImages[currentSlide].src})`,
                    animation: `slideInFade 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)`
                  }}
                >
                  {/* Glass overlay with gradient */}
                  <div className="slide-glass-overlay"></div>
                  
                  {/* Loading indicator while image loads */}
                  {!loadedImages[currentSlide] && (
                    <div className="image-loading">
                      <div className="loading-spinner"></div>
                      <p>Loading...</p>
                    </div>
                  )}
                </div>

                {/* Navigation Arrows */}
                <button className="slide-nav prev" onClick={prevSlide}>
                  ❮
                </button>
                <button className="slide-nav next" onClick={nextSlide}>
                  ❯
                </button>
              </div>

              {/* Caption Area with Liquid Glass */}
              <div className="slide-caption-container liquid-glass" style={{
                animation: `captionSlideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)`
              }}>
                <h3 className="slide-title">{slideshowImages[currentSlide].title}</h3>
                <p className="slide-caption">{slideshowImages[currentSlide].caption}</p>
              </div>
            </div>
          </div>

          <button 
            className="button liquid-glass-button continue-btn" 
            onClick={() => setStage('lovejar')}
            style={{ marginTop: '30px', position: 'relative', zIndex: 20 }}
          >
            Continue to Love Jar 💕
          </button>

          <button
            className="button-secondary button liquid-glass-button"
            onClick={onBack}
            style={{ marginTop: '15px' }}
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
      <div className="container liquid-glass-bg">
        <div className="card liquid-glass">
          <h1 className="title">Why I Love You 💕</h1>
          <p className="subtitle">
            Pull out each note to discover all the reasons...
          </p>

          {/* Jar Container with 3D perspective */}
          <div className="jar-container" style={{
            width: '300px',
            height: '420px',
            margin: '40px auto',
            position: 'relative',
            perspective: '1200px'
          }}>
            {/* Jar lid - metallic cap */}
            <div className="jar-lid" style={{
              width: '220px',
              height: '40px',
              background: 'linear-gradient(180deg, rgba(200, 120, 50, 1) 0%, rgba(160, 90, 30, 1) 50%, rgba(140, 70, 20, 1) 100%)',
              backdropFilter: 'blur(10px)',
              borderRadius: '50% 50% 40% 40%',
              position: 'absolute',
              top: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4), inset 0 2px 6px rgba(255, 255, 255, 0.3), inset 0 -2px 6px rgba(0, 0, 0, 0.3)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              zIndex: 10
            }} />

            {/* Jar neck - connecting piece */}
            <div style={{
              width: '160px',
              height: '25px',
              background: 'linear-gradient(180deg, rgba(200, 200, 200, 0.3) 0%, rgba(220, 220, 220, 0.2) 100%)',
              position: 'absolute',
              top: '15px',
              left: '50%',
              transform: 'translateX(-50%)',
              borderRadius: '0 0 30px 30px',
              boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.1)',
              zIndex: 9
            }} />

            {/* Main jar body - glass container */}
            <div className="jar-body" style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, rgba(255, 250, 250, 0.65) 0%, rgba(255, 240, 245, 0.65) 50%, rgba(255, 230, 240, 0.65) 100%)',
              backdropFilter: 'blur(25px)',
              borderRadius: '40px 40px 80px 80px',
              position: 'relative',
              boxShadow: 'inset 0 0 60px rgba(255, 182, 193, 0.5), inset -20px 0 40px rgba(255, 200, 220, 0.3), 0 20px 60px rgba(0, 0, 0, 0.25)',
              border: '4px solid rgba(255, 255, 255, 0.7)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              padding: '50px 25px 40px 25px'
            }}>
              {/* Notes floating in jar */}
              {collectedNotes.length < loveNotes.length && (
                <div className="jar-notes" style={{
                  position: 'absolute',
                  width: '90%',
                  height: '85%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignContent: 'flex-end',
                  justifyContent: 'center',
                  gap: '10px',
                  padding: '20px',
                  overflow: 'hidden'
                }}>
                  {Array.from({ length: Math.min(12, loveNotes.length - collectedNotes.length) }).map((_, i) => {
                    const rotation = Math.random() * 30 - 15
                    return (
                      <div
                        key={i}
                        className="note-item"
                        style={{
                          width: '50px',
                          height: '40px',
                          background: ['linear-gradient(135deg, rgba(255, 179, 217, 1) 0%, rgba(255, 153, 204, 0.95) 100%)', 
                                       'linear-gradient(135deg, rgba(255, 212, 196, 1) 0%, rgba(255, 182, 166, 0.95) 100%)', 
                                       'linear-gradient(135deg, rgba(229, 212, 255, 1) 0%, rgba(209, 192, 235, 0.95) 100%)', 
                                       'linear-gradient(135deg, rgba(212, 244, 221, 1) 0%, rgba(192, 224, 201, 0.95) 100%)'][i % 4],
                          backdropFilter: 'blur(8px)',
                          borderRadius: '6px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.5)',
                          border: '1.5px solid rgba(255, 255, 255, 0.7)',
                          animation: `floatNote ${4 + i * 0.15}s ease-in-out infinite`,
                          animationDelay: `${i * 0.12}s`,
                          '--rotation': `${rotation}deg`
                        }}
                      />
                    )
                  })}
                </div>
              )}

              {collectedNotes.length === loveNotes.length && (
                <div style={{
                  fontSize: '6rem',
                  animation: 'heartBeat 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite',
                  filter: 'drop-shadow(0 4px 12px rgba(255, 107, 157, 0.4))'
                }}>
                  ❤️
                </div>
              )}
            </div>

            {/* Jar left side shine - creates glass effect */}
            <div style={{
              position: 'absolute',
              top: '40px',
              left: '20px',
              width: '70px',
              height: '120px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none',
              zIndex: 2,
              filter: 'blur(8px)'
            }} />

            {/* Jar right side shadow - creates depth */}
            <div style={{
              position: 'absolute',
              top: '60px',
              right: '10px',
              width: '50px',
              height: '100px',
              background: 'linear-gradient(225deg, transparent 0%, rgba(0, 0, 0, 0.15) 100%)',
              borderRadius: '50%',
              pointerEvents: 'none',
              zIndex: 1,
              filter: 'blur(10px)'
            }} />

            {/* Bottom highlight for jar base */}
            <div style={{
              position: 'absolute',
              bottom: '15px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '85%',
              height: '30px',
              background: 'linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.3) 100%)',
              borderRadius: '50%',
              pointerEvents: 'none',
              zIndex: 2
            }} />

            {/* Label */}
            <div className="liquid-glass jar-label" style={{
              position: 'absolute',
              bottom: '25px',
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '12px 24px',
              borderRadius: '15px',
              fontSize: '1rem',
              fontWeight: '700',
              color: '#5a4a5f',
              border: '2px solid rgba(255, 153, 204, 0.6)',
              whiteSpace: 'nowrap',
              zIndex: 8,
              boxShadow: '0 4px 15px rgba(255, 107, 157, 0.2)'
            }}>
              💕 Love Notes 💕
            </div>
          </div>

          {/* Current note display */}
          {collectedNotes.length > 0 && (
            <div className="liquid-glass" style={{
              padding: '20px',
              borderRadius: '15px',
              margin: '20px 0',
              animation: 'slideUp 0.5s ease',
              minHeight: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255, 255, 255, 0.3)'
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
            className="button liquid-glass-button"
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
            className="button-secondary button liquid-glass-button"
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
    <div className="container liquid-glass-bg">
      {showConfetti && <Confetti />}
      <div className="card liquid-glass">
        <span className="emoji">❤️</span>
        <h1 className="title">Forever & Always</h1>
        <div className="message liquid-glass">
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
        <button className="button liquid-glass-button" onClick={onBack} style={{ marginTop: '20px' }}>
          Back to Days
        </button>
      </div>
    </div>
  )
}

export default ValentineDay
