// =============================
// 🌄 Background slideshow
// =============================
const backgrounds = [
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1521295121783-8a321d551ad2",
  "https://images.unsplash.com/photo-1519817650390-64a93db511aa"
];

let autoBg = false;
let bgIndex = 0;

function updateBackground() {
  document.getElementById("bg").style.backgroundImage =
    `url('${backgrounds[bgIndex]}?auto=format&fit=crop&w=1920&q=80')`;
  bgIndex = (bgIndex + 1) % backgrounds.length;
}

setInterval(() => {
  if (autoBg) updateBackground();
}, 8000);

updateBackground();


// =============================
// 🍼 Baby mode toggle
// =============================
let babyMode = false;
document.getElementById("toggleModeBtn").onclick = () => {
  babyMode = !babyMode;
  document.getElementById("toggleModeBtn").textContent =
    babyMode ? "🍼 Baby Dino Mode: ON" : "🍼 Baby Dino Mode";
};


// =============================
// 🎨 Auto background toggle
// =============================
document.getElementById("autoBgBtn").onclick = () => {
  autoBg = !autoBg;
  document.getElementById("autoBgBtn").textContent =
    autoBg ? "🎨 Auto Background: ON" : "🎨 Auto Background: OFF";
};


// =============================
// 🦕 Dino Image Packs (Option E)
// =============================
const mixedDinos = [
  // Baby dinos
  "https://i.imgur.com/8QnFutZ.png",
  "https://i.imgur.com/1iJtY3W.png",

  // Cute cartoon dinos
  "https://i.imgur.com/mZ5pMd2.png",
  "https://i.imgur.com/fz8h7yv.png",

  // Pixel dinos
  "https://i.imgur.com/jwQYp8j.png",
  "https://i.imgur.com/66rD3rM.png",

  // Realistic
  "https://i.imgur.com/7nT7JWX.jpeg",
  "https://i.imgur.com/gh0Qn15.jpeg"
];


// =============================
// 🦕 Generate dinosaur
// =============================
async function generateDinosaurs() {
  const nameEl = document.getElementById("dinoName");
  const imgEl = document.getElementById("dinoImage");
  const factEl = document.getElementById("dinoFact");

  try {
    const response = await fetch("https://dinosaur-facts-api.shultzlab.com/dinosaurs/random");
    const dino = await response.json();

    nameEl.textContent = dino.name || "Unknown Dinosaur";
    factEl.textContent = dino.description || "No fact found.";

    imgEl.src = babyMode
      ? mixedDinos[Math.floor(Math.random() * 2)]
      : mixedDinos[Math.floor(Math.random() * mixedDinos.length)];

    // Fade animation
    imgEl.style.animation = "none";
    void imgEl.offsetWidth;
    imgEl.style.animation = "fadeIn 0.6s ease";

    addFloatingDino();

  } catch {
    nameEl.textContent = "Error loading dinosaur!";
    factEl.textContent = "";
    imgEl.src = "";
  }
}

document.getElementById("generateBtn").onclick = generateDinosaurs;


// =============================
// 🦕 Floating dino animation
// =============================
function addFloatingDino() {
  const floating = document.querySelector(".floating-dinos");
  const dino = document.createElement("img");

  dino.src = mixedDinos[Math.floor(Math.random() * mixedDinos.length)];
  dino.style.left = Math.random() * 90 + "%";
  dino.style.animationDuration = (6 + Math.random() * 5) + "s";

  floating.appendChild(dino);

  setTimeout(() => dino.remove(), 10000);
}
