// DOM Elements
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")
const darkModeToggle = document.getElementById("darkModeToggle")
const contactForm = document.getElementById("contactForm")
const navbar = document.getElementById("navbar")

// Dark Mode Toggle
function initDarkMode() {
  const savedTheme = localStorage.getItem("theme") || "light"
  document.documentElement.setAttribute("data-theme", savedTheme)
  updateDarkModeIcon(savedTheme)
}

function toggleDarkMode() {
  const currentTheme = document.documentElement.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  document.documentElement.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)
  updateDarkModeIcon(newTheme)
}

function updateDarkModeIcon(theme) {
  const icon = darkModeToggle.querySelector(".toggle-icon")
  icon.textContent = theme === "dark" ? "☀️" : "🌙"
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")

  // Prevent body scroll when menu is open
  if (navMenu.classList.contains("active")) {
    document.body.style.overflow = "hidden"
  } else {
    document.body.style.overflow = "auto"
  }
}

// Close mobile menu when clicking on a link
function closeMobileMenu() {
  hamburger.classList.remove("active")
  navMenu.classList.remove("active")
  document.body.style.overflow = "auto"
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70 // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })

        closeMobileMenu()
      }
    })
  })
}

// Navbar Background on Scroll
function handleNavbarScroll() {
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    if (document.documentElement.getAttribute("data-theme") === "dark") {
      navbar.style.background = "rgba(26, 26, 26, 0.95)"
    }
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.1)"
    if (document.documentElement.getAttribute("data-theme") === "dark") {
      navbar.style.background = "rgba(26, 26, 26, 0.1)"
    }
  }
}

// Intersection Observer for Fade-in Animation
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")

        // Animate progress bars when skills section is visible
        if (entry.target.classList.contains("skill-item")) {
          const progressBar = entry.target.querySelector(".progress-bar")
          if (progressBar) {
            const progress = progressBar.getAttribute("data-progress")
            setTimeout(() => {
              progressBar.style.width = progress + "%"
            }, 500)
          }
        }
      }
    })
  }, observerOptions)

  // Add fade-in class to elements
  const animatedElements = document.querySelectorAll(".about, .projects, .contact, .project-card, .skill-item")
  animatedElements.forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })
}

// Form Validation and Submission
function initContactForm() {
  const nameInput = document.getElementById("name")
  const emailInput = document.getElementById("email")
  const messageInput = document.getElementById("message")

  // Real-time validation
  nameInput.addEventListener("blur", () => validateName())
  emailInput.addEventListener("blur", () => validateEmail())
  messageInput.addEventListener("blur", () => validateMessage())

  // Form submission
  contactForm.addEventListener("submit", handleFormSubmit)
}

function validateName() {
  const name = document.getElementById("name").value.trim()
  const errorElement = document.getElementById("name-error")

  if (name.length < 2) {
    showError(errorElement, "Name must be at least 2 characters long")
    return false
  }

  hideError(errorElement)
  return true
}

function validateEmail() {
  const email = document.getElementById("email").value.trim()
  const errorElement = document.getElementById("email-error")
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(email)) {
    showError(errorElement, "Please enter a valid email address")
    return false
  }

  hideError(errorElement)
  return true
}

function validateMessage() {
  const message = document.getElementById("message").value.trim()
  const errorElement = document.getElementById("message-error")

  if (message.length < 10) {
    showError(errorElement, "Message must be at least 10 characters long")
    return false
  }

  hideError(errorElement)
  return true
}

function showError(element, message) {
  element.textContent = message
  element.style.display = "block"
}

function hideError(element) {
  element.textContent = ""
  element.style.display = "none"
}

async function handleFormSubmit(e) {
  e.preventDefault()

  // Validate all fields
  const isNameValid = validateName()
  const isEmailValid = validateEmail()
  const isMessageValid = validateMessage()

  if (!isNameValid || !isEmailValid || !isMessageValid) {
    return
  }

  // Show loading state
  const submitButton = contactForm.querySelector(".submit-button")
  const buttonText = submitButton.querySelector(".button-text")
  const buttonLoader = submitButton.querySelector(".button-loader")

  buttonText.style.display = "none"
  buttonLoader.style.display = "inline"
  submitButton.disabled = true

  // Simulate form submission (replace with actual API call)
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Success feedback
    showSuccessMessage()
    contactForm.reset()
  } catch (error) {
    showErrorMessage("Something went wrong. Please try again.")
  } finally {
    // Reset button state
    buttonText.style.display = "inline"
    buttonLoader.style.display = "none"
    submitButton.disabled = false
  }
}

