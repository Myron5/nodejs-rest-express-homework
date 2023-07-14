const mongoose = require('mongoose');

const app = require('./app');

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set('strictQuery', true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('Database connected successful');
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });

module.exports = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
