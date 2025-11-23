import 'dotenv/config';
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import net from 'net';

const app = express();
app.use(cors());
app.use(express.static('public'));

let PORT = parseInt(process.env.PORT) || 9000;

// Function to find an available port
const getAvailablePort = (port) => new Promise((resolve) => {
  const server = net.createServer();
  server.once('error', () => resolve(getAvailablePort(port + 1)));
  server.once('listening', () => {
    server.close(() => resolve(port));
  });
  server.listen(port);
});

// ---------------------
// Dinosaur Names Route
// ---------------------
app.get('/dinoname', async (req, res) => {
  try {
    const response = await fetch('https://dinosaur-api1.p.rapidapi.com/dinosaurs/hip/saurischia', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'dinosaur-api1.p.rapidapi.com'
      }
    });
    const data = await response.json();
    if (!data || data.length === 0) return res.status(404).json({ message: 'No dinosaurs found' });
    res.json(data);
  } catch (err) {
    console.error('Error fetching dinosaur names:', err.message);
    res.status(500).json({ error: 'Failed to fetch dinosaur names' });
  }
});

// ---------------------
// Dinosaur Images Route
// ---------------------
app.get('/dinoimage', async (req, res) => {
  try {
    const query = req.query.q || 'dinosaur';
    const url = `https://bing-image-search5.p.rapidapi.com/images/search?q=${encodeURIComponent(query)}&count=10`;

    const apiRes = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'bing-image-search5.p.rapidapi.com'
      }
    });

    const json = await apiRes.json();
    const images = (json.value || []).map(i => i.contentUrl).filter(Boolean);

    const randomImage = images.length > 0
      ? images[Math.floor(Math.random() * images.length)]
      : 'https://via.placeholder.com/450x300?text=Dinosaur+Image+Unavailable';

    res.json({ imageUrl: randomImage });
  } catch (err) {
    console.error('Error fetching dinosaur images:', err.message);
    res.status(500).json({ error: 'Failed to fetch dinosaur image' });
  }
});

// ---------------------
// Start Server
// ---------------------
(async () => {
  PORT = await getAvailablePort(PORT);
  app.listen(PORT, () => console.log(` Dinosaur Generator running at http://localhost:${PORT}`));
})();
