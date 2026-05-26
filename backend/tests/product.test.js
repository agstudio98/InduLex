const mongoose = require('mongoose');
const Product = require('../models/Product');

/**
 * Unit tests for the Product model
 */
describe('Product Model Unit Tests', () => {
    
    /**
     * Connect to a memory-based or temporary database before all tests
     * Note: In a production environment, use a separate test database
     */
    beforeAll(async () => {
        const url = `mongodb://127.0.0.1:27010/indulex_test`;
        await mongoose.connect(url);
    });

    /**
     * Clear the database after each test to ensure isolation
     */
    afterEach(async () => {
        await Product.deleteMany();
    });

    /**
     * Close the connection after all tests are finished
     */
    afterAll(async () => {
        await mongoose.connection.close();
    });

    /**
     * Test case: Should create a product successfully
     */
    it('should create and save a product successfully', async () => {
        const validProduct = new Product({
            nombre: 'Test Hoodie',
            precio: 49.99,
            categoria: 'Hoodies',
            descripcion: 'A high-quality test hoodie',
            imagen: 'test-image.jpg'
        });
        const savedProduct = await validProduct.save();
        
        expect(savedProduct._id).toBeDefined();
        expect(savedProduct.nombre).toBe('Test Hoodie');
        expect(savedProduct.precio).toBe(49.99);
    });

    /**
     * Test case: Should fail if required fields are missing
     */
    it('should fail to create a product without required fields', async () => {
        const productWithoutName = new Product({ precio: 10 });
        let err;
        try {
            await productWithoutName.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeDefined();
        expect(err.errors.nombre).toBeDefined();
        expect(err.errors.categoria).toBeDefined();
    });
});
