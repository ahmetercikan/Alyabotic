import './CodeBlocks.css'

const CodeBlocks = ({ onAddCommand, disabled }) => {
  const blocks = [
    { type: 'move-up', label: '⬆️ Yukarı Git', color: '#8B5CF6' },
    { type: 'move-down', label: '⬇️ Aşağı Git', color: '#8B5CF6' },
    { type: 'move-left', label: '⬅️ Sola Git', color: '#8B5CF6' },
    { type: 'move-right', label: '➡️ Sağa Git', color: '#8B5CF6' },
    { type: 'catch-demon', label: '👹 İblis Yakala', color: '#EF4444' },
    { type: 'cast-spell', label: '✨ Büyü Yap', color: '#F59E0B' },
  ]

  return (
    <div className="code-blocks">
      {blocks.map((block) => (
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
  )
}

export default CodeBlocks
