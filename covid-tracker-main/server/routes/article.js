const express = require('express')
const router = express.Router();
const User = require('../models/User');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verifyToken = require('../functions/verifyToken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const Article = require('../models/Article');


// //router middlewares
router.use(express.json());
router.use(cors({
    origin: '*'
}));
router.use(cookieParser());

//Login
router.post('/save', async (req, res) => {
    try {
        console.log('Recieved request to save an article')
        verifyToken(req, res);
        console.log(req.user._id, req.body.article[req.body.itemList[0]]);
        const article = new Article({
            userId: req.user._id,
            itemList: req.body.itemList,
            items: req.body.article,
            title: req.body.article['t0'],
            coverImage: req.body.article[req.body.itemList.find((item) => (/^i/i.test(item)))],
        })
        await article.save();
        res.send("ok");
    } catch (error) {
        console.log(error);
        res.send({ error: error });
    }
})

router.get('/', async (req, res) => {
    try {
        const articles = await Article.find({}, 'title coverImage').sort('-date').limit(10);
        console.log(articles);
        res.send(articles);
    } catch (error) {
        console.log(error);
        res.send({ error: error });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const article = await Article.findById(id);
        res.send(article);
    } catch (error) {
        console.log(error);
        res.send({ error: error });
    }
})


module.exports = router;