import express from 'express';
import dotenv from 'dotenv';
import pool from './db.js';
import projectsRouter from './routes/projects.js';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Backend is running. DB Time: ${result.rows[0].now}`);
  } catch (err) {
    res.status(500).send('Database connection failed');
  }
});

app.use('/projects', projectsRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
