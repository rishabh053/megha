import { useState } from 'react'
import { LockIcon } from './AnimatedIcons'

function LockScreen({ onUnlock }) {
  const [step, setStep] = useState(1) // 1 = name question, 2 = PIN
  const [answer, setAnswer] = useState('')
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')

  const handleNameSubmit = (e) => {
    e.preventDefault()
    const correctAnswer = 'megha'
    
    if (answer.toLowerCase().trim() === correctAnswer) {
      setStep(2)
      setError('')
      setAnswer('')
    } else {
      setError('Wrong answer! Think about who this is for 💕')
      setAnswer('')
    }
  }

  const handlePinSubmit = (e) => {
    e.preventDefault()
    const correctPin = '248622'
    
    if (pin.trim() === correctPin) {
      onUnlock()
    } else {
      setError('Wrong PIN! Try again 💕')
      setPin('')
    }
  }

  if (step === 2) {
    return (
      <div className="container">
        <div className="card">
          <LockIcon />
          <h1 className="title">Almost There!</h1>
          <p className="subtitle">
            Enter the special PIN to unlock your Valentine Week surprises.
          </p>
          
          <form onSubmit={handlePinSubmit}>
            <p style={{ fontSize: '1.5rem', marginBottom: '20px', fontWeight: '400' }}>
              Enter the PIN 🔢
            </p>
            
            <input
              type="text"
              className="input"
              placeholder="Enter 6-digit PIN..."
              value={pin}
              onChange={(e) => {
                setPin(e.target.value)
                setError('')
              }}
              maxLength={6}
              autoFocus
              style={{ letterSpacing: '12px', textAlign: 'center', fontSize: '2rem' }}
            />
            
            {error && (
              <p style={{ color: '#ff6b9d', marginTop: '15px', fontSize: '1.3rem' }}>
                {error}
              </p>
            )}
            
            <button type="submit" className="button" style={{ marginTop: '25px' }}>
              Unlock 💖
            </button>
          </form>
          
          <p style={{ marginTop: '25px', fontSize: '1.2rem', color: '#8a7a8f' }}>
            Hint: It's a special number just between us 😉
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="card">
        <LockIcon />
        <h1 className="title">Welcome, Beautiful</h1>
        <p className="subtitle">
          This site is locked just for you. Answer this simple question to unlock your surprise.
        </p>
        
        <form onSubmit={handleNameSubmit}>
          <p style={{ fontSize: '1.5rem', marginBottom: '20px', fontWeight: '400' }}>
            What's the name of the most amazing girl in the world?
          </p>
          
          <input
            type="text"
            className="input"
            placeholder="Type your answer..."
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value)
              setError('')
            }}
            autoFocus
          />
          
          {error && (
            <p style={{ color: '#ff6b9d', marginTop: '15px', fontSize: '1.3rem' }}>
              {error}
            </p>
          )}
          
          <button type="submit" className="button" style={{ marginTop: '25px' }}>
            Continue 💖
          </button>
        </form>
        
        <p style={{ marginTop: '25px', fontSize: '1.2rem', color: '#8a7a8f' }}>
          Hint: It starts with 'M' and rhymes with 'mega' 😉
        </p>
      </div>
    </div>
  )
}

export default LockScreen
