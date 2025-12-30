const pastBtn = document.getElementById("pastBtn");
const futureBtn = document.getElementById("futureBtn");
const futureText = document.getElementById("futureText");

pastBtn.addEventListener("click", () => {
  pastBtn.classList.add("active");
  futureBtn.classList.remove("active");
  futureText.textContent =
    "This year tested us, shaped us, and proved that we don’t disappear when things get hard.";
});

futureBtn.addEventListener("click", () => {
  futureBtn.classList.add("active");
  pastBtn.classList.remove("active");
  futureText.textContent =
    "We’ll grow, drift, argue, and return — somehow still choosing each other through the noise.";
});
