const song = document.getElementById("song");
const startOverlay = document.getElementById("startOverlay");
const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const lyricLines = Array.from(document.querySelectorAll(".lyric-line"));

let timers = [];

function clearTimers() {
  timers.forEach((t) => clearTimeout(t));
  timers = [];
}

function showLine(index) {
  lyricLines.forEach((line, i) => {
    line.classList.toggle("active", i === index);
  });
}

function showNextButton() {
  nextBtn.classList.add("show");
}

function playSequence() {
  clearTimers();
  showLine(0);

  const times = lyricLines.map((line) => Number(line.dataset.time || 0));

  times.forEach((time, index) => {
    const id = setTimeout(() => {
      showLine(index);
    }, time);
    timers.push(id);
  });

  const finalId = setTimeout(() => {
    lyricLines.forEach((line) => line.classList.remove("active"));
    showNextButton();
  }, 27000);

  timers.push(finalId);
}

async function startExperience() {
  startOverlay.style.display = "none";

  try {
    song.currentTime = 0;
    await song.play();
  } catch (err) {
    // autoplay may be blocked until user gesture
  }

  playSequence();
}

startBtn.addEventListener("click", startExperience);

nextBtn.addEventListener("click", () => {
  if (window.location.href.includes("next.html")) return;
  window.location.href = "next.html";
});

song.addEventListener("ended", () => {
  lyricLines.forEach((line) => line.classList.remove("active"));
  showNextButton();
});

window.addEventListener("load", () => {
  // Keep overlay until user taps, because mobile browsers usually block autoplay.
  showLine(0);
});
