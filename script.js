// Khởi tạo GSAP và ScrollTrigger
document.addEventListener("DOMContentLoaded", () => {
  // Đăng ký ScrollTrigger
  gsap.registerPlugin(ScrollTrigger)

  // Initialize particles.js
  particlesJS("particles-js", {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#ffffff",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
        polygon: {
          nb_sides: 5,
        },
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  })

  // Create animations for each tab content
  const tabContents = document.querySelectorAll(".tab-content")

  tabContents.forEach((content) => {
    // Create staggered animations for elements inside each tab
    const elements = content.querySelectorAll(
      "h1, h2, h3, p, .info-item, .donate-method, .social-icons, .skills, .profile-img-container, .author-section",
    )

    gsap.set(elements, { opacity: 0, y: 30 })

    ScrollTrigger.create({
      trigger: content,
      start: "top 80%",
      onEnter: () => {
        if (content.classList.contains("active")) {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          })
        }
      },
      onLeaveBack: () => {
        gsap.to(elements, {
          opacity: 0,
          y: 30,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.in",
        })
      },
    })
  })

  // Handle tab switching
  const menuItems = document.querySelectorAll(".menu-item")
  const tabContentsArray = Array.from(tabContents)
  let currentTabIndex = 0

  function switchTab(index) {
    if (index < 0 || index >= tabContentsArray.length) return

    // Remove active class from all menu items and tab contents
    menuItems.forEach((item) => item.classList.remove("active"))
    tabContentsArray.forEach((tab) => tab.classList.remove("active"))

    // Add active class to selected menu item and tab content
    menuItems[index].classList.add("active")
    tabContentsArray[index].classList.add("active")

    currentTabIndex = index

    // Trigger animations for the active tab
    const elements = tabContentsArray[index].querySelectorAll(
      "h1, h2, h3, p, .info-item, .donate-method, .social-icons, .skills, .profile-img-container, .author-section",
    )

    gsap.fromTo(
      elements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      },
    )

    // Refresh ScrollTrigger
    ScrollTrigger.refresh()
  }

  // Add click event listeners to menu items
  menuItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      switchTab(index)
    })
  })

  // Handle mouse wheel navigation between tabs
  let isScrolling = false
  window.addEventListener("wheel", (event) => {
    if (isScrolling) return

    isScrolling = true
    setTimeout(() => {
      isScrolling = false
    }, 800) // Longer delay to prevent accidental scrolling

    if (event.deltaY > 0) {
      // Scroll down - go to next tab
      if (currentTabIndex < tabContentsArray.length - 1) {
        switchTab(currentTabIndex + 1)
      }
    } else if (event.deltaY < 0) {
      // Scroll up - go to previous tab
      if (currentTabIndex > 0) {
        switchTab(currentTabIndex - 1)
      }
    }
  })

  // Add touch swipe support for mobile
  let touchStartY = 0
  let touchEndY = 0

  document.addEventListener(
    "touchstart",
    (e) => {
      touchStartY = e.changedTouches[0].screenY
    },
    false,
  )

  document.addEventListener(
    "touchend",
    (e) => {
      touchEndY = e.changedTouches[0].screenY
      handleSwipe()
    },
    false,
  )

  function handleSwipe() {
    if (isScrolling) return

    isScrolling = true
    setTimeout(() => {
      isScrolling = false
    }, 800)

    const swipeDistance = touchStartY - touchEndY

    if (swipeDistance > 50) {
      // Swipe up - go to next tab
      if (currentTabIndex < tabContentsArray.length - 1) {
        switchTab(currentTabIndex + 1)
      }
    } else if (swipeDistance < -50) {
      // Swipe down - go to previous tab
      if (currentTabIndex > 0) {
        switchTab(currentTabIndex - 1)
      }
    }
  }

  // Set up social media links
  const links = {
    facebook: "https://www.facebook.com/itsvzang/",
    instagram: "https://www.instagram.com/zangpeodzai/",
    tiktok: "https://www.tiktok.com/@zangpeo_04",
    github: "https://github.com/vzang2044",
    messenger: "https://m.me/itsvzang",
    telegram: "https://t.me/vzang04",
    email: "mailto:vzang204@gmail.com",
  }

  // Set href attributes for social links
  document.getElementById("facebook").href = links.facebook
  document.getElementById("instagram").href = links.instagram
  document.getElementById("tiktok").href = links.tiktok
  document.getElementById("github").href = links.github
  document.getElementById("author-facebook").href = links.facebook
  document.getElementById("author-messenger").href = links.messenger
  document.getElementById("author-telegram").href = links.telegram
  document.getElementById("author-email").href = links.email

  // Handle contact button click
  const contactBtn = document.querySelector(".contact-btn")
  contactBtn.addEventListener("click", (event) => {
    event.preventDefault()
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.location.href = "tel:+84946039187"
    } else {
      window.location.href = "mailto:vzang204@gmail.com"
    }
  })

  // Handle scroll to top button
  const scrollToTopBtn = document.querySelector(".scroll-to-top")

  if (scrollToTopBtn) {
    // Show/hide button based on current tab
    function updateScrollButton() {
      if (currentTabIndex > 0) {
        scrollToTopBtn.classList.add("active")
      } else {
        scrollToTopBtn.classList.remove("active")
      }
    }

    // Update button state when switching tabs
    window.addEventListener("wheel", updateScrollButton)
    document.addEventListener("touchend", updateScrollButton)

    // Add click event to scroll to top/first tab
    scrollToTopBtn.addEventListener("click", (e) => {
      e.preventDefault()
      switchTab(0)
    })
  }

  // Add hover effects with GSAP
  const hoverElements = document.querySelectorAll(".social-icon, .social-circle, .donate-method, .contact-btn")

  hoverElements.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      gsap.to(this, {
        y: -5,
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      })
    })

    element.addEventListener("mouseleave", function () {
      gsap.to(this, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      })
    })
  })

  // Make global functions available
  window.switchTab = switchTab
})
