import { useState } from 'react'
import './App.css'
import CodeBlocks from './components/CodeBlocks'
import GameWorld from './components/GameWorld'
import Character from './components/Character'
import LevelSystem from './components/LevelSystem'

function App() {
  const [commands, setCommands] = useState([])
  const [isRunning, setIsRunning] = useState(false)
  const [characterPosition, setCharacterPosition] = useState({ x: 0, y: 0 })
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [collectedDemons, setCollectedDemons] = useState(0)

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
    let newX = characterPosition.x
    let newY = characterPosition.y

    for (const command of commands) {
      await new Promise(resolve => setTimeout(resolve, 500))

      switch(command.type) {
        case 'move-up':
          newY = Math.max(0, newY - 1)
          break
        case 'move-down':
          newY = Math.min(4, newY + 1)
          break
        case 'move-left':
          newX = Math.max(0, newX - 1)
          break
        case 'move-right':
          newX = Math.min(4, newX + 1)
          break
        case 'catch-demon':
          // Check if demon is at current position
          setScore(prev => prev + 10)
          setCollectedDemons(prev => prev + 1)
          break
        case 'cast-spell':
          setScore(prev => prev + 5)
          break
      }

      setCharacterPosition({ x: newX, y: newY })
    }

    setIsRunning(false)
  }

  const handleReset = () => {
    setCharacterPosition({ x: 0, y: 0 })
    setCommands([])
    setIsRunning(false)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">🔮 ALYABOTIC 🔮</h1>
        <p className="app-subtitle">İblis Avcısı Kodlama Macerası</p>
        <div className="stats">
          <div className="stat">⭐ Puan: {score}</div>
          <div className="stat">🎯 Seviye: {level}</div>
          <div className="stat">👹 İblis: {collectedDemons}</div>
        </div>
      </header>

      <div className="game-container">
        <div className="left-panel">
          <h2>🎮 Oyun Dünyası</h2>
          <GameWorld
            characterPosition={characterPosition}
            level={level}
          />
          <div className="controls">
            <button
              className="btn btn-run"
              onClick={handleRunCode}
              disabled={isRunning || commands.length === 0}
            >
              ▶️ Kodları Çalıştır
            </button>
            <button
              className="btn btn-reset"
              onClick={handleReset}
              disabled={isRunning}
            >
              🔄 Sıfırla
            </button>
          </div>
        </div>

        <div className="right-panel">
          <h2>🧩 Kod Blokları</h2>
          <CodeBlocks
            onAddCommand={handleAddCommand}
            disabled={isRunning}
          />

          <h2>📜 Komut Listesi</h2>
          <div className="command-list">
            {commands.length === 0 ? (
              <p className="empty-message">Kod blokları ekle!</p>
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
          {commands.length > 0 && (
            <button
              className="btn btn-clear"
              onClick={handleClearCommands}
              disabled={isRunning}
            >
              🗑️ Tümünü Temizle
            </button>
          )}
        </div>
      </div>

      <LevelSystem
        level={level}
        score={score}
        onLevelChange={setLevel}
      />
    </div>
  )
}

export default App
