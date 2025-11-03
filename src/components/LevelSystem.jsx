import { useEffect } from 'react'
import './LevelSystem.css'

const LevelSystem = ({ level, score, onLevelChange, onLevelUp }) => {
  useEffect(() => {
    // Level up every 50 points
    const newLevel = Math.floor(score / 50) + 1
    if (newLevel > level) {
      onLevelChange(newLevel)
      // Trigger celebration animation
      if (onLevelUp) {
        onLevelUp(newLevel)
      }
    }
  }, [score, level, onLevelChange, onLevelUp])

  const nextLevelScore = level * 50
  const progress = (score % 50) / 50 * 100

  return (
    <div className="level-system">
      <div className="level-info">
        <h3>Seviye İlerlemesi</h3>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p>Bir sonraki seviyeye: {nextLevelScore - score} puan kaldı</p>
      </div>
    </div>
  )
}

export default LevelSystem
