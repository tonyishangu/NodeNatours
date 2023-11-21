const express = require('express');
const app = express();
const fs = require('fs');

// middleware => fuction that can modify incoming request data
app.use(express.json())

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// define routes
// get request
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

// post request
app.post('/api/v1/tours', (req, res) => {

  // create an id
  const newId = tours[tours.length - 1].id + 1

  // new tour
  const newTour = Object.assign({id: newId}, req.body)

  // add to the array of tours
  tours.push(newTour)

  // write to file
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
        },
    })
  })
  res.send('Done')
})

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
