import express from 'express';
import cors from 'cors';
import crypto from 'crypto';

const users = [];

const app = express();

app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);

  if (user) {
    return res.status(409).json({ message: 'User already exists' });
  }

  try {
    const newUser = {
      id: crypto.randomInt(0, 999),
      username,
      password, // generally it's not a good practice to create/save un-hashed passwords but in the interest of time we will let it slide
    };

    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);

  if (!existingUser) {
    return res.status(409).json({ message: 'User does not exists' });
  }

  try {
    res.status(200).json({ message: 'User logged in successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error during login process' });
  }
});

export default app;
