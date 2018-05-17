"use strict"

const Product = require('../models/product.model.js');

// Create and save a new Product
exports.create = (req, res) => {

    // Validate if the request's body is empty 
    // (does not include required data)
    if(Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "Product data can not be empty"
        });
    }

    // Create a new Product with request's data
    const product = new Product({
        name: req.body.name, 
        price: req.body.price || 0,
        expiration: req.body.expiration || null
    });

    // Save the Product in the database
    product.save()
    .then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong occurred while creating the record."
        });
    });
};

// Retrieve and list all Products
exports.findAll = (req, res) => {
    Product.find()
    .then(products => {
        res.status(200).send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong occurred while retrieving the records."
        });
    });
};

// Get a single Product by its id
exports.findOne = (req, res) => {
    Product.findById(req.params.id)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id:" + req.params.id
            });            
        }
        res.status(200).send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id:" + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Something wrong ocurred while retrieving the record with id:" + req.params.id
        });
    });
};

// Update a Product by its id
exports.update = (req, res) => {
    // Validate if the request's body is empty 
    // (does not include required data)
    if(Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "Product data can not be empty"
        });
    }

    // Find the Product and update it with the request body data
    Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name, 
        price: req.body.price || 0,
        expiration: req.body.expiration || null
    }, { new: true })
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id:" + req.params.id
            });
        }
        res.status(200).send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id:" + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Something wrong ocurred while updating the record with id:" + req.params.id
        });
    });
};


// Delete a Product by its id
exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.id)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id:" + req.params.id
            });
        }
        res.status(200).send({message: "Product deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Product not found with id:" + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Something wrong ocurred while deleting the record with id:" + req.params.id
        });
    });
};
