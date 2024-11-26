const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Basic GET request
app.get('/', (req, res) => {
  res.status(200).send('Hello from Express');
});

// Users endpoint returning JSON
app.get('/users', (req, res) => {
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com"
    }
  ];
  res.status(200).json(users);
});

// Auth token endpoint
app.get('/token', (req, res) => {
  // In a real application, you would implement proper authentication
  const token = 'lolwatcanudo1337';
  res.status(200).json({ token });
});

// Protected data endpoint
app.get('/data', (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  // In a real application, you would validate the token here
  if (token === 'lolwatcanudo1337') {
    res.status(200).json({
      message: "Protected data",
      timestamp: new Date().toISOString(),
      data: {
        items: [1, 2, 3],
        status: "active"
      }
    });
  } else {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
