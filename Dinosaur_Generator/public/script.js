// Working pixel dinosaur assets
const dinoSprites = [
"https://raw.githubusercontent.com/typoes/trex-runner/gh-pages/img/offline-sprite.png",
"https://raw.githubusercontent.com/aaron-bond/dino-game/master/images/dino.png",
"https://raw.githubusercontent.com/daattali/beautiful-docs/master/img/dino.png",
"https://raw.githubusercontent.com/chromeos/static-assets/main/dino/dino-assets/dino-spritesheet.png"
];


// Dino facts
const dinoFacts = [
"Some dinosaurs had feathers!",
"The T‑Rex had a powerful sense of smell.",
"Triceratops had up to 800 teeth.",
"Some dinos were the size of chickens!",
"The Stegosaurus' brain was the size of a walnut."
];


const dinoImage = document.getElementById("dinoImage");
const dinoFact = document.getElementById("dinoFact");
const floatingDinosContainer = document.getElementById("floatingDinos");


// Generate dinosaur
function generateDino() {
const img = dinoSprites[Math.floor(Math.random() * dinoSprites.length)];
const fact = dinoFacts[Math.floor(Math.random() * dinoFacts.length)];


dinoImage.src = img;
dinoFact.textContent = fact;
}


document.getElementById("generateBtn").addEventListener("click", generateDino);


// Floating dinosaurs
function spawnFloatingDino() {
const img = document.createElement("img");
img.src = dinoSprites[Math.floor(Math.random() * dinoSprites.length)];
img.classList.add("floating-dino");
img.style.left = Math.random() * 90 + "vw";
img.style.width = Math.random() * 70 + 50 + "px";


floatingDinosContainer.appendChild(img);


setTimeout(() => img.remove(), 12000);
}


setInterval(spawnFloatingDino, 2000);


// Sparkles
const canvas = document.getElementById("sparkles");
const ctx = canvas.getContext("2d");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let sparkles = [];


function sparkle() {
ctx.clearRect(0, 0, canvas.width, canvas.height);


sparkles.push({
x: Math.random() * canvas.width,
y: canvas.height,
size: Math.random() * 3 + 1,
speed: Math.random() * 3 + 1
});


sparkles.forEach((s, i) => {
ctx.fillStyle = "white";
ctx.fillRect(s.x, s.y, s.size, s.size);
s.y -= s.speed;


if (s.y < -10) sparkles.splice(i, 1);
});


requestAnimationFrame(sparkle);
}


sparkle();