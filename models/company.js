const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const companySchema = new mongoose.Schema({
  _id: {type: ObjectId, auto: true},
  name: {type: String, required: true},
  root: {type: ObjectId, ref: 'User'},
}, {
  timestamps: true,
  _id: false,
});

module.exports = mongoose.model('Company', companySchema);