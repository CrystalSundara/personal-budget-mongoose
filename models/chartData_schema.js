const mongoose = require ("mongoose");

const chartDataSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    budget: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true,
        match: [/^#(?:[0-9a-fA-F]{3}){1,2}$/, "Not a valid hex color"]
    }
}, {collection: 'chartData'})

module.exports = mongoose.model('chartData', chartDataSchema)