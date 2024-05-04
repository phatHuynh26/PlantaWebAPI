const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    phonenumber: { type: String, required: true },
    role: { type: Number, default: 1 },
    carts: { type: Array, default: [] },
    orderHistory:{type:Array, default:[]}       
})
module.exports = mongoose.models.user || mongoose.model('user', UserSchema);