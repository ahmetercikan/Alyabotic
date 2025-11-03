import { useState } from 'react'
import './App.css'
import CodeBlocks from './components/CodeBlocks'
import GameWorld from './components/GameWorld'
import Character from './components/Character'
import LevelSystem from './components/LevelSystem'
import ThemeSelector from './components/ThemeSelector'
import { themes } from './themes/themeConfig'

function App() {
  const [selectedTheme, setSelectedTheme] = useState(null)
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

  const handleThemeSelect = (themeId) => {
    setSelectedTheme(themeId)
    setCommands([])
    setCharacterPosition({ x: 0, y: 0 })
    setScore(0)
    setLevel(1)
    setCollectedDemons(0)
  }

  const handleChangeTheme = () => {
    setSelectedTheme(null)
    setCommands([])
    setCharacterPosition({ x: 0, y: 0 })
    setScore(0)
    setLevel(1)
    setCollectedDemons(0)
  }

  const executeCommand = async (command, position, commandIndex) => {
    let newX = position.x
    let newY = position.y
    let shouldAnimate = true
    const theme = themes[selectedTheme]

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
      case 'warp-jump':
      case 'submarine':
      case 'tree-climb':
      case 'factory-reset':
        // Jump/teleport 2 steps
        if (commandIndex > 0) {
          const lastCmd = commands[commandIndex - 1]
          if (lastCmd.type === 'move-up') newY = Math.max(0, newY - 2)
          else if (lastCmd.type === 'move-down') newY = Math.min(4, newY + 2)
          else if (lastCmd.type === 'move-left') newX = Math.max(0, newX - 2)
          else if (lastCmd.type === 'move-right') newX = Math.min(4, newX + 2)
        }
        break
      case 'teleport':
        newX = 2
        newY = 2
        break
      default:
        // Handle all theme-specific actions dynamically
        const action = [...theme.actions, ...theme.special].find(a => a.type === command.type)
        if (action) {
          setScore(prev => prev + action.points)
          if (action.points > 0) {
            setCollectedDemons(prev => prev + 1)
          }
          shouldAnimate = false
        }
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

  if (!selectedTheme) {
    return <ThemeSelector onSelectTheme={handleThemeSelect} />
  }

  const currentTheme = themes[selectedTheme]

  return (
    <div className="app" style={{ background: currentTheme.background }}>
      <header className="app-header" style={{ borderColor: currentTheme.primaryColor }}>
        <h1 className="app-title">🎮 ALYABOTIC 🎮</h1>
        <p className="app-subtitle">{currentTheme.name}</p>
        <div className="stats">
          <div className="stat" style={{ borderColor: currentTheme.secondaryColor }}>
            ⭐ Puan: {score}
          </div>
          <div className="stat" style={{ borderColor: currentTheme.secondaryColor }}>
            🎯 Seviye: {level}
          </div>
          <div className="stat" style={{ borderColor: currentTheme.secondaryColor }}>
            {currentTheme.character} Toplanan: {collectedDemons}
          </div>
          <button
            className="theme-change-btn"
            onClick={handleChangeTheme}
            style={{
              background: `linear-gradient(135deg, ${currentTheme.primaryColor} 0%, ${currentTheme.secondaryColor} 100%)`
            }}
          >
            🔄 Tema Değiştir
          </button>
        </div>
      </header>

      <div className="game-container">
        <div className="left-panel" style={{ borderColor: currentTheme.primaryColor }}>
          <h2 style={{ color: currentTheme.secondaryColor }}>🎮 Oyun Dünyası</h2>
          <GameWorld
            characterPosition={characterPosition}
            level={level}
            theme={currentTheme}
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

        <div className="right-panel" style={{ borderColor: currentTheme.primaryColor }}>
          <h2 style={{ color: currentTheme.secondaryColor }}>🧩 Kod Blokları</h2>
          <CodeBlocks
            onAddCommand={handleAddCommand}
            disabled={isRunning}
            theme={currentTheme}
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
