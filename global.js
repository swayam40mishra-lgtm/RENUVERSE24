
/* =========================================================
   PROJECT AURORA — GLOBAL JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const menu = document.getElementById("auroraMenu");
    const menuButton = document.getElementById("menuButton");
    const menuClose = document.getElementById("menuClose");
    const menuBackdrop = document.getElementById("menuBackdrop");


    /* =====================================================
       OPEN MENU
    ====================================================== */

    function openAuroraMenu() {

        if (!menu) return;

        menu.classList.add("open");

        menu.setAttribute("aria-hidden", "false");

        if (menuButton) {
            menuButton.setAttribute("aria-expanded", "true");
        }

        document.body.classList.add("no-scroll");
    }


    /* =====================================================
       CLOSE MENU
    ====================================================== */

    function closeAuroraMenu() {

        if (!menu) return;

        menu.classList.remove("open");

        menu.setAttribute("aria-hidden", "true");

        if (menuButton) {
            menuButton.setAttribute("aria-expanded", "false");
        }

        document.body.classList.remove("no-scroll");
    }


    /* =====================================================
       BUTTON EVENTS
    ====================================================== */

    if (menuButton) {
        menuButton.addEventListener("click", openAuroraMenu);
    }

    if (menuClose) {
        menuClose.addEventListener("click", closeAuroraMenu);
    }

    if (menuBackdrop) {
        menuBackdrop.addEventListener("click", closeAuroraMenu);
    }


    /* =====================================================
       ESCAPE KEY
    ====================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeAuroraMenu();
        }

    });


    /* =====================================================
       PREVENT MENU FROM CLOSING WHEN CLICKING PANEL
    ====================================================== */

    const menuPanel = document.querySelector(".menu-panel");

    if (menuPanel) {

        menuPanel.addEventListener("click", (event) => {
            event.stopPropagation();
        });

    }


    /* =====================================================
       CLOSE MENU AFTER INTERNAL NAVIGATION
    ====================================================== */

    const internalMenuLinks = document.querySelectorAll(
        ".menu-navigation-item:not(.external)"
    );

    internalMenuLinks.forEach((link) => {

        link.addEventListener("click", () => {
            closeAuroraMenu();
        });

    });


    /* =====================================================
       BOTTOM NAV — ACTIVE PAGE
    ====================================================== */

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    const bottomLinks =
        document.querySelectorAll(".bottom-item");

    bottomLinks.forEach((link) => {

        const href = link.getAttribute("href");

        if (!href) return;

        if (
            href === currentPage ||
            (currentPage === "" && href === "index.html")
        ) {
            link.classList.add("active");
        }

    });


    /* =====================================================
       MENU NAV — ACTIVE PAGE
    ====================================================== */

    const menuLinks =
        document.querySelectorAll(
            ".menu-navigation-item:not(.external)"
        );

    menuLinks.forEach((link) => {

        const href = link.getAttribute("href");

        if (!href) return;

        if (href === currentPage) {
            link.classList.add("active");
        }

    });


    /* =====================================================
       IMAGE FALLBACK
    ====================================================== */

    const images =
        document.querySelectorAll("img");

    images.forEach((image) => {

        image.addEventListener("error", () => {

            image.classList.add("image-error");

        });

    });


    /* =====================================================
       SMOOTH INTERNAL PAGE TRANSITION
    ====================================================== */

    const pageLinks =
        document.querySelectorAll(
            'a[href$=".html"]:not([target="_blank"])'
        );

    pageLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const href = link.getAttribute("href");

            if (
                !href ||
                href.startsWith("#") ||
                href.startsWith("http")
            ) {
                return;
            }

            /*
             * Keep normal navigation reliable.
             * We only close the menu here.
             */

            closeAuroraMenu();

        });

    });


    /* =====================================================
       GLOBAL BACKGROUND PARALLAX
       Very subtle — only on devices that support it.
    ====================================================== */

    const backgroundImage =
        document.querySelector(".home-background-image");

    if (
        backgroundImage &&
        window.matchMedia("(hover: hover)").matches
    ) {

        let ticking = false;

        window.addEventListener("scroll", () => {

            if (ticking) return;

            window.requestAnimationFrame(() => {

                const scrollY = window.scrollY;

                backgroundImage.style.transform =
                    `translate3d(0, ${scrollY * 0.035}px, 0)`;

                ticking = false;

            });

            ticking = true;

        }, { passive: true });

    }


    /* =====================================================
       INITIAL STATE
    ====================================================== */

    if (menu) {
        menu.classList.remove("open");
        menu.setAttribute("aria-hidden", "true");
    }

    if (menuButton) {
        menuButton.setAttribute("aria-expanded", "false");
    }

});
