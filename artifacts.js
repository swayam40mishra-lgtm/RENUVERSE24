/* =========================================================
   PROJECT AURORA
   ARTIFACT ARCHIVE — INTERACTION + RELEASE SYSTEM
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------------------------------
     AURORA CLOCK
     ------------------------------------------------------- */

  const AURORA_START = new Date("2026-09-19T00:00:00");

  /*
    Artifact release schedule.

    Artifact 001 is available from Day 01.
    Artifact 002 is intentionally kept classified because
    its actual release date has not been established yet.
  */

  const ARTIFACTS = [
    {
      id: "001",
      day: 1,
      date: "19 SEPTEMBER 2026",
      title: "THE AURORA BLACK BOX",
      subtitle: "THE FIRST SIGNAL",
      status: "DELIVERED",
      release: "2026-09-19T00:00:00",
      available: true
    },

    {
      id: "002",
      day: 2,
      date: null,
      title: "████████",
      subtitle: "CLASSIFIED",
      status: "RESTRICTED",
      release: null,
      available: false
    }
  ];


  /* -------------------------------------------------------
     ELEMENTS
     ------------------------------------------------------- */

  const artifactCards =
    document.querySelectorAll(".artifact-card");

  const dossier =
    document.querySelector(".artifact-dossier");

  const openButtons =
    document.querySelectorAll(".artifact-open-button");

  const archiveStatus =
    document.querySelector("#artifactArchiveStatus");

  const statusCount =
    document.querySelector("#artifactArchiveCount");

  const nextEvent =
    document.querySelector(".artifact-next-event");


  /* -------------------------------------------------------
     CURRENT AURORA DAY
     ------------------------------------------------------- */

  function getAuroraDay() {

    const now = new Date();

    const diff =
      now.getTime() -
      AURORA_START.getTime();

    const day =
      Math.floor(
        diff /
        (1000 * 60 * 60 * 24)
      ) + 1;

    return Math.max(1, day);
  }


  const currentDay =
    getAuroraDay();

  document.body.dataset.auroraDay =
    String(currentDay);


  /* -------------------------------------------------------
     RELEASE CHECK
     ------------------------------------------------------- */

  function isReleased(artifact) {

    if (!artifact.release) {
      return false;
    }

    return (
      new Date() >=
      new Date(artifact.release)
    );
  }


  /* -------------------------------------------------------
     AVAILABLE ARTIFACTS
     ------------------------------------------------------- */

  function getReleasedArtifacts() {

    return ARTIFACTS.filter(
      artifact => isReleased(artifact)
    );

  }


  const releasedArtifacts =
    getReleasedArtifacts();


  /* -------------------------------------------------------
     ARCHIVE STATUS
     ------------------------------------------------------- */

  function updateArchiveStatus() {

    const count =
      releasedArtifacts.length;

    const formatted =
      String(count).padStart(2, "0");

    if (archiveStatus) {
      archiveStatus.textContent =
        `${formatted} / 07 ARTIFACT EVENTS RECORDED`;
    }

    if (statusCount) {
      statusCount.textContent =
        `${formatted} / 07`;
    }
  }

  updateArchiveStatus();


  /* -------------------------------------------------------
     CARD STATE
     ------------------------------------------------------- */

  function updateArtifactCards() {

    artifactCards.forEach(card => {

      const id =
        card.dataset.artifactId;

      if (!id) return;

      const artifact =
        ARTIFACTS.find(
          item => item.id === id
        );

      if (!artifact) return;


      /* -----------------------------------------------
         RELEASED
         ----------------------------------------------- */

      if (isReleased(artifact)) {

        card.classList.remove(
          "artifact-card-locked"
        );

        card.classList.add(
          "artifact-card-released"
        );

        card.dataset.state =
          "released";

        const status =
          card.querySelector(
            ".artifact-card-status"
          );

        if (status) {
          status.textContent =
            artifact.status;
        }

      }


      /* -----------------------------------------------
         LOCKED
         ----------------------------------------------- */

      else {

        card.classList.add(
          "artifact-card-locked"
        );

        card.classList.remove(
          "artifact-card-released"
        );

        card.dataset.state =
          "locked";

        const status =
          card.querySelector(
            ".artifact-card-status"
          );

        if (status) {
          status.textContent =
            "ACCESS DENIED";
        }

      }

    });

  }

  updateArtifactCards();


  /* -------------------------------------------------------
     DOSSIER OPEN / CLOSE
     ------------------------------------------------------- */

  function openDossier() {

    if (!dossier) return;

    dossier.classList.add(
      "is-open"
    );

    dossier.setAttribute(
      "aria-hidden",
      "false"
    );

    requestAnimationFrame(() => {

      dossier.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  }


  function closeDossier() {

    if (!dossier) return;

    dossier.classList.remove(
      "is-open"
    );

    dossier.setAttribute(
      "aria-hidden",
      "true"
    );

  }


  /* -------------------------------------------------------
     OPEN ARTIFACT BUTTONS
     ------------------------------------------------------- */

  openButtons.forEach(button => {

    button.addEventListener(
      "click",
      event => {

        event.preventDefault();

        const card =
          button.closest(
            ".artifact-card"
          );

        if (!card) return;


        /* Locked artifact */

        if (
          card.classList.contains(
            "artifact-card-locked"
          )
        ) {

          triggerAccessDenied(
            card
          );

          return;
        }


        /* Released artifact */

        openDossier();

      }
    );

  });


  /* -------------------------------------------------------
     ACCESS DENIED
     ------------------------------------------------------- */

  function triggerAccessDenied(element) {

    if (!element) return;

    element.classList.remove(
      "access-denied"
    );

    void element.offsetWidth;

    element.classList.add(
      "access-denied"
    );

    setTimeout(() => {

      element.classList.remove(
        "access-denied"
      );

    }, 600);

  }


  /* -------------------------------------------------------
     KEYBOARD ACCESS
     ------------------------------------------------------- */

  artifactCards.forEach(card => {

    if (
      card.classList.contains(
        "artifact-card-locked"
      )
    ) {

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
        "Classified artifact. Access denied."
      );


      card.addEventListener(
        "keydown",
        event => {

          if (
            event.key === "Enter" ||
            event.key === " "
          ) {

            event.preventDefault();

            triggerAccessDenied(
              card
            );

          }

        }
      );

    }

  });


  /* -------------------------------------------------------
     DOSSIER ESCAPE
     ------------------------------------------------------- */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape" &&
        dossier &&
        dossier.classList.contains(
          "is-open"
        )
      ) {

        closeDossier();

      }

    }
  );


  /* -------------------------------------------------------
     NEXT EVENT
     ------------------------------------------------------- */

  function updateNextEvent() {

    if (!nextEvent) return;

    /*
      The artifact brief establishes the next archive
      event as 20 September / THE ORIGIN.
    */

    if (currentDay >= 2) {

      const title =
        nextEvent.querySelector(
          "b"
        );

      const strong =
        nextEvent.querySelector(
          "strong"
        );

      const small =
        nextEvent.querySelector(
          "small"
        );

      if (strong) {
        strong.textContent =
          "20 SEPTEMBER";
      }

      if (title) {
        title.textContent =
          "THE ORIGIN";
      }

      if (small) {
        small.textContent =
          "Digital Headquarters // First Briefing // KAIROS Contact";
      }

    }

  }

  updateNextEvent();


  /* -------------------------------------------------------
     IMAGE FALLBACK
     ------------------------------------------------------- */

  document
    .querySelectorAll(
      ".artifact-card img, .artifact-field-image img"
    )
    .forEach(image => {

      image.addEventListener(
        "error",
        () => {

          image.style.display =
            "none";

          const parent =
            image.parentElement;

          if (parent) {
            parent.classList.add(
              "image-missing"
            );
          }

        }
      );

    });


  /* -------------------------------------------------------
     FIELD IMAGE — SIMPLE SCAN EFFECT
     ------------------------------------------------------- */

  const fieldImage =
    document.querySelector(
      ".artifact-field-image-frame"
    );

  if (fieldImage) {

    fieldImage.addEventListener(
      "mouseenter",
      () => {
        fieldImage.classList.add(
          "is-scanning"
        );
      }
    );

    fieldImage.addEventListener(
      "mouseleave",
      () => {
        fieldImage.classList.remove(
          "is-scanning"
        );
      }
    );

  }


  /* -------------------------------------------------------
     ARTIFACT API
     ------------------------------------------------------- */

  window.AuroraArtifacts = {

    getCurrentDay: () =>
      getAuroraDay(),

    getArtifacts: () =>
      [...ARTIFACTS],

    getReleasedArtifacts: () =>
      getReleasedArtifacts(),

    isReleased: artifact =>
      isReleased(artifact),

    openDossier: () =>
      openDossier(),

    closeDossier: () =>
      closeDossier()

  };


  /* -------------------------------------------------------
     INITIAL STATE
     ------------------------------------------------------- */

  if (dossier) {

    dossier.setAttribute(
      "aria-hidden",
      dossier.classList.contains(
        "is-open"
      )
        ? "false"
        : "true"
    );

  }

});
