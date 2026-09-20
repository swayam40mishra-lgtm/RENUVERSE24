document.addEventListener("DOMContentLoaded", () => {

  const AURORA_START = new Date("2026-09-19T00:00:00");

  const CHAPTERS = [
    {
      day: 1,
      date: "2026-09-19",
      title: "THE BLACK BOX"
    },
    {
      day: 2,
      date: "2026-09-20",
      title: "THE ORIGIN"
    },
    {
      day: 3,
      date: "2026-09-21",
      title: "THE AURORA ORACLE"
    },
    {
      day: 4,
      date: "2026-09-22",
      title: "BLACK AURORA STUDIOS"
    },
    {
      day: 5,
      date: "2026-09-23",
      title: "THE AURORA CHRONICLES"
    },
    {
      day: 6,
      date: "2026-09-24",
      title: "THE FINAL SIGNAL"
    },
    {
      day: 7,
      date: "2026-09-25",
      title: "THE AURORA HOMECOMING"
    }
  ];


  function getCurrentDay() {

    const now = new Date();

    const diff =
      now.getTime() -
      AURORA_START.getTime();

    const day =
      Math.floor(
        diff / (1000 * 60 * 60 * 24)
      ) + 1;

    return Math.max(
      1,
      Math.min(day, 7)
    );
  }


  const currentDay = getCurrentDay();


  document.body.dataset.auroraDay =
    String(currentDay);


  /*
   * UPDATE CHAPTER STATES
   */

  document
    .querySelectorAll(".timeline-chapter")
    .forEach(chapter => {

      const day =
        Number(chapter.dataset.day);

      const release =
        new Date(
          `${chapter.dataset.release}T00:00:00`
        );

      const now =
        new Date();

      const isReleased =
        now >= release;


      chapter.classList.remove(
        "chapter-completed",
        "chapter-active",
        "chapter-locked"
      );


      if (!isReleased) {

        chapter.classList.add(
          "chapter-locked"
        );

        return;
      }


      if (day < currentDay) {

        chapter.classList.add(
          "chapter-completed"
        );

        const status =
          chapter.querySelector(
            ".timeline-chapter-meta span:last-child"
          );

        if (status) {
          status.textContent =
            "COMPLETED";
        }

        const dot =
          chapter.querySelector(
            ".timeline-dot"
          );

        if (dot) {
          dot.textContent = "✓";
        }

      } else if (day === currentDay) {

        chapter.classList.add(
          "chapter-active"
        );

        const status =
          chapter.querySelector(
            ".timeline-chapter-meta span:last-child"
          );

        if (status) {
          status.textContent =
            "ACTIVE";
        }

        const dot =
          chapter.querySelector(
            ".timeline-dot"
          );

        if (dot) {
          dot.textContent = "●";
        }

      }

    });


  /*
   * HEADER STATUS
   */

  const currentStatus =
    document.getElementById(
      "timelineCurrentStatus"
    );

  const progress =
    document.getElementById(
      "timelineProgress"
    );


  if (currentStatus) {

    currentStatus.textContent =
      `DAY ${String(currentDay).padStart(2, "0")} // ACTIVE`;

  }


  if (progress) {

    progress.textContent =
      `${String(currentDay).padStart(2, "0")} / 07`;

  }


  /*
   * FUTURE CHAPTER PROTECTION
   *
   * Future chapters don't expose content.
   */

  document
    .querySelectorAll(".chapter-locked")
    .forEach(chapter => {

      chapter.setAttribute(
        "aria-disabled",
        "true"
      );

      chapter.addEventListener(
        "click",
        () => {

          chapter.classList.remove(
            "access-denied"
          );

          void chapter.offsetWidth;

          chapter.classList.add(
            "access-denied"
          );

        }
      );

    });


  /*
   * DYNAMIC END MESSAGE
   */

  const nextMessage =
    document.querySelector(
      ".timeline-next"
    );

  if (nextMessage) {

    if (currentDay >= 7) {

      nextMessage.textContent =
        "THE AURORA WEEK HAS REACHED ITS FINAL CHAPTER.";

    } else {

      const next =
        CHAPTERS[currentDay];

      if (next) {

        nextMessage.textContent =
          `NEXT CHAPTER: ${String(next.day).padStart(2, "0")} — ${next.title}`;

      }

    }

  }


  /*
   * PUBLIC API
   */

  window.AuroraTimeline = {

    currentDay,

    chapters: [...CHAPTERS],

    getCurrentDay() {
      return getCurrentDay();
    }

  };

});
