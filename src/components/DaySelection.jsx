import { useState, useEffect } from 'react'
import { HeartIcon } from './AnimatedIcons'

function DaySelection({ onSelectDay }) {
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    // Update current date every minute
    const interval = setInterval(() => {
      setCurrentDate(new Date())
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  const days = [
    { id: 'rose', name: 'Rose Day', emoji: '🌹', date: '2026-02-07', month: 1, day: 7 },
    { id: 'propose', name: 'Propose Day', emoji: '💍', date: '2026-02-08', month: 1, day: 8 },
    { id: 'chocolate', name: 'Chocolate Day', emoji: '🍫', date: '2026-02-09', month: 1, day: 9 },
    { id: 'teddy', name: 'Teddy Day', emoji: '🧸', date: '2026-02-10', month: 1, day: 10 },
    { id: 'hug', name: 'Hug Day', emoji: '🤗', date: '2026-02-11', month: 1, day: 11 },
    { id: 'kiss', name: 'Kiss Day', emoji: '💋', date: '2026-02-12', month: 1, day: 12 },
    { id: 'valentine', name: "Valentine's Day", emoji: '❤️', date: '2026-02-14', month: 1, day: 14 },
  ]

  const isDayUnlocked = (day) => {
    const dayDate = new Date(2026, day.month, day.day)
    return currentDate >= dayDate
     // return true
  }

  const isDayCompleted = (day) => {
    return localStorage.getItem(`day-${day.id}-completed`) === 'true'
  }

  const handleDayClick = (day) => {
    if (isDayUnlocked(day)) {
      onSelectDay(day.id)
    }
  }

  return (
    <div className="container">
      <div className="card">
        <HeartIcon />
        <h1 className="title">Valentine Week for Megha</h1>
        <p className="subtitle">
          A week full of love, surprises, and smiles. Each day unlocks something special just for you.
        </p>
        <p style={{ fontSize: '1.4rem', color: '#8a7a8f', marginBottom: '15px' }}>
          - With all my love, Rishabh
        </p>

        <div className="day-grid">
          {days.map((day) => {
            const unlocked = isDayUnlocked(day)
            const completed = isDayCompleted(day)
            
            return (
              <div
                key={day.id}
                className={`day-card ${!unlocked ? 'locked' : ''} ${completed ? 'completed' : ''}`}
                onClick={() => handleDayClick(day)}
              >
                <div className="day-title">
                  <span>{day.emoji} {day.name}</span>
                  {completed && <span>✓</span>}
                  {!unlocked && <span>🔒</span>}
                </div>
                <div className="day-date">February {day.day}, 2026</div>
                {!unlocked && (
                  <div className="lock-message">
                    Not yet, come back on this special day 💖
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default DaySelection
