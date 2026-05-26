const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');

/**
 * Integration tests for the Users API
 */
describe('Users API Integration Tests', () => {
    
    beforeAll(async () => {
        // Connection is handled by app.js (via db.js)
    });

    afterEach(async () => {
        await User.deleteMany();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    /**
     * Test case: Should handle update with invalid/missing ID
     */
    it('PATCH /api/v1/users/update/undefined should return 400', async () => {
        const res = await request(app)
            .patch('/api/v1/users/update/undefined')
            .send({ nombre: 'Nuevo Nombre' });
        
        expect(res.statusCode).toBe(400);
        expect(res.body.status).toBe('fail');
        expect(res.body.message).toContain('No se proporcionó un ID de usuario válido');
    });

    /**
     * Test case: Should handle update with invalid ObjectId format
     */
    it('PATCH /api/v1/users/update/123 should return 400 (Mongoose CastError)', async () => {
        const res = await request(app)
            .patch('/api/v1/users/update/123')
            .send({ nombre: 'Nuevo Nombre' });
        
        expect(res.statusCode).toBe(400);
        expect(res.body.status).toBe('fail');
        expect(res.body.message).toContain('Valor inválido 123 para el campo _id');
    });

    /**
     * Test case: Should update user profile successfully
     */
    it('PATCH /api/v1/users/update/:id should update user successfully', async () => {
        const user = await User.create({
            nombre: 'Original',
            email: 'test@example.com',
            password: 'Password123!'
        });

        const res = await request(app)
            .patch(`/api/v1/users/update/${user._id}`)
            .send({ nombre: 'Actualizado', ciudad: 'Madrid' });
        
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('success');
        expect(res.body.data.user.nombre).toBe('Actualizado');
        expect(res.body.data.user.ciudad).toBe('Madrid');
    });
});
