const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'Success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.createNewTour = (req, res) => {
  console.log(req.body);
  const lastID = tours.length * 1;
  const newID = lastID + 1;
  const newTour = Object.assign({ id: newID }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'Success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((tour) => tour.id === id);
  if (tour) {
    res.status(200).json({
      status: 'Success',
      data: {
        tour,
      },
    });
  } else {
    res.status(404).json({
      status: 'Fail',
      errors: {
        message: `No tour found with ID ${id}`,
      },
    });
  }
};

exports.updateTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((tour) => tour.id === id);
  if (tour) {
    res.status(200).json({
      status: 'Success',
      data: {
        tour: '<Updated Tour>',
      },
    });
  } else {
    res.status(404).json({
      status: 'Fail',
      errors: {
        message: `No tour found with ID ${id}`,
      },
    });
  }
};

exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((tour) => tour.id === id);
  if (tour) {
    res.status(204).json({
      status: 'Success',
      data: null,
    });
  } else {
    res.status(404).json({
      status: 'Fail',
      errors: {
        message: `No tour found with ID ${id}`,
      },
    });
  }
};
