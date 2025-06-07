// Matrix Rain Effect
class MatrixRain {
  constructor() {
    this.canvas = document.getElementById("matrix-canvas")
    this.ctx = this.canvas.getContext("2d")
    this.chars =
      "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    this.charArray = this.chars.split("")
    this.fontSize = 14
    this.columns = 0
    this.drops = []

    this.init()
    this.animate()
  }

  init() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.columns = Math.floor(this.canvas.width / this.fontSize)

    for (let i = 0; i < this.columns; i++) {
      this.drops[i] = Math.random() * -100
    }
  }

  animate() {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    this.ctx.fillStyle = "#00ff41"
    this.ctx.font = `${this.fontSize}px monospace`

    for (let i = 0; i < this.drops.length; i++) {
      const text = this.charArray[Math.floor(Math.random() * this.charArray.length)]
      this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize)

      if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
        this.drops[i] = 0
      }
      this.drops[i]++
    }

    requestAnimationFrame(() => this.animate())
  }

  resize() {
    this.init()
  }
}

// Custom Cursor
class CustomCursor {
  constructor() {
    this.cursor = document.querySelector(".custom-cursor")
    this.init()
  }

  init() {
    document.addEventListener("mousemove", (e) => {
      this.cursor.style.left = e.clientX + "px"
      this.cursor.style.top = e.clientY + "px"
    })

    document.addEventListener("mousedown", () => {
      this.cursor.style.transform = "scale(0.8)"
    })

    document.addEventListener("mouseup", () => {
      this.cursor.style.transform = "scale(1)"
    })
  }
}

// Navigation System
class Navigation {
  constructor() {
    this.navItems = document.querySelectorAll(".nav-item")
    this.sections = document.querySelectorAll(".section")
    this.init()
  }

  init() {
    this.navItems.forEach((item) => {
      item.addEventListener("click", () => {
        const target = item.getAttribute("data-target")
        this.showSection(target)
        this.setActiveNav(item)
      })
    })
  }

  showSection(targetId) {
    this.sections.forEach((section) => {
      section.classList.remove("active")
    })

    const targetSection = document.getElementById(targetId)
    if (targetSection) {
      targetSection.classList.add("active")
      this.animateSection(targetSection)
    }
  }

  setActiveNav(activeItem) {
    this.navItems.forEach((item) => {
      item.classList.remove("active")
    })
    activeItem.classList.add("active")
  }

  animateSection(section) {
    const elements = section.querySelectorAll(".cyber-card, .skill-card, .project-card, .contact-card")
    elements.forEach((el, index) => {
      el.style.opacity = "0"
      el.style.transform = "translateY(30px)"
      setTimeout(() => {
        el.style.transition = "all 0.6s ease"
        el.style.opacity = "1"
        el.style.transform = "translateY(0)"
      }, index * 100)
    })
  }
}

// Skills Animation
class SkillsAnimation {
  constructor() {
    this.skillBars = document.querySelectorAll(".skill-progress")
    this.init()
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateSkillBar(entry.target)
        }
      })
    })

    this.skillBars.forEach((bar) => {
      observer.observe(bar)
    })
  }

  animateSkillBar(bar) {
    const width = bar.getAttribute("data-width")
    setTimeout(() => {
      bar.style.width = width + "%"
    }, 500)
  }
}

// Typing Effect
class TypingEffect {
  constructor(element, text, speed = 100) {
    this.element = element
    this.text = text
    this.speed = speed
    this.index = 0
    this.init()
  }

  init() {
    this.element.textContent = ""
    this.type()
  }

  type() {
    if (this.index < this.text.length) {
      this.element.textContent += this.text.charAt(this.index)
      this.index++
      setTimeout(() => this.type(), this.speed)
    }
  }
}

// Loading Screen
class LoadingScreen {
  constructor() {
    this.loadingScreen = document.getElementById("loadingScreen")
    this.init()
  }

  init() {
    setTimeout(() => {
      this.loadingScreen.classList.add("hidden")
    }, 3000)
  }
}

// Glitch Effect
class GlitchEffect {
  constructor() {
    this.glitchElements = document.querySelectorAll(".glitch-text")
    this.init()
  }

  init() {
    this.glitchElements.forEach((element) => {
      setInterval(
        () => {
          this.randomGlitch(element)
        },
        3000 + Math.random() * 2000,
      )
    })
  }

  randomGlitch(element) {
    element.style.animation = "none"
    setTimeout(() => {
      element.style.animation = "glitch 0.3s ease-in-out"
    }, 10)
  }
}

// Sound Effects (Optional)
class SoundEffects {
  constructor() {
    this.sounds = {
      click: this.createBeep(800, 100),
      hover: this.createBeep(600, 50),
      type: this.createBeep(400, 30),
    }
    this.init()
  }

