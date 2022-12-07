/* eslint-disable no-undef */
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, './src')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './src/index.htm'));
});

app.listen(port, () => console.log(`Server started on http://localhost:${port}`));