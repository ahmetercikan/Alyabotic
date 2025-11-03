import { useState, useEffect } from 'react'
import './GameWorld.css'

const GameWorld = ({ characterPosition, level, theme }) => {
  const [objects, setObjects] = useState([])
  const gridSize = 5

  useEffect(() => {
    // Generate random objects based on level and theme
    const newObjects = []
    const totalObjects = Math.min(level + 2, 8)

    for (let i = 0; i < totalObjects; i++) {
      // Weighted random selection
      const totalWeight = theme.objects.reduce((sum, obj) => sum + obj.weight, 0)
      let random = Math.random() * totalWeight
      let selectedType = theme.objects[0]

      for (const objType of theme.objects) {
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
  }, [level, theme])

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
          cellContent = <div className="character-sprite">{theme.character}</div>
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
      <div className="mission" style={{ borderColor: theme.primaryColor }}>
        <h3 style={{ color: theme.secondaryColor }}>🎯 Görev</h3>
        <p>{theme.mission}</p>
        <div className="object-counts">
          {Object.entries(objectCounts).map(([type, count]) => {
            const obj = theme.objects.find(o => o.type === type)
            return obj ? <span key={type}>{obj.emoji} x{count}</span> : null
          })}
        </div>
        <p className="level-hint" style={{ color: theme.secondaryColor }}>Seviye {level}</p>
      </div>
    </div>
  )
}

export default GameWorld
