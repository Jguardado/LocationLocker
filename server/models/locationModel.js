const mongoose = require('mongoose');

const { Schema } = mongoose;
/*
We are purposely choosing to use a singular location associated by userIds
as of now we will manually generating a userIds but eventually we will develop
a user collection and will pas that id along to new location instances
*/
const locationModel = new Schema({
  userId: { type: String },
  lat: { type: String },
  lng: { type: String },
  name: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zipcode: { type: String }
});

module.exports = mongoose.model('Location', locationModel)