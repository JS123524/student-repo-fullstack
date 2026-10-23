const express = require('express');
const app = express();
const port = process.env.PORT || 5001;

// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format

// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice

// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day

// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie

// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format

const routes = [
  'welcome',
  'redirect',
  'redirected',
  'cache',
  'cookie',
  'other',
];

app.get(`/${routes[0]}`, (req, res) => {
  res.status(200);
  res.type('html');
  res.send('<h1>Welcome!</h1>');
});

app.get(`/${routes[1]}`, (req, res) => {
  res.redirect(302, `/${routes[2]}`);
});

app.get(`/${routes[2]}`, (req, res) => {
  res.status(200);
  res.type('html');
  res.send('<h1>Redirected!</h1>');
});

app.get(`/${routes[3]}`, (req, res) => {
  res.status(200);
  res.type('html');
  res.set('Cache-Control', 'public, max-age=86400');
  res.send('this resource was cached');
});

app.get(`/${routes[4]}`, (req, res) => {
  res.status(200);
  res.type('text');
  res.cookie('hello', 'world');
  res.send('cookies… yummm');
});

app.use((req, res) => {
  res.status(404);
  res.type('html');
  res.send('404 - page not found');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
