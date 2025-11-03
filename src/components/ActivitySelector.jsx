import './ActivitySelector.css'

const ActivitySelector = ({ activities, onSelectActivity, theme }) => {
  return (
    <div className="activity-selector">
      <h2 className="activity-title" style={{ color: theme.secondaryColor }}>
        🎮 Aktivite Seç
      </h2>
      <div className="activities-grid">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="activity-card"
            onClick={() => onSelectActivity(activity)}
            style={{
              borderColor: theme.primaryColor,
              background: `linear-gradient(135deg, ${theme.primaryColor}20 0%, ${theme.secondaryColor}20 100%)`
            }}
          >
            <div className="activity-icon">{activity.icon}</div>
            <h3 className="activity-name">{activity.name}</h3>
            <p className="activity-description">{activity.description}</p>
            <button
              className="activity-start-btn"
              style={{
                background: `linear-gradient(135deg, ${theme.primaryColor} 0%, ${theme.secondaryColor} 100%)`
              }}
            >
              Başla
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ActivitySelector
