import { useState, useEffect } from 'react'
import './PatternGame.css'
import { soundManager } from '../../utils/sounds'

const PatternGame = ({ theme, soundEnabled }) => {
  const [pattern, setPattern] = useState([])
  const [options, setOptions] = useState([])
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)

  const shapes = ['🔵', '🔴', '🟢', '🟡', '🟣', '🟠']

  useEffect(() => {
    generatePattern()
  }, [])

  const generatePattern = () => {
    // Create a repeating pattern
    const basePattern = []
    const patternLength = 2 + Math.floor(Math.random() * 2) // 2-3 items

    for (let i = 0; i < patternLength; i++) {
      basePattern.push(shapes[Math.floor(Math.random() * shapes.length)])
    }

    // Repeat pattern and remove last item
    const fullPattern = [...basePattern, ...basePattern, ...basePattern.slice(0, -1)]
    setPattern(fullPattern)

    // Generate options
    const correctAnswer = basePattern[basePattern.length - 1]
    const wrongOptions = shapes.filter(s => s !== correctAnswer)
    const shuffledOptions = [
      correctAnswer,
      ...wrongOptions.sort(() => Math.random() - 0.5).slice(0, 3)
    ].sort(() => Math.random() - 0.5)

    setOptions(shuffledOptions)
    setFeedback(null)
  }

  const handleOptionClick = (option) => {
    const correctAnswer = pattern[pattern.length - 1]
    const fullPattern = [...pattern, option]

    if (option === correctAnswer) {
      setFeedback('correct')
      setScore(prev => prev + 50)
      if (soundEnabled) soundManager.success()

      setTimeout(() => {
        generatePattern()
      }, 1500)
    } else {
      setFeedback('wrong')
      if (soundEnabled) soundManager.destroy()

      setTimeout(() => {
        setFeedback(null)
      }, 1000)
    }
  }

  return (
    <div className="pattern-game">
      <div className="pattern-header">
        <h2 style={{ color: theme.secondaryColor }}>
          🔮 Desen Tamamlama
        </h2>
        <p style={{ color: theme.primaryColor }}>
          Desenin son parçasını bul!
        </p>
        <div className="pattern-score" style={{ borderColor: theme.primaryColor }}>
          ⭐ Puan: {score}
        </div>
      </div>

      <div className="pattern-container">
        <div className="pattern-sequence">
          {pattern.map((shape, index) => (
            <div
              key={index}
              className={`pattern-item ${index === pattern.length - 1 ? 'missing' : ''}`}
              style={{
                borderColor: theme.secondaryColor,
                boxShadow: index === pattern.length - 1 ? `0 0 20px ${theme.primaryColor}` : 'none'
              }}
            >
              {index === pattern.length - 1 ? '❓' : shape}
            </div>
          ))}
        </div>

        <div className="pattern-options">
          <h3 style={{ color: theme.secondaryColor }}>Hangisi gelecek?</h3>
          <div className="options-grid">
            {options.map((option, index) => (
              <div
                key={index}
                className={`option-item ${feedback === 'correct' && option === pattern[pattern.length - 1] ? 'correct' : ''} ${feedback === 'wrong' ? 'shake' : ''}`}
                onClick={() => !feedback && handleOptionClick(option)}
                style={{
                  borderColor: theme.primaryColor,
                  cursor: feedback ? 'not-allowed' : 'pointer',
                  opacity: feedback ? 0.7 : 1
                }}
              >
                {option}
              </div>
            ))}
          </div>
        </div>

        {feedback === 'correct' && (
          <div className="feedback-message success" style={{ color: theme.primaryColor }}>
            🎉 Doğru! Harika!
          </div>
        )}

        {feedback === 'wrong' && (
          <div className="feedback-message error">
            ❌ Tekrar dene!
          </div>
        )}

        <div className="pattern-hint" style={{ color: theme.secondaryColor }}>
          💡 İpucu: Desenin nasıl tekrarlandığına dikkat et
        </div>
      </div>
    </div>
  )
}

export default PatternGame
