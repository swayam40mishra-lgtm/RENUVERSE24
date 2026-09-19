/* =========================================================
   PROJECT AURORA — NOTIFICATIONS.JS
   SIGNAL ARCHIVE / NOTIFICATION SYSTEM

   FEATURES
   ─────────────────────────────────────────────────────────
   • Persistent unread / read state
   • Signal counter
   • Click notification → destination
   • Internal + external destination handling
   • Keyboard accessibility
   • Read-state animation
   • Notification navigation dot sync
   • Locked signals remain inactive
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


  /* =======================================================
     CONFIGURATION
  ======================================================= */

  const STORAGE_KEY =
    "auroraReadNotifications";


  /* =======================================================
     DOM
  ======================================================= */

  const notificationCards =
    document.querySelectorAll(
      ".notification-card[data-notification-id]"
    );


  const signalCount =
    document.getElementById("signalCount");


  const navNotificationDot =
    document.querySelector(
      ".nav-notification-dot"
    );


  /* =======================================================
     LOCAL STORAGE HELPERS
  ======================================================= */

  function getReadNotifications() {

    try {

      const stored =
        localStorage.getItem(
          STORAGE_KEY
        );

      if (!stored) {
        return [];
      }

      const parsed =
        JSON.parse(stored);

      return Array.isArray(parsed)
        ? parsed
        : [];

    } catch (error) {

      console.warn(
        "Aurora notification storage unavailable.",
        error
      );

      return [];

    }

  }


  function saveReadNotifications(ids) {

    try {

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(ids)
      );

    } catch (error) {

      console.warn(
        "Aurora notification state could not be saved.",
        error
      );

    }

  }


  /* =======================================================
     INITIAL STATE
  ======================================================= */

  let readNotifications =
    getReadNotifications();


  /* =======================================================
     GET ACTIVE SIGNALS
     
     Locked/future notification cards are excluded.
  ======================================================= */

  function getActiveNotifications() {

    return Array.from(
      notificationCards
    ).filter(card => {

      return (
        !card.classList.contains(
          "notification-locked"
        )
      );

    });

  }


  /* =======================================================
     APPLY READ / UNREAD STATE
  ======================================================= */

  function applyNotificationState() {

    const activeNotifications =
      getActiveNotifications();


    activeNotifications.forEach(card => {

      const id =
        card.dataset.notificationId;

      if (!id) return;


      const isRead =
        readNotifications.includes(id);


      const status =
        card.querySelector(
          ".notification-status"
        );


      if (isRead) {

        card.classList.remove(
          "notification-unread"
        );

        card.classList.add(
          "notification-read"
        );


        if (status) {
          status.textContent = "READ";
        }

      } else {

        card.classList.add(
          "notification-unread"
        );

        card.classList.remove(
          "notification-read"
        );


        if (status) {
          status.textContent =
            "NEW SIGNAL";
        }

      }

    });


    updateSignalCounter();
    updateNotificationDot();

  }


  /* =======================================================
     SIGNAL COUNTER
  ======================================================= */

  function updateSignalCounter() {

    if (!signalCount) return;


    const activeNotifications =
      getActiveNotifications();


    const unreadCount =
      activeNotifications.filter(card => {

        const id =
          card.dataset.notificationId;

        return (
          id &&
          !readNotifications.includes(id)
        );

      }).length;


    const totalCount =
      activeNotifications.length;


    if (unreadCount > 0) {

      signalCount.textContent =
        `${String(totalCount).padStart(2, "0")} SIGNALS / ` +
        `${String(unreadCount).padStart(2, "0")} NEW`;

    } else {

      signalCount.textContent =
        `${String(totalCount).padStart(2, "0")} SIGNALS / ALL READ`;

    }

  }


  /* =======================================================
     NOTIFICATION NAVIGATION DOT
  ======================================================= */

  function updateNotificationDot() {

    if (!navNotificationDot) return;


    const activeNotifications =
      getActiveNotifications();


    const unreadExists =
      activeNotifications.some(card => {

        const id =
          card.dataset.notificationId;

        return (
          id &&
          !readNotifications.includes(id)
        );

      });


    navNotificationDot.style.display =
      unreadExists
        ? ""
        : "none";

  }


  /* =======================================================
     MARK AS READ
  ======================================================= */

  function markAsRead(card) {

    const id =
      card.dataset.notificationId;

    if (!id) return;


    if (
      !readNotifications.includes(id)
    ) {

      readNotifications.push(id);

      saveReadNotifications(
        readNotifications
      );

    }


    /* Visual state */

    card.classList.remove(
      "notification-unread"
    );

    card.classList.add(
      "notification-read"
    );


    const status =
      card.querySelector(
        ".notification-status"
      );


    if (status) {
      status.textContent = "READ";
    }


    updateSignalCounter();
    updateNotificationDot();

  }


  /* =======================================================
     DESTINATION HANDLER
  ======================================================= */

  function openDestination(card) {

    const destination =
      card.dataset.destination;


    if (!destination) {
      return;
    }


    /*
      External Aurora destinations:
      open separately.

      Internal HTML destinations:
      remain within the same tab.
    */

    const isExternal =
      /^https?:\/\//i.test(
        destination
      );


    if (isExternal) {

      window.open(
        destination,
        "_blank",
        "noopener,noreferrer"
      );

    } else {

      window.location.href =
        destination;

    }

  }


  /* =======================================================
     OPEN NOTIFICATION
  ======================================================= */

  function openNotification(card) {

    if (
      card.classList.contains(
        "notification-locked"
      )
    ) {

      return;

    }


    markAsRead(card);


    /*
      Small visual pause before navigation
      so the READ state is registered.
    */

    card.classList.add(
      "notification-opening"
    );


    setTimeout(() => {

      openDestination(card);

    }, 140);

  }


  /* =======================================================
     CLICK HANDLERS
  ======================================================= */

  getActiveNotifications()
    .forEach(card => {


      /*
        Only cards with a destination
        behave as interactive notifications.
      */

      if (!card.dataset.destination) {
        return;
      }


      card.setAttribute(
        "tabindex",
        "0"
      );


      card.setAttribute(
        "role",
        "button"
      );


      card.setAttribute(
        "aria-label",
        "Open Aurora notification"
      );


      card.addEventListener(
        "click",
        event => {

          /*
            Ignore clicks originating
            from an actual link/button if
            one is added later.
          */

          if (
            event.target.closest(
              "a, button"
            )
          ) {

            return;

          }


          openNotification(card);

        }
      );


      /* =================================================
         KEYBOARD
      ================================================== */

      card.addEventListener(
        "keydown",
        event => {

          if (
            event.key === "Enter" ||
            event.key === " "
          ) {

            event.preventDefault();

            openNotification(card);

          }

        }
      );

    });


  /* =======================================================
     HOVER / FOCUS STATE
  ======================================================= */

  getActiveNotifications()
    .forEach(card => {

      if (!card.dataset.destination) {
        return;
      }


      card.addEventListener(
        "mouseenter",
        () => {

          card.classList.add(
            "notification-hover"
          );

        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          card.classList.remove(
            "notification-hover"
          );

        }
      );


      card.addEventListener(
        "focus",
        () => {

          card.classList.add(
            "notification-focus"
          );

        }
      );


      card.addEventListener(
        "blur",
        () => {

          card.classList.remove(
            "notification-focus"
          );

        }
      );

    });


  /* =======================================================
     INITIALIZE
  ======================================================= */

  applyNotificationState();


  /* =======================================================
     EXPOSE OPTIONAL DEBUG STATE
     
     Useful later when we connect more
     Aurora systems.
  ======================================================= */

  window.AuroraNotifications = {

    markAsRead,

    getReadNotifications: () =>
      [...readNotifications],

    markAllAsRead: () => {

      getActiveNotifications()
        .forEach(card => {

          const id =
            card.dataset.notificationId;

          if (
            id &&
            !readNotifications.includes(id)
          ) {

            readNotifications.push(id);

          }

        });


      saveReadNotifications(
        readNotifications
      );


      applyNotificationState();

    },

    resetReadState: () => {

      readNotifications = [];

      saveReadNotifications([]);

      applyNotificationState();

    }

  };


});
