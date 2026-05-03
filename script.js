// ==========================
// ELEMENTS
// ==========================
const screens = {
  s1: document.getElementById("screen1"),
  s2: document.getElementById("screen2"),
  s3: document.getElementById("screen3")
};

const el = {
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

// ==========================
// UTILITIES
// ==========================

// delay
const wait = (ms) => new Promise(r => setTimeout(r, ms));

// show element
const show = (e) => e && e.classList.add("show");

// hide (for future control if needed)
const hide = (e) => e && e.classList.remove("show");

// switch screens
const switchScreen = async (from, to) => {
  from.classList.remove("active");
  await wait(400); // small fade gap
  to.classList.add("active");
};

// user skip control
let skip = false;
document.body.addEventListener("click", () => {
  skip = true;
});

// smart wait (can skip)
const smartWait = async (time) => {
  let step = 100;
  for (let t = 0; t < time; t += step) {
    if (skip) break;
    await wait(step);
  }
  skip = false;
};

// ==========================
// MAIN FLOW (SCENE TIMELINE)
// ==========================

const run = async () => {

  // 🎬 SCENE 1 — ENTRY SILENCE
  await smartWait(2000); // pause before anything

  show(el.t1); // "Received parcel?"
  await smartWait(3500); // let it sit

  show(el.t2); // "Hope you are doing well"
  await smartWait(5000); // emotional gap

  // 🎬 TRANSITION
  await switchScreen(screens.s1, screens.s2);

  // 🎬 SCENE 2 — MESSAGE
  await smartWait(2500);
  show(el.t3);

  // 🎵 audio start softly
  if (el.audio) {
    el.audio.volume = 0.4;
    el.audio.play().catch(() => {});
  }

  await smartWait(4000);

  // 🎬 LYRICS (very slow, breathing space)
  for (let line of el.lyrics) {
    show(line);
    await smartWait(4200); // 👈 very slow (this is key)
  }

  await smartWait(6000);

  // 🎬 FINAL TRANSITION
  await switchScreen(screens.s2, screens.s3);

  await smartWait(3000);

  show(el.finalText);

};

// ==========================
// BUTTON
// ==========================
el.btn.onclick = () => {
  window.location.href = "https://wa.me/916394400744";
};

// ==========================
// START
// ==========================
window.onload = run;
