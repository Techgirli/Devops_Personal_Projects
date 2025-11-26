const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🦖 Cute Dino Generator</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>

  <!-- FULLSCREEN BACKGROUND -->
  <div id="bg"></div>

  <div class="container">
    <h1 class="title">🦖 Cute Dinosaur Generator 🌋</h1>

    <button id="generateBtn">Generate Dinosaur</button>
    <button id="toggleModeBtn">🍼 Baby Dino Mode</button>
    <button id="autoBgBtn">🎨 Auto Background: OFF</button>

    <h2 id="dinoName" class="dino-name"></h2>
    <img id="dinoImage" class="dino-img" src="" alt="">
    <p id="dinoFact" class="fact-box"></p>
  </div>

  <div class="floating-dinos"></div>
  <canvas id="sparkles"></canvas>

  <audio id="dinoSound"></audio>

  <script src="script.js"></script>
</body>
</html>
`;

module.exports = html;
