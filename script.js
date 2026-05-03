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
const wait = (ms) => new Promise(r => setTimeout(r, ms));

const show = (e) => e && e.classList.add("show");

const switchScreen = async (from, to) => {
  from.classList.remove("active");
  await wait(400);
  to.classList.add("active");
};

// ==========================
// SMART WAIT (skip support)
// ==========================
let skip = false;

document.body.addEventListener("click", () => {
  skip = true;
  startAudio(); // unlock audio on first tap
});

const smartWait = async (time) => {
  let step = 100;
  for (let t = 0; t < time; t += step) {
    if (skip) break;
    await wait(step);
  }
  skip = false;
};

// ==========================
// AUDIO CONTROL (IMPORTANT)
// ==========================
let audioStarted = false;

const startAudio = async () => {
  if (!el.audio || audioStarted) return;

  try {
    el.audio.volume = 0;
    await el.audio.play();

    // smooth fade-in
    let vol = 0;
    const fade = setInterval(() => {
      if (vol >= 0.5) {
        clearInterval(fade);
      } else {
        vol += 0.02;
        el.audio.volume = vol;
      }
    }, 200);

    audioStarted = true;

  } catch {
    // autoplay blocked (normal)
  }
};

// ==========================
// MAIN FLOW (CINEMATIC)
// ==========================
const run = async () => {

  // 🎬 SCENE 1
  await smartWait(2000);

  show(el.t1);
  await smartWait(3500);

  show(el.t2);
  await smartWait(5000);

  // 🎬 TRANSITION
  await switchScreen(screens.s1, screens.s2);

  // 🎬 SCENE 2
  await smartWait(2500);
  show(el.t3);

  // 🎵 start audio at correct moment
  await smartWait(3000);
  await startAudio();

  // 🎬 LYRICS (slow)
  for (let line of el.lyrics) {
    show(line);
    await smartWait(4200);
  }

  await smartWait(6000);

  // 🎬 FINAL SCREEN
  await switchScreen(screens.s2, screens.s3);

  // optional: pause music for emotional ending
  if (el.audio) {
    el.audio.pause();
  }

  await smartWait(3000);
  show(el.finalText);
};

// ==========================
// BUTTON ACTION
// ==========================
el.btn.onclick = () => {
  window.location.href = "https://wa.me/916394400744";
};

// ==========================
// START
// ==========================
window.onload = run;
