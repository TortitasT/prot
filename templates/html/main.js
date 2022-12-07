/* eslint-disable no-undef */
const express = require('express');

const app = express();
const port = 3000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile('index.htm', { root: __dirname });
});

app.listen(port, () => console.log(`Server started on http://localhost:${port}`));