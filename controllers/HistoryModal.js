const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HistorySchema = new Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    id: { type: ObjectId, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    images: { type: Array, default: [] },
})

module.exports = mongoose.models.history || mongoose.model('history', HistorySchema);
