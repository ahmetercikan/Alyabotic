// Activity types configuration
export const activityTypes = {
  GRID_MOVEMENT: 'grid-movement',
  SORTING: 'sorting',
  PATTERN: 'pattern',
  MAZE: 'maze',
  PUZZLE: 'puzzle',
  COLOR_MATCH: 'color-match',
  LOGIC_GATES: 'logic-gates'
}

// Activity definitions for each theme
export const themeActivities = {
  wizard: [
    {
      id: 'wizard-movement',
      type: activityTypes.GRID_MOVEMENT,
      name: '🗺️ Büyülü Harita',
      description: 'Büyücüyü hareket ettir ve iblisleri yakala!',
      icon: '🧙‍♀️'
    },
    {
      id: 'wizard-pattern',
      type: activityTypes.PATTERN,
      name: '🔮 Büyü Deseni',
      description: 'Büyü desenlerini tamamla!',
      icon: '✨'
    },
    {
      id: 'wizard-sorting',
      type: activityTypes.SORTING,
      name: '📚 Büyü Kitapları',
      description: 'Büyü kitaplarını güçlerine göre sırala!',
      icon: '📖'
    }
  ],
  space: [
    {
      id: 'space-movement',
      type: activityTypes.GRID_MOVEMENT,
      name: '🚀 Uzay Yolculuğu',
      description: 'Uzay gemisini yönlendir!',
      icon: '🚀'
    },
    {
      id: 'space-sorting',
      type: activityTypes.SORTING,
      name: '🪐 Gezegen Sıralaması',
      description: 'Gezegenleri boyutlarına göre sırala!',
      icon: '🌍'
    },
    {
      id: 'space-maze',
      type: activityTypes.MAZE,
      name: '🌌 Asteroid Labirenti',
      description: 'Asteroidler arasında yol bul!',
      icon: '☄️'
    }
  ],
  ocean: [
    {
      id: 'ocean-movement',
      type: activityTypes.GRID_MOVEMENT,
      name: '🌊 Deniz Keşfi',
      description: 'Denizaltını yönlendir!',
      icon: '🚢'
    },
    {
      id: 'ocean-maze',
      type: activityTypes.MAZE,
      name: '🐠 Mercan Labirenti',
      description: 'Mercanlar arasında yol bul!',
      icon: '🪸'
    },
    {
      id: 'ocean-color-match',
      type: activityTypes.COLOR_MATCH,
      name: '🐟 Balık Eşleştirme',
      description: 'Aynı renkteki balıkları eşleştir!',
      icon: '🎣'
    }
  ],
  forest: [
    {
      id: 'forest-movement',
      type: activityTypes.GRID_MOVEMENT,
      name: '🌲 Orman Yürüyüşü',
      description: 'Ormanda yol bul!',
      icon: '🦌'
    },
    {
      id: 'forest-puzzle',
      type: activityTypes.PUZZLE,
      name: '🧩 Orman Puzzle',
      description: 'Yaprakları doğru yere yerleştir!',
      icon: '🍃'
    },
    {
      id: 'forest-pattern',
      type: activityTypes.PATTERN,
      name: '🌸 Çiçek Deseni',
      description: 'Çiçek desenlerini tamamla!',
      icon: '🌺'
    }
  ],
  robot: [
    {
      id: 'robot-movement',
      type: activityTypes.GRID_MOVEMENT,
      name: '🤖 Robot Hareketi',
      description: 'Robotu programla!',
      icon: '🤖'
    },
    {
      id: 'robot-logic',
      type: activityTypes.LOGIC_GATES,
      name: '💡 Mantık Devreleri',
      description: 'Mantık kapılarını öğren!',
      icon: '⚡'
    },
    {
      id: 'robot-sorting',
      type: activityTypes.SORTING,
      name: '🔧 Parça Sıralaması',
      description: 'Robot parçalarını sırala!',
      icon: '⚙️'
    }
  ]
}

// Get activities for a specific theme
export const getThemeActivities = (themeId) => {
  return themeActivities[themeId] || []
}
