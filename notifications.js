/* =========================================================
   PROJECT AURORA — NOTIFICATIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const notificationCards =
    document.querySelectorAll(".notification-card");

  /*
    Mark unread notifications as read when opened.
    This is visual only for now.
  */

  notificationCards.forEach(card => {

    card.addEventListener("click", () => {

      if (card.classList.contains("unread")) {
        card.classList.remove("unread");
      }

    });

  });


  /*
    Prevent notification links from triggering
    the card click behaviour twice.
  */

  const notificationLinks =
    document.querySelectorAll(".notification-action");

  notificationLinks.forEach(link => {

    link.addEventListener("click", event => {
      event.stopPropagation();
    });

  });

});
