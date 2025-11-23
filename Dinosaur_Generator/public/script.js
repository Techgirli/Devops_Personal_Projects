const btnLoad = document.getElementById('btnLoad');
const dinosaurDisplay = document.getElementById('dinosaurDisplay');
const floatingDinos = document.querySelector('.floating-dinos');

const BASE_URL = window.location.origin;

// Create floating dinosaur emojis
const createFloatingDinos = () => {
  const emojis = ['🦖','🦕','🦖','🦖','🦕','🦖'];
  floatingDinos.innerHTML = '';
  for (let i = 0; i < 10; i++) {
    const span = document.createElement('span');
    span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    span.style.left = Math.random() * 100 + 'vw';
    span.style.animationDuration = (5 + Math.random() * 5) + 's';
    floatingDinos.appendChild(span);
  }
};
createFloatingDinos();

btnLoad.addEventListener('click', async () => {
  dinosaurDisplay.innerHTML = 'Loading...';

  try {
    const nameRes = await fetch(`${BASE_URL}/dinoname`);
    if (!nameRes.ok) throw new Error('Failed to fetch dinosaur names');
    const names = await nameRes.json();

    dinosaurDisplay.innerHTML = ''; // clear previous

    // Show 3 random dinosaurs
    for (let i = 0; i < 3; i++) {
      const randomDino = names[Math.floor(Math.random() * names.length)] || 'Unknown Dinosaur';

      const imageRes = await fetch(`${BASE_URL}/dinoimage?q=${encodeURIComponent(randomDino)}`);
      if (!imageRes.ok) throw new Error('Failed to fetch dinosaur image');
      const imageData = await imageRes.json();

      const card = document.createElement('div');
      card.classList.add('dino-card');
      card.innerHTML = `
        <h2>${randomDino}</h2>
        <img src="${imageData.imageUrl}" alt="${randomDino}">
      `;
      dinosaurDisplay.appendChild(card);
    }
  } catch (err) {
    console.error(err);
    dinosaurDisplay.innerHTML = 'Failed to load dinosaurs. Try again!';
  }
});
