const express = require("express");
const verifyToken = require("../functions/verifyToken");
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product')
const Order = require('../models/Order');

const stripe = require("stripe")(process.env.STRIPE_KEY);

router.use(express.static("public"));
router.use(express.json());

const calculateOrderAmount = async (items) => {
    let total = 0;
    items.forEach((async (item) => {
        const product = await Product.findById(item.productId);
        total += product.price * item.quantity;
    }))
    console.log("Total payment", total);
    return total * 100;
};

router.post("/create-payment-intent", async (req, res) => {

    try {
        verifyToken(req, res);
        const cart = await Cart.findOne({ userId: req.user._id });
        console.log(cart.products)
        const pPromise = cart.products.map((product) => {
            return Product.findById(product.productId)
        })
        const quantities = cart.products.map((product) => product.quantity)

        Promise.all(pPromise).then(async (items) => {
            console.log(items)
            let total = 0;
            items.forEach((async (item, key) => {
                total += item.price * quantities[key];
            }))
            if (total < 500) { total += 40 }
            console.log("Total payment", total);

            // Create a PaymentIntent with the order amount and currency
            const paymentIntent = await stripe.paymentIntents.create({
                amount: total * 100,
                currency: "inr",
                automatic_payment_methods: {
                    enabled: true,
                },
            });

            res.send({
                clientSecret: paymentIntent.client_secret,
                amount: total,
            });
        })
    } catch (error) {
        console.log(error);
        return res.send({ error: error.message });
    }
});

router.post("/success", async (req, res) => {
    try {
        console.log("Payment success")
        verifyToken(req, res);
        const cart = await Cart.findOne({ userId: req.user._id });

        const newOrder = new Order({
            userId: req.user._id,
            products: cart.products,
            amount: req.body.amount,
            address: req.body.address,
        });
        const order = await newOrder.save();
        console.log("Order created", order);
        return res.send({ order });

    } catch (error) {
        console.log(error);
        return res.send({ error: error.message });
    }
})


module.exports = router;

