const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log('MySQL Connected');
    return sequelize.sync(); // auto create table jika belum ada tapi harus tetep create db terlebih dahulu dengan nama lms_db
  })
  .then(() => {
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch((err) => console.error('Database Error:', err));
