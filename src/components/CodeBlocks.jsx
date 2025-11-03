import './CodeBlocks.css'

const CodeBlocks = ({ onAddCommand, disabled }) => {
  const blockCategories = {
    movement: [
      { type: 'move-up', label: '⬆️ Yukarı Git', color: '#8B5CF6' },
      { type: 'move-down', label: '⬇️ Aşağı Git', color: '#8B5CF6' },
      { type: 'move-left', label: '⬅️ Sola Git', color: '#8B5CF6' },
      { type: 'move-right', label: '➡️ Sağa Git', color: '#8B5CF6' },
      { type: 'jump', label: '🦘 Zıpla (2 adım)', color: '#A78BFA' },
    ],
    actions: [
      { type: 'catch-demon', label: '👹 İblis Yakala', color: '#EF4444' },
      { type: 'cast-spell', label: '✨ Büyü Yap', color: '#F59E0B' },
      { type: 'collect-treasure', label: '💰 Hazine Topla', color: '#FBBF24' },
      { type: 'open-door', label: '🚪 Kapı Aç', color: '#34D399' },
      { type: 'build-bridge', label: '🌉 Köprü Yap', color: '#60A5FA' },
    ],
    logic: [
      { type: 'loop-2', label: '🔁 2x Tekrarla', color: '#EC4899', params: { count: 2 } },
      { type: 'loop-3', label: '🔁 3x Tekrarla', color: '#EC4899', params: { count: 3 } },
      { type: 'loop-4', label: '🔁 4x Tekrarla', color: '#EC4899', params: { count: 4 } },
      { type: 'if-demon', label: '❓ Eğer İblis Varsa', color: '#F97316', params: { condition: 'demon' } },
      { type: 'if-treasure', label: '❓ Eğer Hazine Varsa', color: '#F97316', params: { condition: 'treasure' } },
    ],
    special: [
      { type: 'teleport', label: '🌀 Işınlan (merkez)', color: '#8B5CF6' },
      { type: 'create-light', label: '💡 Işık Yarat', color: '#FCD34D' },
      { type: 'destroy-obstacle', label: '💥 Engel Yok Et', color: '#DC2626' },
    ]
  }

  return (
    <div className="code-blocks">
      <div className="block-category">
        <h4>🎮 Hareket</h4>
        <div className="blocks-grid">
          {blockCategories.movement.map((block) => (
            <button
              key={block.type}
              className="code-block"
              style={{ backgroundColor: block.color }}
              onClick={() => onAddCommand(block)}
              disabled={disabled}
            >
              {block.label}
            </button>
          ))}
        </div>
      </div>

      <div className="block-category">
        <h4>⚡ Aksiyonlar</h4>
        <div className="blocks-grid">
          {blockCategories.actions.map((block) => (
            <button
              key={block.type}
              className="code-block"
              style={{ backgroundColor: block.color }}
              onClick={() => onAddCommand(block)}
              disabled={disabled}
            >
              {block.label}
            </button>
          ))}
        </div>
      </div>

      <div className="block-category">
        <h4>🧠 Mantık</h4>
        <div className="blocks-grid">
          {blockCategories.logic.map((block) => (
            <button
              key={block.type}
              className="code-block"
              style={{ backgroundColor: block.color }}
              onClick={() => onAddCommand(block)}
              disabled={disabled}
            >
              {block.label}
            </button>
          ))}
        </div>
      </div>

      <div className="block-category">
        <h4>🌟 Özel Güçler</h4>
        <div className="blocks-grid">
          {blockCategories.special.map((block) => (
            <button
              key={block.type}
              className="code-block"
              style={{ backgroundColor: block.color }}
              onClick={() => onAddCommand(block)}
              disabled={disabled}
            >
              {block.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CodeBlocks
