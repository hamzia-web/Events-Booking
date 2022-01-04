const express = require('express');
const router = express.Router();
const Product = require('../models/Product')

/*
   INFO: GET all the products
   url: http://127.0.0.1:5000/api/products
   method: GET
   fields: no-fields
   express function: router.get()
 */
// async-await ES8 feature
router.get('/products', async (request, response) =>{
   try {
       let products = await Product.find();
       response.status(200).json(products)
   }
   catch (error){
       response.status(500).json({
           error: error
       })
   }
})

/*
    Get a single product:
    url: http://127.0.0.1:5000/api/products/:id
	  method: GET
	  fields: no-fields
	  express function: router.get()
 */
router.get('/products/:id', async (request, response) =>{
    let productId = request.params.id;
    try {
        let product = await Product.findOne({_id : productId});
        //let product = await Product.findById(productId) // shortcut
        response.status(200).json(product)
    }
    catch (error){
        response.status(500).json({
            error: error
        })
    }
})

/*
   INFO: Create a product:
   url: http://127.0.0.1:5000/api/products
   method: POST
   fields: name, image,price,qty,info
   express function: router.post()
 */

router.post('/products', async (request, response) =>{
    try {
        // Capture form data from request. name, image etc are the fields of model
        let newProduct = {
            name: request.body.name,
            image: request.body.image,
            price: request.body.price,
            qty: request.body.qty,
            info: request.body.info,
        }
        // Check product exist or not
        let product = await Product.findOne({name : newProduct.name})
        if(product)
        {
            return response.status(400).json(product)
        }
        product = new Product(newProduct);
        product = await product.save(); // INSERT data to DB
        response.status(200).json(product)
    }
    catch (error){
        response.status(500).json({
            error: error
        })
    }
})

/*
   INFO: Update a products:
   url: http://127.0.0.1:5000/api/products/:id
   method: PUT
   fields: name, image,price,qty,info
   express function: router.put()
 */
router.put('/products/:id', async (request, response) =>{
    let productId = request.params.id;
    try {
        // Capture form data from request. name, image.. are the fields of model
        let updatedProduct = {
            name: request.body.name,
            image: request.body.image,
            price: request.body.price,
            qty: request.body.qty,
            info: request.body.info,
        }

        let product = await Product.findById(productId); // Get product by Id
        if(product)
        {
            await Product.findByIdAndUpdate(productId,
                {$set : updatedProduct},
                {new : true})
            response.status(200).json({
                result: 'Product updated successfully',
                updatedProduct: updatedProduct
            })
        }
        else {
            return response.status(400).json({
                   result: 'Fail',
                   message: 'No Product found to update'
            })
        }
    }
    catch (error){
        response.status(500).json({
            error: error
        })
    }
})

/*
   INFO: Delete a product:
   url:http://127.0.0.1:5000/api/products/:id
   method: DELETE
   fields: no-fields
   express function: router.delete()
 */

router.delete('/products/:id', async (request, response) =>{

    let productId = request.params.id
    try {
        let product = await Product.findByIdAndDelete(productId);
        response.status(200).json({
            result: 'Product deleted successful',
            product: product
        })
    }
    catch (error)
    {
        response.status(500).json({
            error: error
        })
    }
})

module.exports = router;
