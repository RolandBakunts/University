const UserService = require('../../services/UserService');
const User = require('../../models/user');
const { Forbidden, Unauthorized } = require('../../errorHandler/httpError');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config')


const exampleUser = {
    id: "123",
    username: "s@",
    email: "s@gmail.com",
    password: "s",
    role: "student"
}

const createdUser = {
    id: "123",
    createdAt: "123123",
    updatedAt: "123123",
    username: "s@",
    email: "s@gmail.com",
    password: "s",
    role: "student"
}



describe('UserService unit test', () => {
    it('should return created user', async () => {
        jest.spyOn(User, 'create')
            .mockImplementationOnce(() => Promise.resolve(createdUser))

        const result = await UserService.signup(exampleUser);
        expect(result).toBe(createdUser);
    })
    it('should throw error', async () => {
        try {
            await UserService.signup();
        } catch (err) {
            expect(err.message).toBe('no data provided');
            expect(err).toBeInstanceOf(Forbidden)
        }
    })

    jest.spyOn(User, 'findOne')
        .mockImplementationOnce(() => Promise.resolve(createdUser))

    jest.spyOn(jwt, 'sign')
        .mockImplementationOnce(() => 'exampleToken')

    it('should return login user', async () => {
        const result = await UserService.login(exampleUser.id);
        expect(jwt.sign).toBeCalledWith({ id: exampleUser.id }, jwtSecret, { expiresIn: '3h' })
        expect(result).toBe('exampleToken');
    })

    it('should throw error', async () => {
        try {
            await UserService.login();
        } catch (err) {
            expect(err.message).toBe('no data provided');
            expect(err).toBeInstanceOf(Unauthorized)
        }
    })

})