import { themes } from '../themes/themeConfig'
import './ThemeSelector.css'

const ThemeSelector = ({ onSelectTheme }) => {
  return (
    <div className="theme-selector-overlay">
      <div className="theme-selector-container">
        <h1 className="selector-title">🎮 ALYABOTIC 🎮</h1>
        <p className="selector-subtitle">Kodlama Macerası - Tema Seç</p>

        <div className="themes-grid">
          {Object.values(themes).map((theme) => (
            <div
              key={theme.id}
              className="theme-card"
              onClick={() => onSelectTheme(theme.id)}
              style={{
                background: theme.background,
                borderColor: theme.primaryColor
              }}
            >
              <div className="theme-character">{theme.character}</div>
              <h3 className="theme-name">{theme.name}</h3>
              <p className="theme-description">{theme.description}</p>
              <div className="theme-preview">
                {theme.objects.slice(0, 5).map((obj, idx) => (
                  <span key={idx} className="preview-icon">{obj.emoji}</span>
                ))}
              </div>
              <button
                className="theme-select-btn"
                style={{
                  background: `linear-gradient(135deg, ${theme.primaryColor} 0%, ${theme.secondaryColor} 100%)`
                }}
              >
                Oyna!
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ThemeSelector
