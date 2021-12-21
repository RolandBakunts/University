const mongoose = require('mongoose');

const CourseRegistrationSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required:true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    grade: {
        type: Number
    }
})
const CourseRegistration = mongoose.model('CourseRegistration', CourseRegistrationSchema);

module.exports = CourseRegistration;