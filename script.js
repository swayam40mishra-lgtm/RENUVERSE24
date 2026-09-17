// ========================================
// PROJECT AURORA — MAIN JAVASCRIPT
// ========================================

const pages = document.querySelectorAll(".page");
const navItems = document.querySelectorAll(".nav-item");
const menu = document.getElementById("menu");


// ========================================
// PAGE NAVIGATION
// ========================================

function navigate(pageName) {

  pages.forEach(page => {
    page.classList.remove("active");
  });

  const targetPage = document.getElementById(pageName);

  if (targetPage) {
    targetPage.classList.add("active");
  }

  // Update bottom navigation
  navItems.forEach(item => {
    item.classList.remove("active-nav");
  });

  const activeNav = document.querySelector(
    `.nav-item[onclick="navigate('${pageName}')"]`
  );

  if (activeNav) {
    activeNav.classList.add("active-nav");
  }

  // Start page from top
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// ========================================
// MENU
// ========================================

function openMenu() {
  menu.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  menu.classList.remove("open");
  document.body.style.overflow = "";
}


// ========================================
// CLOSE MENU WHEN CLICKING OUTSIDE
// ========================================

menu.addEventListener("click", function(event) {

  if (event.target === menu) {
    closeMenu();
  }

});


// ========================================
// KEYBOARD ESCAPE
// ========================================

document.addEventListener("keydown", function(event) {

  if (event.key === "Escape") {
    closeMenu();
  }

});


// ========================================
// NOTIFICATION DATA
// ========================================

const notifications = [

  {
    time: "09:45",
    type: "SYSTEM",
    title: "New transmission received",
    message: "A new signal has entered the Aurora archive."
  },

  {
    time: "08:12",
    type: "KAIROS",
    title: "Archive update",
    message: "A new entry has been added to the system."
  },

  {
    time: "YESTERDAY",
    type: "ARCHIVE",
    title: "Something was found",
    message: "The archive has revealed another fragment."
  }

];


// ========================================
// FUTURE MANUAL NOTIFICATION SYSTEM
// ========================================
//
// Later you can add notifications manually
// to the array above.
//
// Example:
//
// {
//   time: "21:30",
//   type: "LAYRA",
//   title: "Transmission detected",
//   message: "Something has changed."
// }
//
// No automatic dates.
// No automatic unlocking.
// Everything remains manually controlled.
// ========================================


// ========================================
// MANUAL TIMELINE STATE
// ========================================

const timeline = {

  1: true,

  2: true,

  3: false,

  4: false,

  5: false

};


// ========================================
// SIMPLE PAGE LOAD
// ========================================

document.addEventListener("DOMContentLoaded", function() {

  navigate("home");

});
