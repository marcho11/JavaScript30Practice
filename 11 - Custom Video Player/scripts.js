// get elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".player__controls");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

// build out fn
function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();

  //   if (video.paused) {
  //     video.play();
  //   } else {
  //     video.pause();
  //   }
}
function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  // console.log(icon);
  toggle.textContent = icon;
  // console.log("update that button");
}
function skip() {
  console.log(this.dataset.skip);
  // parseFloat: string to number
  video.currentTime += parseFloat(this.dataset.skip);
}
function handleRangeUpdate() {
  video[this.name] = this.value;
  // console.log(this.value);
  // console.log(this.name); // print input name
}
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}
function scrub(e) {
  // console.log(e);
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// hooks up the event listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

skipButtons.forEach((button) => {
  button.addEventListener("click", skip);
});

toggle.addEventListener("click", togglePlay);

ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
// progress.addEventListener("mousemove", (e) => () => {
//   if (mousedown) {
//     scrub(e);
//   }
// });
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));

// to-do let full-screen come true
