const express = require('express');
const app = express();
const fs = require('fs');
const fetch = require('node-fetch');

// Env Vars
const apiUrl = process.env.API_URL;
const port = process.env.PORT || 3030;

app.get('/build', (req, res, next) => {
  fetch(`${apiUrl}?show=contents`)
    .then(response => response.ok ? response.json() : next(response))
    .then(data => {
      fs.writeFileSync('./src/_data/data.json', JSON.stringify(data))
      return res.sendStatus(200);
    })
    .catch(err => next(err));
});

// Error Handler
app.use((err, req, res, next) => {
  if (!err.status) err.status = 500;
  res.sendStatus(err.status);
});

// Listen to port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
