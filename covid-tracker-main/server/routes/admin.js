const express = require('express')
const router = express.Router();
const User = require('../models/User');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verifyToken = require('../functions/verifyToken');
const cors = require('cors');
const cookieParser = require('cookie-parser');


// //router middlewares
router.use(express.json());
router.use(cors({
    origin: '*'
}));
router.use(cookieParser());

//Login
router.post('/login', async (req, res) => {

    console.log('Recieved admin details from login request...');

    //Checking if the account exists
    console.log('Checking if account exists');
    const admin = await Admin.findOne({ adminId: req.body.adminId });
    if (!admin) {
        console.log(`Account doesn't exist`);
        return res.send({ error: `Account doesn't exist` });
    }

    // Check if password is correct
    console.log(`Checking if password is correct`);
    if (req.body.password !== admin.password) {
        return res.send({ error: `Password is incorrect` });
    }

    //Create and assign a token
    const token = jwt.sign({ _id: admin._id, admin: true }, process.env.TOKEN_SECRET);

    res.send({ admin_id: admin._id, access_token: token });
    console.log(`Login succssful`);
})

router.post('/pending', async (req, res) => {
    try {
        verifyToken(req, res);
        if (!req.user.admin) {
            return res.send({ error: `You are not authorised to perform this action.` });
        }
        const pendingUsers = await User.find({ writer: 'pending' }, 'name profile');
        console.log(pendingUsers);
        return res.send(pendingUsers);
    } catch (error) {
        console.log(error);
        return res.send({ error: error });
    }

})

router.post('/getUser', async (req, res) => {
    try {
        verifyToken(req, res);
        if (!req.user.admin) {
            return res.send({ error: `You are not authorised to perform this action.` });
        }
        console.log(req.body)
        const user = await User.findById(req.body.id, 'email writer');
        console.log(user);
        res.send(user);
    } catch (error) {
        console.log(error);
        res.send({ error: error });
    }
})
router.post('/acceptRequest', async (req, res) => {
    try {
        verifyToken(req, res);
        if (!req.user.admin) {
            return res.send({ error: `You are not authorised to perform this action.` });
        }
        console.log(req.body)
        await User.updateOne({ _id: req.body.id }, { writer: 'true' });
        res.send({ message: 'Request accepted' });
    } catch (error) {
        res.send({ error: "something went wrong!" })
    }
})
router.post('/rejectRequest', async (req, res) => {
    try {
        verifyToken(req, res);
        if (!req.user.admin) {
            return res.send({ error: `You are not authorised to perform this action.` });
        }
        console.log(req.body)
        await User.updateOne({ _id: req.body.id }, { writer: 'reject' });
        res.send({ message: 'Request accepted' });
    } catch (error) {
        res.send({ error: "something went wrong!" })
    }
})

module.exports = router;