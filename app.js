const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// Middleware for enabling incoming request from body
// Middlewares
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from middleware 👋');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});


app.use('/api/v1/tours', tourRouter); 
app.use('/api/v1/users', userRouter);


const PORT = 3000;

app.listen(3000, () => {
  console.log(`App listening on port ${PORT}...🚀🚀`);
});
