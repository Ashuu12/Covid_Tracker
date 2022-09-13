const express = require('express')
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../functions/validation');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');

// //router middlewares
router.use(express.json());
router.use(cors({
    origin: '*'
}));
router.use(cookieParser());

function generateOTP() {
    // Declare a digits variable 
    // which stores all digits
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

router.post('/otp', async (req, res) => {
    const otp = generateOTP();
    console.log(otp);
    //Mail otp to user
    console.log("email", process.env.EMAIL, "password", process.env.PASSWORD);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    var mailOptions = {
        from: process.env.EMAIL,
        to: req.body.email,
        subject: 'COVID TRACKER website SIGNUP OTP',
        text: `The otp for your account registration is ${otp}. Please enter this otp to complete your registration. Ignore this mail if you didn't request for registration.`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    //hash otp
    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(otp, salt);
    res.send({ hashedOtp: hashedOtp });
})


//Registrations
router.post('/register', async (req, res) => {
    console.log('Recieved user details from registration request...');

    console.log(`Checking if otp is correct`);
    console.log(req.body)
    const validOtp = await bcrypt.compare(req.body.otp, req.body.hashedOtp);
    if (!validOtp) {
        console.log(`Incorrect Otp terminate signup`);
        return res.send({ error: 'Invalid Otp' });
    }

    //Validating user information
    console.log('Validating user data')
    const { error } = registerValidation({ email: req.body.email, password: req.body.password, name: req.body.name });
    if (error) {
        console.log('An error was found.');
        console.log(error)
        return res.send({ error: error.details[0].message });
    }
    console.log('No error found...');

    //Checking if user is already in Database
    console.log('Checking if user already registered');
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        console.log('Found that user already registered..\nRegistration terminated...');
        return res.status(400).send('Email already exists');
    }


    // HASH PASSWORD
    console.log('Hashing the password using bcryptjs');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    //Database data entry
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    })
    try {
        console.log('Data successfully entered into database');
        const savedUser = await user.save();

        //Create and assign a token
        const token = jwt.sign({ _id: savedUser._id, admin: false }, process.env.TOKEN_SECRET);
        res.send({ savedUser_id: user._id, access_token: token });
    }
    catch (err) {
        res.status(400).send(err.message);
    }
})

//Login
router.post('/login', async (req, res) => {

    console.log('Recieved user details from login request...');

    //Validating user information
    console.log('Validating user data')
    const { error } = loginValidation(req.body);
    if (error) {
        console.log(`credentials are not valid`);
        return res.send({ error: error.details[0].message });
    }
    console.log('No error found...');

    //Checking if the account exists
    console.log('Checking if account exists');
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        console.log(`Account doesn't exist`);
        return res.send({ error: `Account doesn't exist` });
    }

    // Check if password is correct
    console.log(`Checking if password is correct`);
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
        console.log(`Incorrect Password....Terminate Login`);
        return res.send({ error: 'Invalid Password' });
    }

    //Create and assign a token
    const token = jwt.sign({ _id: user._id, admin: false }, process.env.TOKEN_SECRET);

    res.send({ user_id: user._id, access_token: token });
    console.log(`Login succssful`);
})

module.exports = router;