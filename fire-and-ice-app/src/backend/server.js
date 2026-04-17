import app from './app.js';

const PORT = 3000;

app.listen(PORT, () => {
  console.log('\x1b[36m%s\x1b[0m', `Backend is listeting on port ${PORT}`);
});
