module.exports = (app) => {
    const products = require('../controllers/product.controller.js');

    // Create a new Product
    app.post('/products', products.create);

    // List all Products
    app.get('/products', products.findAll);

    // Get a single Product by id
    app.get('/products/:id', products.findOne);

    // Update a Product by id
    app.put('/products/:id', products.update);

    // Delete a Product by id
    app.delete('/products/:id', products.delete);
}