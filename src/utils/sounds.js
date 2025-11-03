// Sound effects using Web Audio API
class SoundManager {
  constructor() {
    this.audioContext = null
    this.enabled = true
  }

  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
    }
  }

  playTone(frequency, duration, type = 'sine') {
    if (!this.enabled) return

    try {
      this.init()
      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)

      oscillator.frequency.value = frequency
      oscillator.type = type

      gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        this.audioContext.currentTime + duration
      )

      oscillator.start(this.audioContext.currentTime)
      oscillator.stop(this.audioContext.currentTime + duration)
    } catch (error) {
      console.log('Sound playback failed:', error)
    }
  }

  playChord(frequencies, duration) {
    frequencies.forEach((freq, index) => {
      setTimeout(() => this.playTone(freq, duration), index * 50)
    })
  }

  // Movement sound
  move() {
    this.playTone(440, 0.1, 'sine')
  }

  // Collect object sound
  collect() {
    this.playChord([523, 659, 784], 0.2) // C, E, G chord
  }

  // Catch demon sound
  catchDemon() {
    this.playChord([392, 494, 587, 698], 0.3) // G, B, D, F chord
  }

  // Cast spell sound
  castSpell() {
    this.playTone(880, 0.15, 'square')
    setTimeout(() => this.playTone(1047, 0.15, 'square'), 100)
  }

  // Destroy obstacle sound
  destroy() {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        this.playTone(200 - i * 30, 0.1, 'sawtooth')
      }, i * 50)
    }
  }

  // Level up sound
  levelUp() {
    const notes = [523, 587, 659, 784, 880, 988, 1047] // C major scale
    notes.forEach((note, index) => {
      setTimeout(() => {
        this.playTone(note, 0.3, 'sine')
      }, index * 100)
    })
  }

  // Success sound (for completing a level)
  success() {
    this.playChord([523, 659, 784, 1047], 0.5) // C major chord with octave
  }

  // Error sound
  error() {
    this.playTone(200, 0.3, 'sawtooth')
  }

  // Teleport sound
  teleport() {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        this.playTone(800 + i * 50, 0.05, 'sine')
      }, i * 20)
    }
  }

  // Jump sound
  jump() {
    this.playTone(600, 0.1, 'triangle')
    setTimeout(() => this.playTone(800, 0.1, 'triangle'), 100)
  }

  toggle() {
    this.enabled = !this.enabled
    return this.enabled
  }

  setEnabled(enabled) {
    this.enabled = enabled
  }
}

export const soundManager = new SoundManager()
