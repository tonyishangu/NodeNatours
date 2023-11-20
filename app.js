const express = require('express');
const app = express();
const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// define routes
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

// app.post('/',(req, res) => {
//     // code to handle post request
//     res.status(201).send('You can post to this ui;')
// })

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
