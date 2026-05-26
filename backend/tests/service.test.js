const mongoose = require('mongoose');
const productService = require('../services/productService');
const Product = require('../models/Product');

/**
 * Unit tests for ProductService
 */
describe('ProductService Unit Tests', () => {
    
    beforeAll(async () => {
        const url = `mongodb://127.0.0.1:27010/indulex_test_service`;
        await mongoose.connect(url);
    });

    afterEach(async () => {
        await Product.deleteMany();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    /**
     * Test case: Should filter products by category
     */
    it('should filter products by category', async () => {
        await Product.create([
            { nombre: 'H1', precio: 10, categoria: 'A', descripcion: 'D', imagen: 'I' },
            { nombre: 'H2', precio: 20, categoria: 'B', descripcion: 'D', imagen: 'I' }
        ]);

        const result = await productService.getProducts({ category: 'A' });
        expect(result.products.length).toBe(1);
        expect(result.products[0].categoria).toBe('A');
    });

    /**
     * Test case: Should search products by name
     */
    it('should search products by name (case insensitive)', async () => {
        await Product.create([
            { nombre: 'Urban Hoodie', precio: 10, categoria: 'A', descripcion: 'D', imagen: 'I' },
            { nombre: 'Classic Tee', precio: 20, categoria: 'B', descripcion: 'D', imagen: 'I' }
        ]);

        const result = await productService.getProducts({ search: 'urban' });
        expect(result.products.length).toBe(1);
        expect(result.products[0].nombre).toBe('Urban Hoodie');
    });

    /**
     * Test case: Should handle pagination correctly
     */
    it('should handle pagination correctly', async () => {
        const items = Array.from({ length: 15 }, (_, i) => ({
            nombre: `Product ${i}`, precio: 10, categoria: 'A', descripcion: 'D', imagen: 'I'
        }));
        await Product.create(items);

        const result = await productService.getProducts({ page: 2, limit: 10 });
        expect(result.products.length).toBe(5);
        expect(result.currentPage).toBe(2);
        expect(result.totalPages).toBe(2);
    });
});
