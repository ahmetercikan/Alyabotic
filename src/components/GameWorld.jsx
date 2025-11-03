import { useState, useEffect } from 'react'
import './GameWorld.css'

const GameWorld = ({ characterPosition, level }) => {
  const [demons, setDemons] = useState([])
  const gridSize = 5

  useEffect(() => {
    // Generate random demon positions based on level
    const newDemons = []
    const demonCount = level + 1
    for (let i = 0; i < demonCount; i++) {
      newDemons.push({
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize),
        id: i
      })
    }
    setDemons(newDemons)
  }, [level])

  const renderGrid = () => {
    const grid = []
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const isCharacter = characterPosition.x === x && characterPosition.y === y
        const demon = demons.find(d => d.x === x && d.y === y)
        const hasDemon = !!demon

        grid.push(
          <div
            key={`${x}-${y}`}
            className={`grid-cell ${isCharacter ? 'character' : ''} ${hasDemon ? 'demon' : ''}`}
          >
            {isCharacter && <div className="character-sprite">🧙‍♀️</div>}
            {hasDemon && !isCharacter && <div className="demon-sprite">👹</div>}
            {!isCharacter && !hasDemon && <div className="empty-cell">✨</div>}
          </div>
        )
      }
    }
    return grid
  }

  return (
    <div className="game-world">
      <div className="grid">
        {renderGrid()}
      </div>
      <div className="mission">
        <h3>🎯 Görev</h3>
        <p>İblisleri yakala ve büyüler yaparak puan kazan!</p>
        <p>Seviye {level}: {demons.length} iblis var</p>
      </div>
    </div>
  )
}

export default GameWorld
