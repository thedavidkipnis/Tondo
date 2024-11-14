const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.get('/api/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM t_notes');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});