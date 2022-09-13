const Cart = require('../models/Cart');
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

//Create cart
router.post('/', async (req, res) => {
    try {
        verifyToken(req, res);
        const newCart = new Cart({
            userId: req.user._id,
        });
        const cart = await newCart.save();
        console.log(cart);
        return res.send(cart);
    } catch (error) {
        console.log(error);
        return res.send({ error: error.message });
    }
})

//Update cart
router.put("/", async (req, res) => {
    try {
        verifyToken(req, res);
        console.log(req.user._id);
        const updatedCart = await Cart.findOneAndUpdate({ userId: req.user._id }, {
            userId: req.user._id,
            products: req.body
        }, { new: true });
        console.log("Updated cart", updatedCart)
        return res.send({ updatedCart });
    } catch (error) {
        console.log(error);
        return res.send({ error: "Invalid Cart Id" });
    }
})

//Delete cart
router.delete('/:id', async (req, res) => {
    try {
        verifyToken(req, res);
        const cart = await Cart.findByIdAndDelete(req.params.id);
        console.log(cart)
        return res.send({ success: true });
    } catch (error) {
        console.log(error);
        return res.send({ error: "Invalid Cart Id" });
    }
})

// Get user cart
router.get('/find', async (req, res) => {
    try {
        verifyToken(req, res);
        const cart = await Cart.findOne({ userId: req.user._id });
        console.log(cart)
        return res.send(cart);
    } catch (error) {
        console.log(error);
        return res.send({ error: error.message });
    }
})


module.exports = router;