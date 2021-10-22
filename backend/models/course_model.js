const mongoose = require('mongoose')
const { Schema } = mongoose;

// Schema is Collection is Table 

// Designd Collection
const courseSchema = new Schema({
    name: { type: String, require: true, trim: true, unique: true, index: true},
    description: { type: String, trim: true },
    category: { type: String, require: true, trim: true},
    subject: { type: String, require: true, trim: true},
    starttime: { type: Date, require: true,},
    endtime: { type: Date, require: true },
    amount: { type: Number, require: true }
}, {
    collation: {
        locale: 'en_US',
        strength: 1
    }
});

//Model name must match Collection name
const Course = mongoose.model('courses', courseSchema)

module.exports = Course