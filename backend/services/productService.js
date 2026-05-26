const Product = require('../models/Product');

/**
 * Service for product-related business logic.
 */
class ProductService {
    /**
     * Get products with pagination and filters.
     */
    async getProducts({ page = 1, limit = 10, category, search }) {
        const query = {};
        if (category) query.categoria = category;
        if (search) query.nombre = { $regex: search, $options: 'i' };

        const products = await Product.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Product.countDocuments(query);

        return {
            products,
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page),
            totalResults: count
        };
    }

    async getProductById(id) {
        return await Product.findById(id);
    }
}

module.exports = new ProductService();
