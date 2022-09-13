const Product = require('../models/Product')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const verifyToken = require('../functions/verifyToken');
const cors = require('cors');
const cookieParser = require('cookie-parser');

router.use(express.json());
router.use(cors({
    origin: '*',
    credentials: true
}));
router.use(cookieParser());

//Create product
router.post('/', async (req, res) => {
    try {
        verifyToken(req, res);
        if (req.user == undefined || !req.user.admin) {
            return res.send({ error: `You are not authorised to perform this action.` });
        }
        console.log(req.body);
        const newProduct = new Product(req.body);
        const product = await newProduct.save();
        console.log(product);
        return res.send(product);
    } catch (error) {
        console.log(error);
        return res.send({
            error: error.message ? error.message : `You are not authorised to perform this action.`
        });
    }
})

//Update product
router.put("/:id", async (req, res) => {
    try {
        verifyToken(req, res);
        if (req.user == undefined || !req.user.admin) {
            return res.send({ error: `You are not authorised to perform this action.` });
        }
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        return res.send({ updatedProduct });
    } catch (error) {
        console.log(error);
        return res.send({
            error: error.message ? error.message : `You are not authorised to perform this action.`
        });
    }
})

//Delete product
router.delete('/:id', async (req, res) => {
    try {
        verifyToken(req, res);
        if (req.user == undefined || !req.user.admin) {
            return res.send({ error: `You are not authorised to perform this action.` });
        }
        const product = await Product.findByIdAndDelete(req.params.id);
        console.log(product)
        return res.send({ success: true });
    } catch (error) {
        console.log(error);
        return res.send({ error: "Invalid Product Id" });
    }
})

//Get product
router.get('/find/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        console.log(product)
        return res.send(product);
    } catch (error) {
        console.log(error);
        return res.send({ error: "Invalid Product Id" });
    }
})

//Get all products
router.get('/', async (req, res) => {
    try {
        const qNew = req.query.new;
        const qCategory = req.query.category;

        let products;
        if (qNew) {
            console.log("Reached herr")
            products = await Product.find().sort({ createdAt: -1 }).limit(10);
        } else if (qCategory) {
            products = await Product.find({ categories: { $in: [qCategory] } });
        } else {
            products = await Product.find();
        }
        return res.send(products);

    } catch (error) {
        console.log(error);
        return res.send({ error: "Something went wrong" });
    }
})

module.exports = router;