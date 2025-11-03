import './CodeBlocks.css'

const CodeBlocks = ({ onAddCommand, disabled, theme }) => {
  const blockCategories = {
    movement: [
      { type: 'move-up', label: '⬆️ Yukarı Git', color: theme.primaryColor },
      { type: 'move-down', label: '⬇️ Aşağı Git', color: theme.primaryColor },
      { type: 'move-left', label: '⬅️ Sola Git', color: theme.primaryColor },
      { type: 'move-right', label: '➡️ Sağa Git', color: theme.primaryColor },
      { type: 'jump', label: '🦘 Zıpla (2 adım)', color: theme.secondaryColor },
    ],
    actions: theme.actions.map(action => ({
      ...action,
      color: '#EF4444'
    })),
    logic: [
      { type: 'loop-2', label: '🔁 2x Tekrarla', color: '#EC4899', params: { count: 2 } },
      { type: 'loop-3', label: '🔁 3x Tekrarla', color: '#EC4899', params: { count: 3 } },
      { type: 'loop-4', label: '🔁 4x Tekrarla', color: '#EC4899', params: { count: 4 } },
      { type: 'if-object', label: '❓ Eğer Obje Varsa', color: '#F97316', params: { condition: 'object' } },
    ],
    special: theme.special.map(special => ({
      ...special,
      color: '#F59E0B'
    }))
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
