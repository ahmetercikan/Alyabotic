import './Character.css'

const Character = ({ position }) => {
  return (
    <div
      className="character"
      style={{
        left: `${position.x * 60}px`,
        top: `${position.y * 60}px`
      }}
    >
      🧙‍♀️
    </div>
  )
}

export default Character
