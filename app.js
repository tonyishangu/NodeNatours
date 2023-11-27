const { log } = require('console');
const express = require('express');
const app = express();
const fs = require('fs');

// middleware => fuction that can modify incoming request data
app.use(express.json());

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

// get tours by id
app.get('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(400).json({
      status: 'fail',
      message: `No tour with the ID of ${id}`,
    });
  }

  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

// post request
app.post('/api/v1/tours', (req, res) => {
  // create an id
  const newId = tours[tours.length - 1].id + 1;

  // new tour
  const newTour = Object.assign({ id: newId }, req.body);

  // add to the array of tours
  tours.push(newTour);

  // write to file
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
  res.send('Done');
});

// update tour
app.patch('/api/v1/tours/:id', (req, res) => {
  if (req.body.id * 1 > tours.length) {
    return res.status(400).json({
      status: 'fail',
      message: `No tour with the ID of ${id}`,
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Updated tour',
    },
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
