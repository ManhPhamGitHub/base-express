const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const departmentSchema = new mongoose.Schema({
    _id: { type: ObjectId, auto: true },
    name: { type: String, required: true },
    departmentManager: { type: String, required: true },
}, {
    timestamps: true,
    _id: false,
});

module.exports = mongoose.model('Department', departmentSchema);