import { useState, useEffect } from 'react'
import './MazeGame.css'
import { soundManager } from '../../utils/sounds'
import CodeBlocks from '../CodeBlocks'

const MazeGame = ({ theme, soundEnabled, onScoreUpdate }) => {
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 })
  const [goalPos] = useState({ x: 4, y: 4 })
  const [commands, setCommands] = useState([])
  const [isRunning, setIsRunning] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  // Simple maze - 0 = path, 1 = wall
  const [maze] = useState([
    [0, 0, 1, 0, 0],
    [1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0]
  ])

  const handleAddCommand = (command) => {
    setCommands([...commands, command])
  }

  const handleRemoveCommand = (index) => {
    setCommands(commands.filter((_, i) => i !== index))
  }

  const handleClearCommands = () => {
    setCommands([])
  }

  const handleRunCode = async () => {
    setIsRunning(true)
    let x = playerPos.x
    let y = playerPos.y

    for (let command of commands) {
      await new Promise(resolve => setTimeout(resolve, 500))

      let newX = x
      let newY = y

      switch (command.type) {
        case 'move-up':
          newY = Math.max(0, y - 1)
          break
        case 'move-down':
          newY = Math.min(4, y + 1)
          break
        case 'move-left':
          newX = Math.max(0, x - 1)
          break
        case 'move-right':
          newX = Math.min(4, x + 1)
          break
      }

      // Check if hitting wall
      if (maze[newY][newX] === 1) {
        if (soundEnabled) soundManager.destroy()
        break
      }

      x = newX
      y = newY
      setPlayerPos({ x, y })
      if (soundEnabled) soundManager.move()

      // Check if reached goal
      if (x === goalPos.x && y === goalPos.y) {
        setIsComplete(true)
        if (onScoreUpdate) onScoreUpdate(200)
        if (soundEnabled) soundManager.levelUp()
        break
      }
    }

    setIsRunning(false)
  }

  const handleReset = () => {
    setPlayerPos({ x: 0, y: 0 })
    setCommands([])
    setIsComplete(false)
  }

  return (
    <div className="maze-game">
      <div className="maze-header">
        <h2 style={{ color: theme.secondaryColor }}>🌌 Labirent Oyunu</h2>
        <p style={{ color: theme.primaryColor }}>Hedefe ulaş!</p>
      </div>

      <div className="maze-container">
        <div className="maze-grid">
          {maze.map((row, y) => (
            <div key={y} className="maze-row">
              {row.map((cell, x) => (
                <div
                  key={`${x}-${y}`}
                  className={`maze-cell ${cell === 1 ? 'wall' : 'path'} ${
                    playerPos.x === x && playerPos.y === y ? 'player' : ''
                  } ${goalPos.x === x && goalPos.y === y ? 'goal' : ''}`}
                  style={{
                    borderColor: theme.secondaryColor,
                    background: cell === 1
                      ? `linear-gradient(135deg, #6B7280 0%, #374151 100%)`
                      : playerPos.x === x && playerPos.y === y
                      ? `linear-gradient(135deg, ${theme.primaryColor} 0%, ${theme.secondaryColor} 100%)`
                      : goalPos.x === x && goalPos.y === y
                      ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                      : 'rgba(255, 255, 255, 0.05)'
                  }}
                >
                  {playerPos.x === x && playerPos.y === y && theme.character}
                  {goalPos.x === x && goalPos.y === y && '🎯'}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="maze-controls">
          <CodeBlocks
            onAddCommand={handleAddCommand}
            disabled={isRunning}
            theme={theme}
          />

          <div className="command-list">
            <h3>Komutlar:</h3>
            {commands.length === 0 ? (
              <p className="empty-message">Komut ekle!</p>
            ) : (
              commands.map((cmd, index) => (
                <div key={index} className="command-item">
                  <span>{cmd.label}</span>
                  <button
                    onClick={() => handleRemoveCommand(index)}
                    disabled={isRunning}
                    className="btn-remove"
                  >
                    ❌
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="maze-buttons">
            <button
              className="btn btn-run"
              onClick={handleRunCode}
              disabled={isRunning || commands.length === 0}
              style={{
                background: `linear-gradient(135deg, #10B981 0%, #059669 100%)`
              }}
            >
              ▶️ Çalıştır
            </button>
            <button
              className="btn btn-reset"
              onClick={handleReset}
              disabled={isRunning}
              style={{
                background: `linear-gradient(135deg, ${theme.primaryColor} 0%, ${theme.secondaryColor} 100%)`
              }}
            >
              🔄 Sıfırla
            </button>
            {commands.length > 0 && (
              <button
                className="btn btn-clear"
                onClick={handleClearCommands}
                disabled={isRunning}
                style={{
                  background: `linear-gradient(135deg, #EF4444 0%, #DC2626 100%)`
                }}
              >
                🗑️ Temizle
              </button>
            )}
          </div>

          {isComplete && (
            <div className="maze-complete" style={{ color: theme.primaryColor }}>
              🎉 Tebrikler! Hedefe ulaştın!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MazeGame
