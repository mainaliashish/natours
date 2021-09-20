const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// Check ID Middleware
exports.checkID = (req, res, next, val) => {
  const id = val * 1;
  // console.log(id);
  const tour = tours.find(tour => tour.id === id);
  if(!tour) {
  // if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'Fail',
      data: {
        message: `No Tour found with ID ${id}`,
      },
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if(!req.body.name || !req.body.price) {
    return res.status(500).json({
      status: 'Fail',
      data: {
        message: 'A Tour must have a name and price.'
      }
    })
  }
  next();
}

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
  res.status(200).json({
    status: 'Success',
    data: {
      tour,
    },
  });
};

exports.updateTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((tour) => tour.id === id);
  res.status(200).json({
    status: 'Success',
    data: {
      tour: '<Updated Tour>',
    },
  });
};

exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((tour) => tour.id === id);
  res.status(204).json({
    status: 'Success',
    data: null,
  });
};
