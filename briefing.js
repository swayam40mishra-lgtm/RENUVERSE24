document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
     PROJECT AURORA
     BRIEFING ROOM ENGINE
     ===================================================== */

  const AURORA_START = new Date("2026-09-19T00:00:00");

  const BRIEFINGS = [
    {
      day: 1,
      date: "19 SEPTEMBER 2026",
      title: "THE FIRST SIGNAL",
      status: "AVAILABLE",
      pdf: "assets/briefings/briefing-001.pdf"
    },
    {
      day: 2,
      date: "20 SEPTEMBER 2026",
      title: "THE ORIGIN",
      status: "LOCKED"
    },
    {
      day: 3,
      date: "21 SEPTEMBER 2026",
      title: "AURORA ORACLE",
      status: "LOCKED"
    },
    {
      day: 4,
      date: "22 SEPTEMBER 2026",
      title: "BLACK AURORA STUDIOS",
      status: "LOCKED"
    },
    {
      day: 5,
      date: "23 SEPTEMBER 2026",
      title: "THE CHRONICLE",
      status: "LOCKED"
    },
    {
      day: 6,
      date: "24 SEPTEMBER 2026",
      title: "FINAL SIGNAL",
      status: "LOCKED"
    },
    {
      day: 7,
      date: "25 SEPTEMBER 2026",
      title: "HOME-COMING",
      status: "LOCKED"
    },
    {
      day: 8,
      date: "26 SEPTEMBER 2026",
      title: "UNDISCLOSED",
      status: "SEALED"
    }
  ];


  /* =====================================================
     HELPERS
     ===================================================== */

  const getAuroraDay = () => {
    const now = new Date();

    const diff =
      now.getTime() - AURORA_START.getTime();

    const day =
      Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;

    return Math.max(1, Math.min(day, BRIEFINGS.length));
  };


  const isReleased = (briefing) => {
    const releaseDate =
      new Date(AURORA_START);

    releaseDate.setDate(
      AURORA_START.getDate() + briefing.day - 1
    );

    return new Date() >= releaseDate;
  };


  const formatCurrentDate = () => {
    const now = new Date();

    return now.toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "long",
        year: "numeric"
      }
    ).toUpperCase();
  };


  /* =====================================================
     CURRENT AURORA DAY
     ===================================================== */

  const currentDay = getAuroraDay();

  document.body.dataset.auroraDay =
    String(currentDay);


  /* =====================================================
     ARCHIVE STATUS
     ===================================================== */

  const releasedBriefings =
    BRIEFINGS.filter(isReleased);

  const releasedCount =
    Math.min(
      releasedBriefings.length,
      BRIEFINGS.length
    );

  const archiveStatus =
    document.getElementById(
      "briefingArchiveStatus"
    );

  const archiveCount =
    document.getElementById(
      "archiveCount"
    );

  if (archiveStatus) {
    archiveStatus.textContent =
      `${String(releasedCount).padStart(2, "0")} / 08 ACTIVE`;
  }

  if (archiveCount) {
    archiveCount.textContent =
      `${String(releasedCount).padStart(2, "0")} / 08`;
  }


  /* =====================================================
     CURRENT TRANSMISSION
     ===================================================== */

  const currentBriefing =
    BRIEFINGS.find(
      briefing => briefing.day === currentDay
    ) || BRIEFINGS[0];

  const feature =
    document.querySelector(
      ".briefing-feature"
    );

  const currentState =
    document.getElementById(
      "currentBriefingState"
    );

  const currentAction =
    document.getElementById(
      "currentBriefingAction"
    );


  if (feature && currentBriefing) {

    feature.dataset.briefingDay =
      String(currentBriefing.day);

    const date =
      feature.querySelector(
        ".briefing-date"
      );

    const title =
      feature.querySelector(
        ".briefing-feature-copy h2"
      );

    const paragraph =
      feature.querySelector(
        ".briefing-feature-copy p"
      );

    if (date) {
      date.textContent =
        currentBriefing.date;
    }

    if (title) {
      title.textContent =
        currentBriefing.title;
    }

    if (currentBriefing.day > 1) {

      if (paragraph) {
        paragraph.textContent =
          "Today's classified transmission has entered the Aurora archive.";
      }

    }

    if (isReleased(currentBriefing)) {

      feature.classList.add(
        "is-unlocked"
      );

      if (currentState) {
        currentState.textContent =
          currentBriefing.status === "AVAILABLE"
            ? "PDF AVAILABLE"
            : "ARCHIVED";
      }

      if (currentAction) {

        if (currentBriefing.pdf) {

          currentAction.href =
            currentBriefing.pdf;

          currentAction.target =
            "_blank";

          currentAction.rel =
            "noopener";

          currentAction.classList.remove(
            "is-disabled"
          );

        } else {

          currentAction.removeAttribute(
            "href"
          );

          currentAction.classList.add(
            "is-disabled"
          );

          currentAction.querySelector("span")
            ?.replaceChildren(
              document.createTextNode(
                "BRIEFING PENDING"
              )
            );
        }

      }

    } else {

      if (currentState) {
        currentState.textContent =
          "TRANSMISSION LOCKED";
      }

      if (currentAction) {
        currentAction.removeAttribute(
          "href"
        );

        currentAction.classList.add(
          "is-disabled"
        );

        currentAction.querySelector("span")
          ?.replaceChildren(
            document.createTextNode(
              "LOCKED"
            )
          );
      }
    }
  }


  /* =====================================================
     ARCHIVE CARDS
     ===================================================== */

  const cards =
    document.querySelectorAll(
      ".briefing-card"
    );


  cards.forEach(card => {

    const day =
      Number(
        card.dataset.briefingDay
      );

    const briefing =
      BRIEFINGS.find(
        item => item.day === day
      );

    if (!briefing) return;


    const status =
      card.querySelector(
        ".briefing-card-status"
      );

    const arrow =
      card.querySelector(
        ".briefing-card-arrow"
      );

    const lock =
      card.querySelector(
        ".briefing-card-lock"
      );


    if (isReleased(briefing)) {

      card.classList.remove(
        "briefing-card-locked"
      );

      card.classList.add(
        "is-unlocked"
      );


      if (status) {
        status.textContent =
          briefing.pdf
            ? "AVAILABLE"
            : "ARCHIVED";
      }


      if (briefing.pdf) {

        if (!arrow) {

          const newArrow =
            document.createElement("a");

          newArrow.className =
            "briefing-card-arrow";

          newArrow.href =
            briefing.pdf;

          newArrow.target =
            "_blank";

          newArrow.rel =
            "noopener";

          newArrow.setAttribute(
            "aria-label",
            `Open Briefing ${String(day).padStart(3, "0")}`
          );

          newArrow.textContent = "→";

          card.appendChild(newArrow);

        } else {

          arrow.href =
            briefing.pdf;

          arrow.target =
            "_blank";

          arrow.rel =
            "noopener";

          arrow.style.display =
            "grid";
        }

        if (lock) {
          lock.style.display =
            "none";
        }

      } else {

        if (lock) {
          lock.textContent = "✓";
          lock.style.display = "grid";
        }

        if (arrow) {
          arrow.style.display = "none";
        }

      }

    } else {

      card.classList.add(
        "briefing-card-locked"
      );

      card.classList.remove(
        "is-unlocked"
      );


      if (status) {
        status.textContent =
          day === 8
            ? "SEALED"
            : "LOCKED";
      }


      if (arrow) {
        arrow.style.display =
          "none";
      }


      if (lock) {
        lock.style.display =
          "grid";
      }
    }
  });


  /* =====================================================
     LOCKED CARD INTERACTION
     ===================================================== */

  document
    .querySelectorAll(
      ".briefing-card-locked"
    )
    .forEach(card => {

      card.setAttribute(
        "tabindex",
        "0"
      );

      card.setAttribute(
        "role",
        "button"
      );

      card.addEventListener(
        "click",
        () => {

          card.classList.remove(
            "access-denied"
          );

          void card.offsetWidth;

          card.classList.add(
            "access-denied"
          );

        }
      );


      card.addEventListener(
        "keydown",
        event => {

          if (
            event.key === "Enter" ||
            event.key === " "
          ) {

            event.preventDefault();

            card.click();
          }
        }
      );
    });


  /* =====================================================
     DISABLED CURRENT ACTION
     ===================================================== */

  if (currentAction) {

    currentAction.addEventListener(
      "click",
      event => {

        if (
          currentAction.classList.contains(
            "is-disabled"
          )
        ) {

          event.preventDefault();

          currentAction.classList.remove(
            "access-denied"
          );

          void currentAction.offsetWidth;

          currentAction.classList.add(
            "access-denied"
          );
        }
      }
    );
  }


  /* =====================================================
     LIVE DAY DATA
     ===================================================== */

  const todayElements =
    document.querySelectorAll(
      "[data-aurora-date]"
    );

  todayElements.forEach(
    element => {
      element.textContent =
        formatCurrentDate();
    }
  );


  /* =====================================================
     CONSOLE / DEBUG INFORMATION
     ===================================================== */

  window.AuroraBriefing = {

    getCurrentDay: () =>
      getAuroraDay(),

    getBriefings: () =>
      [...BRIEFINGS],

    getReleasedBriefings: () =>
      BRIEFINGS.filter(isReleased),

    currentBriefing
  };

});
