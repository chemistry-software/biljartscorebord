import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json());

// In-memory game data
let gameData = {
  player1Points: 0,
  player2Points: 0,
  turnsTaken: 0
};

// SSE endpoint
app.get('/api/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Send initial game data
  res.write(`data: ${JSON.stringify(gameData)}\n\n`);

  // Listen for updates
  const intervalId = setInterval(() => {
    res.write(`data: ${JSON.stringify(gameData)}\n\n`);
  }, 1000); // Send updates every second

  // Clean up on client disconnect
  req.on('close', () => {
    clearInterval(intervalId);
  });
});

// Update game data endpoint
app.post('/api/updateGame', (req, res) => {
  const { player1Points, player2Points, turnsTaken } = req.body;

  // Update game data
  gameData = { player1Points, player2Points, turnsTaken };

  // Broadcast SSE update
  res.status(200).send('Game data updated successfully');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

