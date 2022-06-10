const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true, 
    },
    name: {
        type: String,
        required: true, 
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
})
const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;