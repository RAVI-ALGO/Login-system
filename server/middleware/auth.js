const jwt = require('jsonwebtoken');


/** auth middleware */
exports.Authentication= async(req, res, next)=>{
    try {
        
        // access authorize header to validate request
        const token = req.headers['x-access-token'];
        
        // retrive the user details fo the logged in user
        const decodedToken =  jwt.verify(token, process.env.JWT_SECRET);

        req.user = decodedToken;

        next()

    } catch (error) {
        res.status(401).send({ error : "Authentication Failed!"})
    }
}


exports.localVariables = (req, res, next) => {
    req.app.locals = {
        OTP : null,
        resetSession : false
    }
    next()
}