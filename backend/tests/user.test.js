const mongoose = require('mongoose');
const User = require('../models/User');

/**
 * Unit tests for the User model
 */
describe('User Model Unit Tests', () => {
    
    beforeAll(async () => {
        const url = `mongodb://127.0.0.1:27010/indulex_test_user`;
        await mongoose.connect(url);
    });

    afterEach(async () => {
        await User.deleteMany();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    /**
     * Test case: Should create a user successfully
     */
    it('should create and save a user successfully', async () => {
        const validUser = new User({
            nombre: 'Agustin Studio',
            email: 'agustin@example.com',
            password: 'SecurePassword123!',
            ciudad: 'Buenos Aires'
        });
        const savedUser = await validUser.save();
        
        expect(savedUser._id).toBeDefined();
        expect(savedUser.nombre).toBe('Agustin Studio');
        expect(savedUser.email).toBe('agustin@example.com');
        expect(savedUser.password).toBe('SecurePassword123!');
    });

    /**
     * Test case: Should fail with duplicate email
     */
    it('should fail to save a user with a duplicate email', async () => {
        const user1 = new User({
            nombre: 'User 1',
            email: 'duplicate@example.com',
            password: 'password123'
        });
        await user1.save();

        const user2 = new User({
            nombre: 'User 2',
            email: 'duplicate@example.com',
            password: 'password456'
        });

        let err;
        try {
            await user2.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeDefined();
        expect(err.code).toBe(11000); // MongoDB duplicate key error code
    });
});
