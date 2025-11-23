// 🔥 Background slideshow images
const backgrounds = [
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1521295121783-8a321d551ad2",
  "https://images.unsplash.com/photo-1519817650390-64a93db511aa"
];

// Change background every 8 seconds
let bgIndex = 0;
function updateBackground() {
  document.getElementById("bg").style.backgroundImage =
    `url('${backgrounds[bgIndex]}?auto=format&fit=crop&w=1920&q=80')`;
  bgIndex = (bgIndex + 1) % backgrounds.length;
}
setInterval(updateBackground, 8000);
updateBackground(); // Start immediately


// 🔥 Dinosaur API
async function generateDinosaurs() {
  try {
    const response = await fetch("https://dinosaur-facts-api.shultzlab.com/dinosaurs/random");
    const dino = await response.json();

    document.getElementById("dinoName").textContent = dino.name || "Unknown Dinosaur";
    document.getElementById("dinoImage").src = dino.image || "";

    // Add fade animation
    document.getElementById("dinoImage").style.animation = "none";
    void document.getElementById("dinoImage").offsetWidth;
    document.getElementById("dinoImage").style.animation = "fadeIn 0.6s ease";

  } catch (error) {
    document.getElementById("dinoName").textContent = "Failed to load dinosaur!";
    document.getElementById("dinoImage").src = "";
  }
}
