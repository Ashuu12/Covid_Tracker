const jwt = require('jsonwebtoken')

module.exports = (req, res) => {

    // Checking for web token
    console.log('Request recieved...checking for web token...');
    const token = req.body.access_token ? req.body.access_token : req.headers.access_token;
    console.log("Token recieved", token);
    console.log("Request header", req.headers);
    if (!token) {
        console.log(`No web token found...Acess denied...`);
        return new Error(`User not authentic`);
    }
    console.log(`Token available...`);

    //verify web token
    console.log(`Verifying webtoken...`);
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        console.log("user", req.user);
        console.log(`Token is verified to be authentic...`);
        return
    }
    catch (err) {
        console.log(`Unauthentic Web Token...Acess denied...`);
        return new Error('Invalid Token');
    }
}