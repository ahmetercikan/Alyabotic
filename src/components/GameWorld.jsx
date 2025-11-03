import { useState, useEffect } from 'react'
import './GameWorld.css'

const GameWorld = ({ characterPosition, level }) => {
  const [objects, setObjects] = useState([])
  const gridSize = 5

  useEffect(() => {
    // Generate random objects based on level
    const newObjects = []
    const totalObjects = Math.min(level + 2, 8)

    const objectTypes = [
      { type: 'demon', emoji: '👹', weight: 3 },
      { type: 'treasure', emoji: '💰', weight: 2 },
      { type: 'door', emoji: '🚪', weight: 1 },
      { type: 'obstacle', emoji: '🪨', weight: 2 },
      { type: 'bridge', emoji: '🌉', weight: 1 },
    ]

    for (let i = 0; i < totalObjects; i++) {
      // Weighted random selection
      const totalWeight = objectTypes.reduce((sum, obj) => sum + obj.weight, 0)
      let random = Math.random() * totalWeight
      let selectedType = objectTypes[0]

      for (const objType of objectTypes) {
        random -= objType.weight
        if (random <= 0) {
          selectedType = objType
          break
        }
      }

      newObjects.push({
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize),
        type: selectedType.type,
        emoji: selectedType.emoji,
        id: i
      })
    }
    setObjects(newObjects)
  }, [level])

  const renderGrid = () => {
    const grid = []
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const isCharacter = characterPosition.x === x && characterPosition.y === y
        const object = objects.find(o => o.x === x && o.y === y)

        let cellClass = 'grid-cell'
        let cellContent = <div className="empty-cell">✨</div>

        if (isCharacter) {
          cellClass += ' character'
          cellContent = <div className="character-sprite">🧙‍♀️</div>
        } else if (object) {
          cellClass += ` object-${object.type}`
          cellContent = <div className={`object-sprite ${object.type}-sprite`}>{object.emoji}</div>
        }

        grid.push(
          <div key={`${x}-${y}`} className={cellClass}>
            {cellContent}
          </div>
        )
      }
    }
    return grid
  }

  const objectCounts = objects.reduce((acc, obj) => {
    acc[obj.type] = (acc[obj.type] || 0) + 1
    return acc
  }, {})

  return (
    <div className="game-world">
      <div className="grid">
        {renderGrid()}
      </div>
      <div className="mission">
        <h3>🎯 Görev</h3>
        <p>Kodları çalıştırarak haritadaki objeleri topla!</p>
        <div className="object-counts">
          {objectCounts.demon && <span>👹 x{objectCounts.demon}</span>}
          {objectCounts.treasure && <span>💰 x{objectCounts.treasure}</span>}
          {objectCounts.door && <span>🚪 x{objectCounts.door}</span>}
          {objectCounts.obstacle && <span>🪨 x{objectCounts.obstacle}</span>}
          {objectCounts.bridge && <span>🌉 x{objectCounts.bridge}</span>}
        </div>
        <p className="level-hint">Seviye {level}</p>
      </div>
    </div>
  )
}

export default GameWorld
