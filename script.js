const screens = {
  s1: document.getElementById("screen1"),
  s2: document.getElementById("screen2"),
  s3: document.getElementById("screen3")
};

const elements = {
  t1: document.getElementById("t1"),
  t2: document.getElementById("t2"),
  t3: document.getElementById("t3"),
  finalText: document.getElementById("finalText"),
  lyrics: [
    document.getElementById("l1"),
    document.getElementById("l2"),
    document.getElementById("l3"),
    document.getElementById("l4")
  ],
  btn: document.getElementById("btn"),
  audio: document.getElementById("player")
};

/* -----------------------------
   Utility Functions
----------------------------- */

// delay helper (clean async timing)
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// show animation
const reveal = (el) => {
  if (el) el.classList.add("show");
};

// switch screens smoothly
const switchScreen = (from, to) => {
  from.classList.remove("active");
  to.classList.add("active");
};

/* -----------------------------
   Flow Controller (MAIN LOGIC)
----------------------------- */

const runExperience = async () => {

  /* -------- Screen 1 -------- */
  await wait(500);
  reveal(elements.t1);

  await wait(1000);
  reveal(elements.t2);

  await wait(2000);

  /* -------- Screen 2 -------- */
  switchScreen(screens.s1, screens.s2);

  await wait(500);
  reveal(elements.t3);

  // try autoplay (may fail due to browser rules)
  if (elements.audio) {
    elements.audio.volume = 0.7;
    elements.audio.play().catch(() => {
      console.log("Autoplay blocked (normal)");
    });
  }

  // lyrics reveal (clean loop)
  for (let i = 0; i < elements.lyrics.length; i++) {
    await wait(1200);
    reveal(elements.lyrics[i]);
  }

  await wait(2000);

  /* -------- Screen 3 -------- */
  switchScreen(screens.s2, screens.s3);

  await wait(600);
  reveal(elements.finalText);
};

/* -----------------------------
   Button Action
----------------------------- */

elements.btn.addEventListener("click", () => {
  window.location.href = "https://wa.me/916394400744";
});

/* -----------------------------
   Start Experience
----------------------------- */

window.addEventListener("load", () => {
  runExperience();
});
