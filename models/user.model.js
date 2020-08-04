const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullname:{ type: String, required: true, trim: true, minlength: 3},
    gender:{ type: String, required: false},
    email:{ type: String, required: true, trim: true, unique: true},
    password:{ type: String, required: true, trim: true, minlength: 5 },
    position:{ type: String, trim: true},
    viewUsers: { type: Boolean, required: true},
    grantUserPrivileges: { type: Boolean, required: true},
    viewInventoryRecords:{ type: Boolean, required: true},
    addNewSparePart:{ type: Boolean, required: true},
    recordPurchase:{ type: Boolean, required: true},
    requestUsage:{ type: Boolean, required: true},
    authorizePurchase:{ type: Boolean, required: true},
    authorizeUsage:{ type: Boolean, required: true},
    viewItemHistory: { type: Boolean, required: true},
    viewAllVehicles:{ type: Boolean, required: true},
    addNewVehicle: { type: Boolean, required: true},
    editVehicle: { type: Boolean, required: true},
    viewHistory:{ type: Boolean, required: true}
},
{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;