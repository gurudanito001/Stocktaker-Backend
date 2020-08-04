const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
    plateNumber:{type: String, required: true, trim: true, unique: true},
    description: {type: String, trim: true,}
},{
    timestamps: true,
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;