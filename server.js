const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql2');

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect(err => {
  if (err) {
    console.log(err);
  }
  console.log('Connected to the database');
});
const app = express();

// Question 1 goes here
app.get('/patients', async (req, res) => {
  const query = `SELECT patient_id, first_name, last_name, date_of_birth FROM patients`;
  connection.query(query, (err, rows, fields) => {
    if (err instanceof Error) {
      console.log(err);
      return;
    }
    res.status(200).json(rows);
  });
});

// Question 2 goes here
app.get('/providers', (req, res) => {
  const query = `SELECT first_name, last_name, provider_specialty FROM providers;`;

  connection.query(query, (err, rows, fields) => {
    if (err) {
      console.log(err);
      return;
    }
    res.status(200).json(rows);
  });
});

// Question 3 goes here
app.get('/patients/:firstname', async (req, res) => {
  const query = `SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = "${req.params.firstname}"`;

  connection.query(query, (err, rows, fields) => {
    if (err instanceof Error) {
      console.log(err);
      res.status(404).json(err.message);
    }
    res.status(200).json(rows);
  });
});

// Question 4 goes here
app.get('/providers/:specialty', (req, res) => {
  const query = `SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = "${req.params.specialty}";`;

  connection.query(query, (err, rows, fields) => {
    if (err) {
      console.log(err);
      return;
    }
    res.status(200).json(rows);
  });
});

// listen to the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`);
});
