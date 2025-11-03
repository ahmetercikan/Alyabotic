import { useState } from 'react'
import './App.css'
import CodeBlocks from './components/CodeBlocks'
import GameWorld from './components/GameWorld'
import Character from './components/Character'
import LevelSystem from './components/LevelSystem'
import ThemeSelector from './components/ThemeSelector'
import ActivitySelector from './components/ActivitySelector'
import LevelUpCelebration from './components/LevelUpCelebration'
import { themes } from './themes/themeConfig'
import { soundManager } from './utils/sounds'
import { getThemeActivities, activityTypes } from './activities/activityConfig'

// Activity components
import SortingGame from './components/activities/SortingGame'
import PatternGame from './components/activities/PatternGame'
import MazeGame from './components/activities/MazeGame'

function App() {
  const [selectedTheme, setSelectedTheme] = useState(null)
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [commands, setCommands] = useState([])
  const [isRunning, setIsRunning] = useState(false)
  const [characterPosition, setCharacterPosition] = useState({ x: 0, y: 0 })
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [collectedDemons, setCollectedDemons] = useState(0)
  const [currentCommandIndex, setCurrentCommandIndex] = useState(-1)
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [collectedObjects, setCollectedObjects] = useState([])

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
    setSelectedActivity(null)
    setCommands([])
    setCharacterPosition({ x: 0, y: 0 })
    setScore(0)
    setLevel(1)
    setCollectedDemons(0)
  }

  const handleActivitySelect = (activity) => {
    setSelectedActivity(activity)
    setCommands([])
    setCharacterPosition({ x: 0, y: 0 })
  }

  const handleChangeTheme = () => {
    setSelectedTheme(null)
    setSelectedActivity(null)
    setCommands([])
    setCharacterPosition({ x: 0, y: 0 })
    setScore(0)
    setLevel(1)
    setCollectedDemons(0)
    setCollectedObjects([])
  }

  const handleChangeActivity = () => {
    setSelectedActivity(null)
    setCommands([])
    setCharacterPosition({ x: 0, y: 0 })
  }

  const handleLevelUp = (newLevel) => {
    if (soundEnabled) {
      soundManager.levelUp()
    }
    setShowLevelUp(true)
  }

  const handleCloseCelebration = () => {
    setShowLevelUp(false)
  }

  const executeCommand = async (command, position, commandIndex) => {
    let newX = position.x
    let newY = position.y
    let shouldAnimate = true
    const theme = themes[selectedTheme]

    switch(command.type) {
      case 'move-up':
        newY = Math.max(0, newY - 1)
        if (soundEnabled) soundManager.move()
        break
      case 'move-down':
        newY = Math.min(4, newY + 1)
        if (soundEnabled) soundManager.move()
        break
      case 'move-left':
        newX = Math.max(0, newX - 1)
        if (soundEnabled) soundManager.move()
        break
      case 'move-right':
        newX = Math.min(4, newX + 1)
        if (soundEnabled) soundManager.move()
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
        if (soundEnabled) soundManager.jump()
        break
      case 'teleport':
        newX = 2
        newY = 2
        if (soundEnabled) soundManager.teleport()
        break
      default:
        // Handle all theme-specific actions dynamically
        const action = [...theme.actions, ...theme.special].find(a => a.type === command.type)
        if (action) {
          setScore(prev => prev + action.points)
          if (action.points > 0) {
            setCollectedDemons(prev => prev + 1)
            setCollectedObjects(prev => [...prev, { x: newX, y: newY, type: command.type }])
            if (soundEnabled) {
              if (command.type === 'catch-demon' || command.type === 'catch-alien' ||
                  command.type === 'catch-fish' || command.type === 'collect-fruit' ||
                  command.type === 'collect-screw') {
                soundManager.collect()
              } else if (command.type === 'cast-spell' || command.type === 'laser-beam' ||
                         command.type === 'sonar-wave' || command.type === 'nature-power' ||
                         command.type === 'build-code') {
                soundManager.castSpell()
              } else if (command.type === 'destroy-wall' || command.type === 'destroy-meteor' ||
                         command.type === 'destroy-rock' || command.type === 'destroy-thorn' ||
                         command.type === 'debug-error') {
                soundManager.destroy()
              }
            }
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

      const result = await executeCommand(command, { x: newX, y: newY }, i)
      newX = result.x
      newY = result.y

      console.log(`Command: ${command.type}, New Position: (${newX}, ${newY})`)

      // Always update character position to show movement
      setCharacterPosition({ x: newX, y: newY })

      // Wait after each command to show the animation
      await new Promise(resolve => setTimeout(resolve, 600))
    }

    setCurrentCommandIndex(-1)
    setIsRunning(false)
  }

  const handleReset = () => {
    setCharacterPosition({ x: 0, y: 0 })
    setCommands([])
    setIsRunning(false)
    setCollectedObjects([])
  }

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled)
  }

  if (!selectedTheme) {
    return <ThemeSelector onSelectTheme={handleThemeSelect} />
  }

  const currentTheme = themes[selectedTheme]
  const themeActivities = getThemeActivities(selectedTheme)

  if (!selectedActivity) {
    return (
      <div className="app" style={{ background: currentTheme.background }}>
        <header className="app-header" style={{ borderColor: currentTheme.primaryColor }}>
          <h1 className="app-title">🎮 ALYABOTIC 🎮</h1>
          <p className="app-subtitle">{currentTheme.name}</p>
          <button
            className="theme-change-btn"
            onClick={handleChangeTheme}
            style={{
              background: `linear-gradient(135deg, ${currentTheme.primaryColor} 0%, ${currentTheme.secondaryColor} 100%)`
            }}
          >
            🔄 Tema Değiştir
          </button>
        </header>
        <ActivitySelector
          activities={themeActivities}
          onSelectActivity={handleActivitySelect}
          theme={currentTheme}
        />
      </div>
    )
  }

  const handleScoreUpdate = (points) => {
    setScore(prev => prev + points)
  }

  // Render specific activity
  const renderActivity = () => {
    switch (selectedActivity.type) {
      case activityTypes.SORTING:
        return <SortingGame theme={currentTheme} soundEnabled={soundEnabled} onScoreUpdate={handleScoreUpdate} />
      case activityTypes.PATTERN:
        return <PatternGame theme={currentTheme} soundEnabled={soundEnabled} onScoreUpdate={handleScoreUpdate} />
      case activityTypes.MAZE:
        return <MazeGame theme={currentTheme} soundEnabled={soundEnabled} onScoreUpdate={handleScoreUpdate} />
      case activityTypes.GRID_MOVEMENT:
      default:
        // Original grid movement game
        return (
          <div className="game-container">
            <div className="left-panel" style={{ borderColor: currentTheme.primaryColor }}>
              <h2 style={{ color: currentTheme.secondaryColor }}>🎮 Oyun Dünyası</h2>
              <GameWorld
                characterPosition={characterPosition}
                level={level}
                theme={currentTheme}
                collectedObjects={collectedObjects}
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
        )
    }
  }

  return (
    <div className="app" style={{ background: currentTheme.background }}>
      <header className="app-header" style={{ borderColor: currentTheme.primaryColor }}>
        <h1 className="app-title">🎮 ALYABOTIC 🎮</h1>
        <p className="app-subtitle">{currentTheme.name} - {selectedActivity.name}</p>
        <div className="stats">
          <div className="stat" style={{ borderColor: currentTheme.secondaryColor }}>
            ⭐ Puan: {score}
          </div>
          <div className="stat" style={{ borderColor: currentTheme.secondaryColor }}>
            🎯 Seviye: {level}
          </div>
          <button
            className="theme-change-btn"
            onClick={handleChangeActivity}
            style={{
              background: `linear-gradient(135deg, ${currentTheme.primaryColor} 0%, ${currentTheme.secondaryColor} 100%)`
            }}
          >
            🔙 Aktivite
          </button>
          <button
            className="theme-change-btn"
            onClick={handleChangeTheme}
            style={{
              background: `linear-gradient(135deg, ${currentTheme.primaryColor} 0%, ${currentTheme.secondaryColor} 100%)`
            }}
          >
            🔄 Tema
          </button>
          <button
            className="sound-toggle-btn"
            onClick={toggleSound}
            style={{
              background: `linear-gradient(135deg, ${currentTheme.primaryColor} 0%, ${currentTheme.secondaryColor} 100%)`
            }}
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
        </div>
      </header>

      {renderActivity()}

      <LevelSystem
        level={level}
        score={score}
        onLevelChange={setLevel}
        onLevelUp={handleLevelUp}
      />

      {showLevelUp && (
        <LevelUpCelebration
          level={level}
          onClose={handleCloseCelebration}
          theme={currentTheme}
        />
      )}
    </div>
  )
}

export default App
