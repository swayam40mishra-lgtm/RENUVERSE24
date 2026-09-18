
/* =========================================================
   PROJECT AURORA — PROFILE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const portrait = document.querySelector(".profile-portrait");

  /* -----------------------------------------
     Portrait loading state
  ----------------------------------------- */

  if (portrait) {
    portrait.addEventListener("load", () => {
      portrait.classList.add("loaded");
    });

    portrait.addEventListener("error", () => {
      portrait.classList.add("image-missing");
    });
  }


  /* -----------------------------------------
     Subtle reveal animation
  ----------------------------------------- */

  const revealItems = document.querySelectorAll(
    ".profile-hero, " +
    ".profile-statement, " +
    ".profile-data, " +
    ".profile-connections, " +
    ".profile-quote, " +
    ".profile-end"
  );

  revealItems.forEach((item, index) => {

    item.style.opacity = "0";
    item.style.transform = "translateY(14px)";
    item.style.transition =
      "opacity 700ms ease, transform 700ms ease";

    setTimeout(() => {
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    }, 100 + index * 90);

  });


  /* -----------------------------------------
     Profile navigation cards
  ----------------------------------------- */

  const profileLinks =
    document.querySelectorAll(".profile-link-card");

  profileLinks.forEach(link => {

    link.addEventListener("keydown", event => {

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        link.click();
      }

    });

  });

});
