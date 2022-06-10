const CourseService = require('../../services/CourseService');
const Course = require('../../models/course');
const { Forbidden, Unauthorized } = require('../../errorHandler/httpError');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config')


const exampleCourse = {
    id: "123",
    username: "s@",
    email: "s@gmail.com",
    password: "s",
    role: "student",
    description:"esim",
    name:"chgitemDzya",
    
}

const createdCourse = {
    id: "123",
    createdAt: "123123",
    updatedAt: "123123",
    username: "s@",
    email: "s@gmail.com",
    password: "s",
    role: "student",
    description:"esim",
    name:"chgitemDzya",
   
}


describe('CourseService unit test', () => {

    it('should return created coourse', async () => {
        jest.spyOn(Course, 'create')
            .mockImplementationOnce(() => Promise.resolve(createdCourse))

        const result = await CourseService.createCourse(exampleCourse);
        expect(result).toBe(createdCourse);
    })



})