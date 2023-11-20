const express = require('express');
const app = express();

// define routes
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello from the backend',
    app: 'Natours',
  });
});

app.post('/',(req, res) => {
    // code to handle post request
    res.status(201).send('You can post to this ui;')
})

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