  createBeep(frequency, duration) {
    return () => {
      if (typeof AudioContext !== "undefined" || typeof window.webkitAudioContext !== "undefined") {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.frequency.value = frequency
        oscillator.type = "square"

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000)

        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + duration / 1000)
      }
    }
  }

  init() {
    // Add sound effects to interactive elements
    document.querySelectorAll(".nav-item, .cyber-button, .social-link").forEach((element) => {
      element.addEventListener("click", this.sounds.click)
      element.addEventListener("mouseenter", this.sounds.hover)
    })
  }
}

// Audio Player cho nhạc nền
class AudioPlayer {
  constructor() {
    this.audio = document.getElementById("background-audio")
    this.toggleButton = document.getElementById("toggle-music")
    this.isPlaying = false

    this.init()
  }

  init() {
    // Thiết lập nút bật/tắt nhạc
    if (this.toggleButton) {
      this.toggleButton.addEventListener("click", () => {
        this.toggleMusic()
      })
    }

    // Thêm sự kiện để bắt đầu phát nhạc khi có tương tác người dùng đầu tiên
    document.addEventListener(
      "click",
      () => {
        if (!this.isPlaying) {
          this.playMusic()
        }
      },
      { once: true },
    )

    // Tự động phát nhạc sau khi trang tải xong (cần tương tác người dùng trước)
    window.addEventListener("load", () => {
      // Chờ màn hình loading biến mất
      setTimeout(() => {
        // Cố gắng phát nhạc (sẽ hoạt động nếu người dùng đã tương tác với trang)
        this.playMusic()
      }, 3000)
    })
  }

  playMusic() {
    if (this.audio) {
      const playPromise = this.audio.play()

      // Xử lý lỗi nếu trình duyệt chặn tự động phát
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true
            this.toggleButton.classList.add("playing")
          })
          .catch((error) => {
            console.log("Tự động phát bị chặn. Cần tương tác người dùng:", error)
          })
      }
    }
  }

  toggleMusic() {
    if (!this.audio) return

    if (this.isPlaying) {
      this.audio.pause()
      this.toggleButton.classList.remove("playing")
      this.isPlaying = false
    } else {
      this.audio.play()
      this.toggleButton.classList.add("playing")
      this.isPlaying = true
    }
  }

  setVolume(volume) {
    if (!this.audio) return
    // Volume từ 0.0 đến 1.0
    this.audio.volume = Math.max(0, Math.min(1, volume))
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all components
  const matrixRain = new MatrixRain()
  const customCursor = new CustomCursor()
  const navigation = new Navigation()
  const skillsAnimation = new SkillsAnimation()
  const loadingScreen = new LoadingScreen()
  const glitchEffect = new GlitchEffect()
  const soundEffects = new SoundEffects()
  const audioPlayer = new AudioPlayer() // Khởi tạo trình phát nhạc mới

  // Handle window resize
  window.addEventListener("resize", () => {
    matrixRain.resize()
  })

  // Initialize typing effect for subtitle
  const subtitleElement = document.querySelector(".typing-text")
  if (subtitleElement) {
    new TypingEffect(subtitleElement, "DEV_ANYTHING.exe", 150)
  }

  // Add keyboard navigation
  document.addEventListener("keydown", (e) => {
    const navItems = document.querySelectorAll(".nav-item")
    const activeNav = document.querySelector(".nav-item.active")
    const currentIndex = Array.from(navItems).indexOf(activeNav)

    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault()
      const nextIndex = (currentIndex + 1) % navItems.length
      navItems[nextIndex].click()
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault()
      const prevIndex = (currentIndex - 1 + navItems.length) % navItems.length
      navItems[prevIndex].click()
    }
  })

  // Add easter eggs
  let konamiCode = []
  const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65] // ↑↑↓↓←→←→BA

  document.addEventListener("keydown", (e) => {
    konamiCode.push(e.keyCode)
    if (konamiCode.length > konamiSequence.length) {
      konamiCode.shift()
    }

    if (konamiCode.join(",") === konamiSequence.join(",")) {
      // Easter egg activated
      document.body.style.filter = "hue-rotate(180deg)"
      setTimeout(() => {
        document.body.style.filter = "none"
      }, 3000)
      konamiCode = []
    }
  })

  // Performance optimization
  let ticking = false
  function updateCursor(e) {
    if (!ticking) {
      requestAnimationFrame(() => {
        const cursor = document.querySelector(".custom-cursor")
        cursor.style.left = e.clientX + "px"
        cursor.style.top = e.clientY + "px"
        ticking = false
      })
      ticking = true
    }
  }

  document.addEventListener("mousemove", updateCursor)

  // Expose audio player to window for console debugging
  window.audioPlayer = audioPlayer
})
