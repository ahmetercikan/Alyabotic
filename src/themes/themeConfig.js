export const themes = {
  wizard: {
    id: 'wizard',
    name: '🔮 İblis Avcısı',
    description: 'Büyücü olarak iblisleri yakala ve büyüler yap!',
    character: '🧙‍♀️',
    background: 'linear-gradient(135deg, #1a0033 0%, #2d0052 50%, #1a0033 100%)',
    primaryColor: '#8B5CF6',
    secondaryColor: '#A78BFA',
    objects: [
      { type: 'demon', emoji: '👹', weight: 3, points: 10 },
      { type: 'treasure', emoji: '💰', weight: 2, points: 20 },
      { type: 'door', emoji: '🚪', weight: 1, points: 15 },
      { type: 'obstacle', emoji: '🪨', weight: 2, points: 12 },
      { type: 'bridge', emoji: '🌉', weight: 1, points: 25 },
    ],
    actions: [
      { type: 'catch-demon', label: '👹 İblis Yakala', points: 10 },
      { type: 'cast-spell', label: '✨ Büyü Yap', points: 5 },
      { type: 'collect-treasure', label: '💰 Hazine Topla', points: 20 },
      { type: 'open-door', label: '🚪 Kapı Aç', points: 15 },
      { type: 'build-bridge', label: '🌉 Köprü Yap', points: 25 },
    ],
    special: [
      { type: 'teleport', label: '🌀 Işınlan (merkez)', points: 0 },
      { type: 'create-light', label: '💡 Işık Yarat', points: 8 },
      { type: 'destroy-obstacle', label: '💥 Engel Yok Et', points: 12 },
    ],
    mission: 'Kodları çalıştırarak haritadaki iblisleri ve hazineleri topla!'
  },

  space: {
    id: 'space',
    name: '🚀 Uzay Macerası',
    description: 'Astronot olarak gezegenleri keşfet ve uzaylılarla tanış!',
    character: '👨‍🚀',
    background: 'linear-gradient(135deg, #0a0033 0%, #1a0f4d 50%, #0a0033 100%)',
    primaryColor: '#3B82F6',
    secondaryColor: '#60A5FA',
    objects: [
      { type: 'alien', emoji: '👽', weight: 3, points: 10 },
      { type: 'planet', emoji: '🪐', weight: 2, points: 20 },
      { type: 'satellite', emoji: '🛸', weight: 1, points: 15 },
      { type: 'meteor', emoji: '☄️', weight: 2, points: 12 },
      { type: 'star', emoji: '⭐', weight: 2, points: 18 },
    ],
    actions: [
      { type: 'catch-alien', label: '👽 Uzaylı Bul', points: 10 },
      { type: 'scan-planet', label: '🔭 Gezegen Tara', points: 5 },
      { type: 'collect-star', label: '⭐ Yıldız Topla', points: 18 },
      { type: 'repair-satellite', label: '🛸 Uydu Tamir Et', points: 15 },
      { type: 'avoid-meteor', label: '☄️ Meteordan Kaç', points: 12 },
    ],
    special: [
      { type: 'warp-jump', label: '🌌 Hiper Zıplama', points: 0 },
      { type: 'deploy-probe', label: '🛰️ Sonda Gönder', points: 8 },
      { type: 'laser-blast', label: '💥 Lazer Patlatma', points: 12 },
    ],
    mission: 'Uzayı keşfet, gezegenleri tara ve yıldızları topla!'
  },

  ocean: {
    id: 'ocean',
    name: '🌊 Denizaltı Keşfi',
    description: 'Dalgıç olarak okyanusun derinliklerini keşfet!',
    character: '🤿',
    background: 'linear-gradient(135deg, #001a33 0%, #003d5c 50%, #001a33 100%)',
    primaryColor: '#0EA5E9',
    secondaryColor: '#38BDF8',
    objects: [
      { type: 'fish', emoji: '🐟', weight: 3, points: 10 },
      { type: 'coral', emoji: '🪸', weight: 2, points: 20 },
      { type: 'shell', emoji: '🐚', weight: 2, points: 15 },
      { type: 'shark', emoji: '🦈', weight: 1, points: 25 },
      { type: 'treasure-chest', emoji: '💎', weight: 1, points: 30 },
    ],
    actions: [
      { type: 'catch-fish', label: '🐟 Balık Yakala', points: 10 },
      { type: 'photograph-coral', label: '📸 Mercan Fotoğrafla', points: 5 },
      { type: 'collect-shell', label: '🐚 Kabuk Topla', points: 15 },
      { type: 'avoid-shark', label: '🦈 Köpekbalığından Kaç', points: 25 },
      { type: 'open-chest', label: '💎 Sandık Aç', points: 30 },
    ],
    special: [
      { type: 'submarine', label: '🚢 Denizaltına Bin', points: 0 },
      { type: 'sonar', label: '📡 Sonar Kullan', points: 8 },
      { type: 'bubble-shield', label: '🫧 Baloncuk Kalkanı', points: 12 },
    ],
    mission: 'Okyanusun derinliklerini keşfet ve deniz hazinelerini bul!'
  },

  forest: {
    id: 'forest',
    name: '🌳 Orman Koruyucusu',
    description: 'Orman koruyucusu olarak doğayı koru ve hayvanları kurtar!',
    character: '🧝',
    background: 'linear-gradient(135deg, #1a3300 0%, #2d5a00 50%, #1a3300 100%)',
    primaryColor: '#22C55E',
    secondaryColor: '#4ADE80',
    objects: [
      { type: 'rabbit', emoji: '🐰', weight: 3, points: 10 },
      { type: 'mushroom', emoji: '🍄', weight: 2, points: 15 },
      { type: 'flower', emoji: '🌸', weight: 2, points: 12 },
      { type: 'tree', emoji: '🌲', weight: 2, points: 20 },
      { type: 'butterfly', emoji: '🦋', weight: 1, points: 18 },
    ],
    actions: [
      { type: 'save-rabbit', label: '🐰 Tavşanı Kurtar', points: 10 },
      { type: 'plant-tree', label: '🌱 Ağaç Dik', points: 20 },
      { type: 'pick-mushroom', label: '🍄 Mantar Topla', points: 15 },
      { type: 'water-flower', label: '💧 Çiçek Sula', points: 12 },
      { type: 'guide-butterfly', label: '🦋 Kelebek Yönlendir', points: 18 },
    ],
    special: [
      { type: 'tree-climb', label: '🌳 Ağaca Tırman', points: 0 },
      { type: 'nature-heal', label: '🌿 Doğa Şifası', points: 8 },
      { type: 'wind-call', label: '🌬️ Rüzgar Çağır', points: 12 },
    ],
    mission: 'Ormanı koru, hayvanları kurtar ve doğayı yeşilllendir!'
  },

  robot: {
    id: 'robot',
    name: '🤖 Robot Fabrikası',
    description: 'Robot mühendisi olarak fabrikada robotları programla!',
    character: '🤖',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #2d2d44 50%, #1a1a2e 100%)',
    primaryColor: '#F59E0B',
    secondaryColor: '#FBBF24',
    objects: [
      { type: 'gear', emoji: '⚙️', weight: 3, points: 10 },
      { type: 'circuit', emoji: '🔌', weight: 2, points: 15 },
      { type: 'battery', emoji: '🔋', weight: 2, points: 12 },
      { type: 'chip', emoji: '💾', weight: 2, points: 20 },
      { type: 'robot-part', emoji: '🦾', weight: 1, points: 25 },
    ],
    actions: [
      { type: 'collect-gear', label: '⚙️ Dişli Topla', points: 10 },
      { type: 'install-circuit', label: '🔌 Devre Tak', points: 15 },
      { type: 'charge-battery', label: '🔋 Batarya Şarj Et', points: 12 },
      { type: 'program-chip', label: '💾 Çip Programla', points: 20 },
      { type: 'assemble-robot', label: '🦾 Robot Montaj', points: 25 },
    ],
    special: [
      { type: 'factory-reset', label: '🏭 Fabrika Sıfırla', points: 0 },
      { type: 'scan-system', label: '🔍 Sistem Tara', points: 8 },
      { type: 'boost-power', label: '⚡ Güç Artır', points: 12 },
    ],
    mission: 'Fabrikada robotları programla ve sistemleri çalıştır!'
  }
};
