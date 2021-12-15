const mongoose = require('mongoose');

const CoursesSchema = new mongoose.Schema({
    description: {
        type: String
    },
    student_grades: {
        type: Array
    },
    name: {
        type: String
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
})
const Courses = mongoose.model('Courses', CoursesSchema);

module.exports = Courses;