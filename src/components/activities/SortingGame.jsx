import { useState, useEffect } from 'react'
import './SortingGame.css'
import { soundManager } from '../../utils/sounds'

const SortingGame = ({ theme, soundEnabled, onScoreUpdate }) => {
  const [items, setItems] = useState([])
  const [sortedItems, setSortedItems] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [isComplete, setIsComplete] = useState(false)

  // Generate random items to sort
  useEffect(() => {
    generateItems()
  }, [theme])

  const generateItems = () => {
    const itemTypes = [
      { emoji: '1️⃣', value: 1, name: 'Bir' },
      { emoji: '2️⃣', value: 2, name: 'İki' },
      { emoji: '3️⃣', value: 3, name: 'Üç' },
      { emoji: '4️⃣', value: 4, name: 'Dört' },
      { emoji: '5️⃣', value: 5, name: 'Beş' }
    ]

    // Shuffle items
    const shuffled = [...itemTypes].sort(() => Math.random() - 0.5)
    setItems(shuffled)
    setSortedItems([])
    setIsComplete(false)
  }

  const handleItemClick = (item) => {
    if (isComplete) return

    if (selectedItem === null) {
      // First click - select item
      setSelectedItem(item)
      if (soundEnabled) soundManager.collect()
    } else if (selectedItem.value === item.value) {
      // Clicking same item - deselect
      setSelectedItem(null)
    } else {
      // Second click - swap items
      const newItems = [...items]
      const idx1 = newItems.findIndex(i => i.value === selectedItem.value)
      const idx2 = newItems.findIndex(i => i.value === item.value)

      // Swap the items
      const temp = newItems[idx1]
      newItems[idx1] = newItems[idx2]
      newItems[idx2] = temp

      console.log('Swapping:', selectedItem.value, 'with', item.value)
      console.log('New order:', newItems.map(i => i.value))

      setItems(newItems)
      setSelectedItem(null)

      if (soundEnabled) soundManager.move()

      // Check if sorted
      const isSorted = newItems.every((item, index) => item.value === index + 1)
      console.log('Is sorted?', isSorted)

      if (isSorted) {
        setIsComplete(true)
        if (onScoreUpdate) onScoreUpdate(100)
        if (soundEnabled) soundManager.levelUp()
      }
    }
  }

  const handleReset = () => {
    generateItems()
  }

  return (
    <div className="sorting-game">
      <div className="sorting-header">
        <h2 style={{ color: theme.secondaryColor }}>
          🔢 Sıralama Oyunu
        </h2>
        <p style={{ color: theme.primaryColor }}>
          Sayıları küçükten büyüğe sırala!
        </p>
      </div>

      <div className="sorting-container">
        <div className="sorting-items">
          {items.map((item, index) => (
            <div
              key={index}
              className={`sorting-item ${selectedItem?.value === item.value ? 'selected' : ''} ${isComplete ? 'complete' : ''}`}
              onClick={() => handleItemClick(item)}
              style={{
                borderColor: selectedItem?.value === item.value ? theme.primaryColor : theme.secondaryColor,
                boxShadow: selectedItem?.value === item.value ? `0 0 20px ${theme.primaryColor}` : 'none'
              }}
            >
              <div className="item-emoji">{item.emoji}</div>
              <div className="item-name">{item.name}</div>
            </div>
          ))}
        </div>

        {isComplete && (
          <div className="sorting-complete" style={{ color: theme.primaryColor }}>
            <h3>🎉 Tebrikler! Doğru sıraladın!</h3>
          </div>
        )}

        <div className="sorting-controls">
          <button
            className="btn btn-reset"
            onClick={handleReset}
            style={{
              background: `linear-gradient(135deg, ${theme.primaryColor} 0%, ${theme.secondaryColor} 100%)`
            }}
          >
            🔄 Yeni Oyun
          </button>
        </div>

        <div className="sorting-hint" style={{ color: theme.secondaryColor }}>
          💡 İpucu: İki sayıyı yer değiştirmek için sırayla tıkla
        </div>
      </div>
    </div>
  )
}

export default SortingGame
