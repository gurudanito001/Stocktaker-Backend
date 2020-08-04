const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usageHistorySchema = new Schema({
    itemName:{type: String, required: true, trim: true},
    quantity: {type: Number, required: true},
    vehicleFor:{type: String, required: true,},
    authorizedBy: {type: String},
    date:{type: Date, required: true},
    purpose: {type: String, trim: true},
    authorized: {type: Boolean, required: true}
},{
    timestamps: true,
});

const UsageHistory = mongoose.model('UsageHistory', usageHistorySchema);

module.exports = UsageHistory;