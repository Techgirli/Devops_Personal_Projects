document.getElementById("btnLoad").addEventListener("click", loadDino);

async function loadDino() {
    const display = document.getElementById("dinosaurDisplay");
    display.innerHTML = "Loading...";

    try {
        const nameRes = await fetch("/dinoname");
        const nameData = await nameRes.json();

        const dino = nameData?.dinosaurs?.[0] ?? { name: "Unknown Dinosaur" };

        const imageRes = await fetch(`/dinoimage?q=${dino.name}`);
        const imageData = await imageRes.json();

        display.innerHTML = `
            <h2>${dino.name}</h2>
            <img src="${imageData.image}" alt="${dino.name}">
        `;
    } catch (err) {
        display.innerHTML = "Failed to load dinosaur. Try again!";
    }
}
