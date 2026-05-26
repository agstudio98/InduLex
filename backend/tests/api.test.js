const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); // Note: This requires app.js to export 'app'
const Product = require('../models/Product');

/**
 * Integration tests for the Products API
 */
describe('Products API Integration Tests', () => {
    
    beforeAll(async () => {
        // Ensure we are connected to the test DB
        // The connection is usually handled in app.js or a separate config
    });

    afterEach(async () => {
        await Product.deleteMany();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    /**
     * Test case: Should fetch all products
     */
    it('GET /api/v1/products should return all products', async () => {
        // Seed database
        await Product.create({
            nombre: 'API Hoodie',
            precio: 50,
            categoria: 'Hoodies',
            descripcion: 'Test',
            imagen: 'img.jpg'
        });

        const res = await request(app).get('/api/v1/products');
        
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('success');
        expect(Array.isArray(res.body.data.products)).toBe(true);
        expect(res.body.data.products.length).toBe(1);
        expect(res.body.data.products[0].nombre).toBe('API Hoodie');
    });

    /**
     * Test case: Health check endpoint
     */
    it('GET /api/v1/health should return 200 OK', async () => {
        const res = await request(app).get('/api/v1/health');
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toContain('InduLex API is healthy');
    });
});
