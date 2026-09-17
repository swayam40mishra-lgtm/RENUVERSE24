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

    navItems.forEach(item => {
        item.classList.remove("active-nav");
    });

    const activeNav = document.querySelector(
        `.nav-item[onclick="navigate('${pageName}')"]`
    );

    if (activeNav) {
        activeNav.classList.add("active-nav");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    closeMenu();
}


// ========================================
// MENU
// ========================================

function openMenu() {

    if (!menu) return;

    menu.classList.add("open");
    document.body.style.overflow = "hidden";
}


function closeMenu() {

    if (!menu) return;

    menu.classList.remove("open");
    document.body.style.overflow = "";
}


// ========================================
// CLOSE MENU OUTSIDE
// ========================================

if (menu) {

    menu.addEventListener("click", function(event) {

        if (event.target === menu) {
            closeMenu();
        }

    });

}


// ========================================
// ESCAPE KEY
// ========================================

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closeMenu();
    }

});


// ========================================
// MANUAL NOTIFICATIONS
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
// MANUAL TIMELINE
// ========================================

const timeline = {

    1: true,
    2: true,
    3: false,
    4: false,
    5: false

};


// ========================================
// PAGE LOAD
// ========================================

document.addEventListener("DOMContentLoaded", function() {

    navigate("home");

});
