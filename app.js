const express = require('express');
const app = express();
const fs = require('fs');

// middleware => fuction that can modify incoming request data
app.use(express.json());

app.use((req, res,next) => {
  console.log('hello from the console')
  next()
})

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  next()
})

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// route function 
const getAllTours = (req, res) => {
  console.log(req.requestTime)
  res.status(200).json({
    status: 'success',
    results: tours.length,
    requestedAt: req.requestTime,
    data: {
      tours,
    },
  });
}
const getTourById = (req, res) => {
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
}

const CreateTour = (req, res) => {
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
}

const UpdateTour = (req, res) => {
  if (req.body.id * 1 > tours.length) {
    return res.status(400).json({
      status: 'fail',
      message: `No tour with the ID of ${id}`,
    });
  }
  res.status(200).json({
    status: 'success',
    data: null
  });
}
const DeletTour = (req, res) => {
  if (req.params.id > tours.length){
    res.status(400).json({
      staus: 'fail',
      message: `No tour wiyh rhe ID of ${id}`
    })

  res.status(204).json({
    status: 'Success',
    data: {
      tour: 'Deleted Tour'
    }
  })
  }
}

// define routes
app
  .route('/api/v1/tours')
  .get(getAllTours)   // get all tours request
  .post(CreateTour)   // post request

app
  .route('/api/v1/tours/:id')
  .get(getTourById)   // get tours by id
  .patch(UpdateTour)     // update tour
  .delete(DeletTour)    // delete tour

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
