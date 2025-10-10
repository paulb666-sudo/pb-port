// jQuery is loaded via CDN in HTML
const $ = window.jQuery

$(document).ready(() => {
  console.log("[v0] jQuery loaded and ready")

  // ===================================
  // Navigation Toggle (Mobile)
  // ===================================
  $("#navToggle").on("click", function () {
    console.log("[v0] Nav toggle clicked")
    $(this).toggleClass("active")
    $("#navMenu").toggleClass("active")
    console.log("[v0] Nav menu active class:", $("#navMenu").hasClass("active"))
  })

  // ===================================
  // Smooth Scrolling for Navigation Links
  // ===================================
  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault()

    // Close mobile menu immediately
    $("#navToggle").removeClass("active")
    $("#navMenu").removeClass("active")

    var target = $(this.getAttribute("href"))

    if (target.length) {
      // Small delay to allow menu to start closing, then scroll
      setTimeout(() => {
        $("html, body")
          .stop()
          .animate(
            {
              scrollTop: target.offset().top - 70,
            },
            800,
          )
      }, 100)
    }
  })

  // ===================================
  // Active Navigation Link on Scroll
  // ===================================
  $(window).on("scroll", () => {
    var scrollPos = $(window).scrollTop() + 100

    $(".nav-link").each(function () {
      var currLink = $(this)
      var refElement = $(currLink.attr("href"))

      if (refElement.length) {
        if (refElement.offset().top <= scrollPos && refElement.offset().top + refElement.outerHeight() > scrollPos) {
          $(".nav-link").removeClass("active")
          currLink.addClass("active")
        } else {
          currLink.removeClass("active")
        }
      }
    })
  })

  // ===================================
  // Navbar Background on Scroll
  // ===================================
  $(window).on("scroll", () => {
    if ($(window).scrollTop() > 50) {
      $("#navbar").addClass("scrolled")
    } else {
      $("#navbar").removeClass("scrolled")
    }
  })

  // ===================================
  // Scroll to Top Button
  // ===================================
  $(window).on("scroll", () => {
    if ($(window).scrollTop() > 300) {
      $("#scrollTopBtn").addClass("visible")
    } else {
      $("#scrollTopBtn").removeClass("visible")
    }
  })

  $("#scrollTopBtn").on("click", () => {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      800,
    )
  })

  // ===================================
  // Parallax Effect
  // ===================================
  $(window).on("scroll", () => {
    var scrolled = $(window).scrollTop()
    $(".parallax").css("background-position", "center " + scrolled * 0.5 + "px")
    $(".parallax-light").css("background-position", "center " + scrolled * 0.3 + "px")
  })

  // ===================================
  // Fade In Up Animation on Scroll
  // ===================================
  function checkFadeIn() {
    $(".fade-in-up").each(function () {
      var elementTop = $(this).offset().top
      var elementBottom = elementTop + $(this).outerHeight()
      var viewportTop = $(window).scrollTop()
      var viewportBottom = viewportTop + $(window).height()

      if (elementBottom > viewportTop && elementTop < viewportBottom) {
        $(this).addClass("visible")
      }
    })
  }

  // Check on scroll
  $(window).on("scroll", checkFadeIn)

  // Check on page load
  checkFadeIn()

  // ===================================
  // Smooth Page Load Animation
  // ===================================
  $("body").css("opacity", "0")
  $(window).on("load", () => {
    $("body").animate(
      {
        opacity: 1,
      },
      500,
    )
  })
})
