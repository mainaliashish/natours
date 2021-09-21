const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Datebase Connection Successful..');
  });

const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log(`App listening on port ${PORT}...🚀🚀`);
});
