import { useEffect, useState } from 'react'
import './LevelUpCelebration.css'

const LevelUpCelebration = ({ level, onClose, theme }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
    const timer = setTimeout(() => {
      setShow(false)
      setTimeout(onClose, 500)
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  // Generate confetti particles
  const confetti = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 1,
    rotation: Math.random() * 360
  }))

  return (
    <div className={`level-up-overlay ${show ? 'show' : ''}`}>
      <div className="confetti-container">
        {confetti.map(particle => (
          <div
            key={particle.id}
            className="confetti"
            style={{
              left: `${particle.left}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              transform: `rotate(${particle.rotation}deg)`,
              background: `hsl(${Math.random() * 360}, 70%, 60%)`
            }}
          />
        ))}
      </div>

      <div className="celebration-content">
        <div className="level-badge" style={{
          borderColor: theme.primaryColor,
          boxShadow: `0 0 40px ${theme.primaryColor}`
        }}>
          <div className="star-burst">⭐</div>
          <div className="level-number" style={{ color: theme.primaryColor }}>
            {level}
          </div>
        </div>

        <h1 className="celebration-title" style={{
          color: theme.primaryColor,
          textShadow: `0 0 20px ${theme.primaryColor}`
        }}>
          🎉 TEBRİKLER! 🎉
        </h1>

        <p className="celebration-message">
          Seviye <span style={{ color: theme.secondaryColor }}>{level}</span>'e yükseldin!
        </p>

        <div className="achievement-stars">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className="achievement-star"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              ⭐
            </span>
          ))}
        </div>

        <div className="celebration-character" style={{
          filter: `drop-shadow(0 0 20px ${theme.primaryColor})`
        }}>
          {theme.character}
        </div>
      </div>
    </div>
  )
}

export default LevelUpCelebration
