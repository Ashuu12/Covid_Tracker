const express = require('express')
const router = express.Router();
const verifyToken = require('../functions/verifyToken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const User = require('../models/User');
const PendingWriter = require('../models/PendingWriter');
const Admin = require('../models/Admin');

router.use(express.json());
router.use(cors({
    origin: '*',
    credentials: true
}));
router.use(cookieParser());


router.post('/', async (req, res) => {
    try {
        verifyToken(req, res);
        console.log(req.user);

        //Checking if the account exists
        console.log('Checking if account exists');
        const user = await User.findById(req.user?._id, 'profile name');
        if (!user) {
            console.log(`Account doesn't exist`);
            return res.send({ error: `Account doesn't exist` });
        }
        console.log(user);
        return res.send({ name: user.name, profile: user.profile });
    } catch (error) {
        console.log(error);
        return res.send({ error: error });
    }

})

router.post('/profile', async (req, res) => {
    try {
        verifyToken(req, res);
        console.log(req.user);

        //Checking if the account exists
        console.log('Checking if account exists');
        const user = await User.findById(req.user._id, 'profile name email writer');
        if (!user) {
            console.log(`Account doesn't exist`);
            return res.send({ error: `Account doesn't exist` });
        }
        console.log(user);
        return res.send({ name: user.name, profile: user.profile, email: user.email, writer: user.writer });
    } catch (error) {
        console.log(error);
        return res.send({ error: error });
    }
})

router.post('/make-writer', async (req, res) => {
    try {
        verifyToken(req, res);
        const pendingWriter = new PendingWriter({
            userId: req.user._id,
        })
        await pendingWriter.save();
        await User.updateOne({ _id: req.user._id }, { writer: 'pending' });
        return res.send({ writer: 'pending' });
    } catch (error) {
        console.log(error);
        return res.send({ error: error });
    }
})

module.exports = router;