const Order = require('../models/Order')
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

//Create Order
router.post('/', async (req, res) => {
    try {
        verifyToken(req, res);
        const newOrder = new Order(req.body.cart);
        const order = await newOrder.save();
        console.log(order);
        return res.send(order);
    } catch (error) {
        console.log(error);
        return res.send({ error: error.message });
    }
})

//Update order
router.put("/:id", async (req, res) => {
    try {
        verifyToken(req, res);
        if (req.user == undefined || !req.user.admin) {
            return res.send({ error: `You are not authorised to perform this action.` });
        }
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body.order
        }, { new: true });
        return res.send({ updatedOrder });
    } catch (error) {
        console.log(error);
        return res.send({ error: "Invalid Order Id" });
    }
})

//Delete order
router.delete('/:id', async (req, res) => {
    try {
        verifyToken(req, res);
        if (req.user == undefined || !req.user.admin) {
            return res.send({ error: `You are not authorised to perform this action.` });
        }
        const order = await Order.findByIdAndDelete(req.params.id);
        console.log(order)
        return res.send({ success: true });
    } catch (error) {
        console.log(error);
        return res.send({ error: "Invalid Order Id" });
    }
})

// Get user Orders
router.get('/find', async (req, res) => {
    try {
        verifyToken(req, res);
        const orders = await Order.find({ userId: req.user._id });
        console.log(orders)
        return res.send(orders);
    } catch (error) {
        console.log(error);
        return res.send({ error: error.message });
    }
})

// Get all orders
router.get('/', async (req, res) => {
    try {
        verifyToken(req, res);
        if (req.user == undefined || !req.user.admin) {
            return res.send({ error: `You are not authorised to perform this action.` });
        }
        const orders = await Order.find();
        console.log(orders)
        return res.send(orders);
    } catch (error) {
        console.log(error);
        return res.send({ error: error.message });
    }
})


module.exports = router;