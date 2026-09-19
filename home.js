/* =========================================================
   PROJECT AURORA — HOME.JS
   Dynamic Aurora Headquarters System

   DAY 01  → 19 SEPTEMBER 2026
   DAY 02  → 20 SEPTEMBER 2026
   DAY 03  → 21 SEPTEMBER 2026 — AURORA ORACLE
   DAY 04  → 22 SEPTEMBER 2026 — BLACK AURORA STUDIOS
   DAY 05  → 23 SEPTEMBER 2026 — THE CHRONICLE
   DAY 06  → 24 SEPTEMBER 2026 — FINAL SIGNAL
   DAY 07  → 25 SEPTEMBER 2026 — HOME-COMING
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     AURORA CONFIGURATION
  ======================================================= */

  const AURORA_START = new Date("2026-09-19T00:00:00");

  const TIMELINE = [
    {
      day: 1,
      date: "19",
      title: "BLACK BOX"
    },
    {
      day: 2,
      date: "20",
      title: "THE ORIGIN"
    },
    {
      day: 3,
      date: "21",
      title: "AURORA ORACLE"
    },
    {
      day: 4,
      date: "22",
      title: "STUDIOS"
    },
    {
      day: 5,
      date: "23",
      title: "THE CHRONICLE"
    },
    {
      day: 6,
      date: "24",
      title: "FINAL SIGNAL"
    },
    {
      day: 7,
      date: "25",
      title: "HOME-COMING"
    }
  ];


  /* =======================================================
     DATE HELPERS
  ======================================================= */

  function getToday() {

    const now = new Date();

    return new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

  }


  function getDayDifference(startDate, currentDate) {

    const startUTC = Date.UTC(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    );

    const currentUTC = Date.UTC(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );

    return Math.floor(
      (currentUTC - startUTC) / 86400000
    );

  }


  const today = getToday();

  const elapsedDays =
    getDayDifference(AURORA_START, today);


  const currentDayNumber =
    Math.max(1, elapsedDays + 1);


  /* =======================================================
     CURRENT DAY INFORMATION
  ======================================================= */

  const currentTimeline =
    TIMELINE.find(item =>
      item.day === currentDayNumber
    ) || TIMELINE[0];


  /* =======================================================
     JOINED STATUS
  ======================================================= */

  const joinedStatus =
    document.getElementById("joinedStatus");

  if (joinedStatus) {

    if (elapsedDays <= 0) {

      joinedStatus.textContent = "TODAY";

    } else if (elapsedDays === 1) {

      joinedStatus.textContent = "1 DAY AGO";

    } else {

      joinedStatus.textContent =
        `${elapsedDays} DAYS AGO`;

    }

  }


  /* =======================================================
     DASHBOARD — CURRENT DAY
     
     Current HTML doesn't have an ID here,
     so we target the dashboard item by its label.
  ======================================================= */

  const dashboardItems =
    document.querySelectorAll(".dashboard-item");


  dashboardItems.forEach(item => {

    const label =
      item.querySelector(".dashboard-label");

    const value =
      item.querySelector("strong");

    if (!label || !value) return;


    const labelText =
      label.textContent.trim().toUpperCase();


    /* CURRENT DAY */

    if (labelText === "CURRENT DAY") {

      value.textContent =
        `DAY ${String(currentDayNumber).padStart(2, "0")}`;

    }


    /* TODAY IN AURORA */

    if (labelText === "TODAY IN AURORA") {

      value.textContent =
        currentTimeline.title;

    }


    /* ARCHIVE STATUS */

    if (labelText === "ARCHIVE STATUS") {

      const activeDays =
        Math.min(
          Math.max(currentDayNumber, 1),
          8
        );

      value.textContent =
        `${String(activeDays).padStart(2, "0")} / 08 DAYS ACTIVE`;

    }

  });


  /* =======================================================
     HERO — SYSTEM DATE
     
     Keeps DAY number dynamic while preserving
     the existing visual structure.
  ======================================================= */

  const statusDate =
    document.querySelector(".status-date");

  if (statusDate) {

    const dateText =
      today.toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "long",
          year: "numeric"
        }
      ).toUpperCase();


    statusDate.innerHTML =
      `${dateText} <span>•</span> DAY ${String(currentDayNumber).padStart(2, "0")}`;

  }


  /* =======================================================
     HOME ENDING
  ======================================================= */

  const endingText =
    document.querySelector(".home-ending span");

  if (endingText) {

    endingText.textContent =
      `PROJECT AURORA / DAY ${String(currentDayNumber).padStart(2, "0")}`;

  }


  /* =======================================================
     TIMELINE PREVIEW
  ======================================================= */

  const timelineDays =
    document.querySelectorAll(".timeline-day");


  timelineDays.forEach((element, index) => {

    const timelineData =
      TIMELINE[index];

    if (!timelineData) return;


    const number =
      element.querySelector(".timeline-day-number");

    const date =
      element.querySelector(".timeline-day-date");

    const title =
      element.querySelector(".timeline-day-title");


    if (number) {

      number.textContent =
        String(timelineData.day).padStart(2, "0");

    }


    if (date) {

      date.textContent =
        timelineData.date;

    }


    if (title) {

      title.textContent =
        timelineData.title;

    }


    /* Remove old states */

    element.classList.remove(
      "active",
      "locked",
      "available"
    );


    /* Already unlocked */

    if (
      timelineData.day <
      currentDayNumber
    ) {

      element.classList.add(
        "available"
      );

    }


    /* Current day */

    else if (
      timelineData.day ===
      currentDayNumber
    ) {

      element.classList.add(
        "active"
      );

    }


    /* Future */

    else {

      element.classList.add(
        "locked"
      );

    }

  });


  /* =======================================================
     COUNTDOWN FORMAT
  ======================================================= */

  function formatCountdown(milliseconds) {

    if (milliseconds <= 0) {
      return "ACCESS AVAILABLE";
    }


    const totalSeconds =
      Math.floor(milliseconds / 1000);


    const days =
      Math.floor(
        totalSeconds / 86400
      );


    const hours =
      Math.floor(
        (totalSeconds % 86400) / 3600
      );


    const minutes =
      Math.floor(
        (totalSeconds % 3600) / 60
      );


    const seconds =
      totalSeconds % 60;


    return [
      String(days).padStart(2, "0"),
      String(hours).padStart(2, "0"),
      String(minutes).padStart(2, "0"),
      String(seconds).padStart(2, "0")
    ].join(" : ");

  }


  /* =======================================================
     UNLOCK MODULE
  ======================================================= */

  function unlockModule(countdown) {

    const lock =
      countdown.closest(".module-lock");

    const card =
      countdown.closest(
        ".home-card, .home-feature-card"
      );


    if (lock) {

      lock.classList.add(
        "is-unlocked"
      );

    }


    countdown.textContent =
      "ACCESS AVAILABLE";


    if (card) {

      card.classList.add(
        "module-unlocked"
      );

    }


    const action =
      card?.querySelector(
        ".aurora-action"
      );


    if (action) {

      action.classList.add(
        "is-enabled"
      );

      action.removeAttribute(
        "aria-disabled"
      );

    }

  }


  /* =======================================================
     MODULE COUNTDOWNS
  ======================================================= */

  const countdowns =
    document.querySelectorAll(
      ".module-countdown[data-unlock]"
    );


  function updateCountdowns() {

    const now =
      new Date();


    countdowns.forEach(countdown => {

      const unlockDate =
        new Date(
          countdown.dataset.unlock
        );


      if (
        Number.isNaN(
          unlockDate.getTime()
        )
      ) {

        countdown.textContent =
          "TIME UNAVAILABLE";

        return;

      }


      const remaining =
        unlockDate.getTime() -
        now.getTime();


      if (remaining <= 0) {

        unlockModule(
          countdown
        );

      } else {

        countdown.textContent =
          formatCountdown(
            remaining
          );

      }

    });

  }


  updateCountdowns();


  const countdownInterval =
    setInterval(
      updateCountdowns,
      1000
    );


  /* =======================================================
     LOCKED MODULE CLICK PROTECTION
  ======================================================= */

  document.querySelectorAll(
    ".module-lock"
  ).forEach(lock => {

    const card =
      lock.closest(
        ".home-card, .home-feature-card"
      );


    if (!card) return;


    const action =
      card.querySelector(
        ".aurora-action"
      );


    if (!action) return;


    action.addEventListener(
      "click",
      event => {

        if (
          !card.classList.contains(
            "module-unlocked"
          )
        ) {

          event.preventDefault();

          card.classList.add(
            "access-denied"
          );


          setTimeout(() => {

            card.classList.remove(
              "access-denied"
            );

          }, 500);

        }

      }
    );

  });


  /* =======================================================
     STORE CURRENT AURORA STATE
  ======================================================= */

  document.body.dataset.auroraDay =
    currentDayNumber;


  document.body.dataset.auroraDate =
    today.toISOString().slice(0, 10);


  /* =======================================================
     CLEANUP
  ======================================================= */

  window.addEventListener(
    "beforeunload",
    () => {

      clearInterval(
        countdownInterval
      );

    }
  );

});
