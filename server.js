const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

// console.log(process.env);

const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log(`App listening on port ${PORT}...🚀🚀`);
});
