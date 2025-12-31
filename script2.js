
const pages = document.querySelectorAll(".page");
const heartsContainer = document.querySelector(".hearts");


/* ---------- PAGE NAVIGATION (RESTORED) ---------- */
function goToPage(index) {
    pages.forEach(p => p.classList.remove("active"));
    pages[index].classList.add("active");
  
    // Page 6 (Happy New Year)
    if (index === 5) {
      launchConfetti();
    } else {
      stopConfetti();
    }
  }
  
  
  
  /* ---------- FLOATING HEARTS + SPARKLES ---------- */


/* MIXED SYMBOLS */
const symbols = ["❤", "✨"];

/* IMPROVED COLOR PALETTE (less washed blue) */
const colors = [
  "#ff5c8a", // pink
  "#ff8fab", // rose
  "#f4acb7", // blush
  "#9bbcd1", // muted blue (less transparent look)
  "#b28dff", // lavender
  "#f1c40f"  // soft gold
];

function createFloatingElement() {
  const el = document.createElement("div");
  el.classList.add("heart");

  // random heart or sparkle
  el.textContent = symbols[Math.floor(Math.random() * symbols.length)];

  // KEEP your size & duration logic
  const size = Math.random() * 12 + 50;
  const duration = Math.random() * 9 + 4;

  el.style.left = Math.random() * 100 + "vw";
  el.style.fontSize = size + "px";
  el.style.color = colors[Math.floor(Math.random() * colors.length)];
  el.style.animationDuration = duration + "s";

  heartsContainer.appendChild(el);

  setTimeout(() => {
    el.remove();
  }, duration * 1000);
}

/* CONTINUOUS FLOW (no resets) */
setInterval(createFloatingElement, 600);


/* GROUP PHOTO DECK LOGIC */
let currentGroupIndex = 0;

function nextGroupPhoto() {
  const photos = document.querySelectorAll(".deck-photo");
  photos[currentGroupIndex].classList.remove("active");

  currentGroupIndex = (currentGroupIndex + 1) % photos.length;

  photos[currentGroupIndex].classList.add("active");
}


/* ---------- CONFETTI ---------- */
const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");

let confettiRunning = false;
let confettiPieces = [];
let confettiAnimation;

function resizeConfetti() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeConfetti);
resizeConfetti();

function launchConfetti() {
    if (confettiRunning) return; // prevent double starts
    confettiRunning = true;
  
    confettiPieces = [];
    const colors = ["#ff5c8a", "#ffcc70", "#b28dff", "#9bbcd1", "#f4acb7"];
  
    for (let i = 0; i < 150; i++) {
      confettiPieces.push({
        x: Math.random() * confettiCanvas.width,
        y: Math.random() * -confettiCanvas.height,
        r: Math.random() * 6 + 4,
        d: Math.random() * 40 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 10
      });
    }
  
    animateConfetti();
  }
  

  function animateConfetti() {
    if (!confettiRunning) return;
  
    confettiAnimation = requestAnimationFrame(animateConfetti);
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  
    confettiPieces.forEach(p => {
      p.y += Math.cos(p.d) + 3;
      p.x += Math.sin(p.d) * 0.5;
  
      // recycle confetti from top when it goes off screen
      if (p.y > confettiCanvas.height + 20) {
        p.y = -20;
        p.x = Math.random() * confettiCanvas.width;
      }
  
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });
  }
  function stopConfetti() {
    confettiRunning = false;
    cancelAnimationFrame(confettiAnimation);
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }
    