function showSuccessMessage() {
  const successDiv = document.createElement("div")
  successDiv.className = "success-message"
  successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--mint-green);
        color: var(--text-dark);
        padding: 1rem 2rem;
        border-radius: 10px;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.5s ease;
    `
  successDiv.textContent = "Message sent successfully! 🎉"

  document.body.appendChild(successDiv)

  setTimeout(() => {
    successDiv.remove()
  }, 3000)
}

function showErrorMessage(message) {
  const errorDiv = document.createElement("div")
  errorDiv.className = "error-message-popup"
  errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff4444;
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.5s ease;
    `
  errorDiv.textContent = message

  document.body.appendChild(errorDiv)

  setTimeout(() => {
    errorDiv.remove()
  }, 3000)
}

// Keyboard Navigation
function initKeyboardNavigation() {
  // Handle Enter key on hamburger menu
  hamburger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      toggleMobileMenu()
    }
  })

  // Handle Escape key to close mobile menu
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("active")) {
      closeMobileMenu()
    }
  })
}

// Typing Animation
function initTypingAnimation() {
  const typingText = document.querySelector(".typing-text")
  const texts = [
    "Building Amazing Experiences",
    "Creating Digital Magic",
    "Coding the Future",
    "Designing with Purpose",
  ]
  let textIndex = 0
  let charIndex = 0
  let isDeleting = false

  function typeWriter() {
    const currentText = texts[textIndex]

    if (isDeleting) {
      typingText.textContent = currentText.substring(0, charIndex - 1)
      charIndex--
    } else {
      typingText.textContent = currentText.substring(0, charIndex + 1)
      charIndex++
    }

    let typeSpeed = isDeleting ? 50 : 100

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000 // Pause at end
      isDeleting = true
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      textIndex = (textIndex + 1) % texts.length
      typeSpeed = 500 // Pause before next text
    }

    setTimeout(typeWriter, typeSpeed)
  }

  if (typingText) {
    typeWriter()
  }
}

// Parallax Effect
function initParallaxEffect() {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll(".floating-shapes, .neon-grid")

    parallaxElements.forEach((element) => {
      const speed = 0.5
      element.style.transform = `translateY(${scrolled * speed}px)`
    })
  })
}

// Performance Optimization - Throttle scroll events
function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments
    
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Initialize all functionality
function init() {
  initDarkMode()
  initSmoothScrolling()
  initScrollAnimations()
  initContactForm()
  initKeyboardNavigation()
  initTypingAnimation()
  initParallaxEffect()

  // Event Listeners
  darkModeToggle.addEventListener("click", toggleDarkMode)
  hamburger.addEventListener("click", toggleMobileMenu)

  // Throttled scroll event
  window.addEventListener("scroll", throttle(handleNavbarScroll, 16))

  // Handle window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && navMenu.classList.contains("active")) {
      closeMobileMenu()
    }
  })

  // Add CSS animations
  const style = document.createElement("style")
  style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideInLeft {
            from {
                transform: translateX(-100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes zoomIn {
            from {
                transform: scale(0.5);
                opacity: 0;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }
    `
  document.head.appendChild(style)
}

// Start the application
document.addEventListener("DOMContentLoaded", init)

// Handle page visibility change for performance
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // Pause animations when page is not visible
    document.body.style.animationPlayState = "paused"
  } else {
    // Resume animations when page becomes visible
    document.body.style.animationPlayState = "running"
  }
})

// Add some interactive effects
function addInteractiveEffects() {
  // Add hover effect to project cards
  const projectCards = document.querySelectorAll(".project-card")
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)"
    })
  })

  // Add click effect to buttons
  const buttons = document.querySelectorAll("button, .cta-button")
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const ripple = document.createElement("span")
      const rect = button.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `

      button.style.position = "relative"
      button.style.overflow = "hidden"
      button.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })
}

// Add ripple animation
const rippleStyle = document.createElement("style")
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`
document.head.appendChild(rippleStyle)

// Initialize interactive effects after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(addInteractiveEffects, 1000)
})
