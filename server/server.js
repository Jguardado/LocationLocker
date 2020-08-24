const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const db = mongoose.connect('mongodb://localhost/location_locker');
const port = process.env.PORT || 3000;
const Location = require('./models/locationModel');
const locationRouter = require('./routes/locationRouter')(Location);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', locationRouter);
app.get('/', (req, res) => {
  res.send('Welcome to my API');
});

app.listen(port, () => console.log(`listening on port ${port}`));

module.exports = app;