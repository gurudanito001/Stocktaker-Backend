const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sparePartSchema = new Schema({
    partNumber:{ type: String, trim: true},
    itemName:{ type: String, unique: true, required: true},
    manufacturer:{ type: String, trim: true},
    model:{ type: String, trim: true},
    serialNumber:{type: String, trim: true},
    category:{ type: String, trim: true},
    quantity:{ type: Number, required: true},
    reorderlevel:{ type: Number, required: true},
    averageUnitCost:{ type: Number, required: true},
    description:{ type: String, trim: true},
},
{
    timestamps: true
});

const SparePart = mongoose.model('SparePart', sparePartSchema);

module.exports = SparePart;