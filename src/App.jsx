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
  const [currentCommandIndex, setCurrentCommandIndex] = useState(-1)

  const handleAddCommand = (command) => {
    setCommands([...commands, command])
  }

  const handleRemoveCommand = (index) => {
    setCommands(commands.filter((_, i) => i !== index))
  }

  const handleClearCommands = () => {
    setCommands([])
  }

  const executeCommand = async (command, position, commandIndex) => {
    let newX = position.x
    let newY = position.y
    let shouldAnimate = true

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
      case 'jump':
        // Jump 2 steps in the last direction or forward
        if (commandIndex > 0) {
          const lastCmd = commands[commandIndex - 1]
          if (lastCmd.type === 'move-up') newY = Math.max(0, newY - 2)
          else if (lastCmd.type === 'move-down') newY = Math.min(4, newY + 2)
          else if (lastCmd.type === 'move-left') newX = Math.max(0, newX - 2)
          else if (lastCmd.type === 'move-right') newX = Math.min(4, newX + 2)
        }
        break
      case 'catch-demon':
        setScore(prev => prev + 10)
        setCollectedDemons(prev => prev + 1)
        shouldAnimate = false
        break
      case 'cast-spell':
        setScore(prev => prev + 5)
        shouldAnimate = false
        break
      case 'collect-treasure':
        setScore(prev => prev + 20)
        shouldAnimate = false
        break
      case 'open-door':
        setScore(prev => prev + 15)
        shouldAnimate = false
        break
      case 'build-bridge':
        setScore(prev => prev + 25)
        shouldAnimate = false
        break
      case 'teleport':
        newX = 2
        newY = 2
        break
      case 'create-light':
        setScore(prev => prev + 8)
        shouldAnimate = false
        break
      case 'destroy-obstacle':
        setScore(prev => prev + 12)
        shouldAnimate = false
        break
    }

    return { x: newX, y: newY, shouldAnimate }
  }

  const handleRunCode = async () => {
    setIsRunning(true)
    setCurrentCommandIndex(0)
    let newX = characterPosition.x
    let newY = characterPosition.y
    let expandedCommands = []

    // Expand loops and conditionals
    for (let i = 0; i < commands.length; i++) {
      const command = commands[i]

      if (command.type?.startsWith('loop-')) {
        const count = command.params?.count || 2
        // Collect commands inside the loop (next command)
        if (i + 1 < commands.length) {
          for (let j = 0; j < count; j++) {
            expandedCommands.push(commands[i + 1])
          }
          i++ // Skip the next command as it's been expanded
        }
      } else if (command.type?.startsWith('if-')) {
        // For now, always execute the next command (simplified)
        if (i + 1 < commands.length) {
          expandedCommands.push(commands[i + 1])
          i++
        }
      } else {
        expandedCommands.push(command)
      }
    }

    // Execute all expanded commands
    for (let i = 0; i < expandedCommands.length; i++) {
      const command = expandedCommands[i]
      setCurrentCommandIndex(i)
      await new Promise(resolve => setTimeout(resolve, 600))

      const result = await executeCommand(command, { x: newX, y: newY }, i)
      newX = result.x
      newY = result.y

      if (result.shouldAnimate) {
        setCharacterPosition({ x: newX, y: newY })
      }
    }

    setCurrentCommandIndex(-1)
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
                <div
                  key={index}
                  className={`command-item ${currentCommandIndex === index ? 'executing' : ''}`}
                >
                  <span className="command-number">{index + 1}.</span>
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
