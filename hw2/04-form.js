const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5001;

// http://localhost:5001/form should return a form with input elements for username, email, and submit button

// http://localhost:5001/submit should return all the data the user entered

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.redirect('/form');
});

app.get('/form', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '04-form.html'));
});

app.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname, '04-form-style.css'));
});

app.post('/submit', (req, res) => {
  res.status(200);
  res.json({
    ...req.body,
    newsletter: req.body.newsletter === 'yes',
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
