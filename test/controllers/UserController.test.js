const request = require('supertest');
const app = require('../../app');
const User = require('../../models/user.js')

const user1 = {
    username: "as@",
    email: "as@gmail.com",
    password: "cs",
    role: "student",
    courseId: "123456"
}
describe('User test case', () => {

    beforeEach(async () => {
        await User.deleteMany({})
        await User(user1).save()
    })

    test('signup', async () => {
        await request(app).post('/user/signup')
            .send({
                username: "faaas@",
                email: "aafaas@gmail.com",
                password: "faaas",
                role: "teacher"
            })
            .expect(201)
    })

    test("login", async () => {
        await request(app).post('/user/login')
            .send({
                email: user1.email,
                password: user1.password,

            })
            .expect(200)
    })
    test('studentRegisteration', async () => {
        await request(app).post('/user/studentRegisteration')

            .send({
                courseId: user1.courseId
            })
            .expect(404)
    })


    
})